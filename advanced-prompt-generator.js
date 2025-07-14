// 고급 사주 프롬프트 생성기 - 전문가 수준 최적화

// 십신 계산 함수
function calculateSipsin(daystem, otherStem, gender) {
    const stemOrder = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
    const dayIndex = stemOrder.indexOf(daystem);
    const otherIndex = stemOrder.indexOf(otherStem);
    
    // 십신 매트릭스 (일간 기준)
    const sipsinMatrix = {
        '갑': ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'],
        '을': ['겁재', '비견', '상관', '식신', '정재', '편재', '정관', '편관', '정인', '편인'],
        '병': ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'],
        '정': ['겁재', '비견', '상관', '식신', '정재', '편재', '정관', '편관', '정인', '편인'],
        '무': ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'],
        '기': ['겁재', '비견', '상관', '식신', '정재', '편재', '정관', '편관', '정인', '편인'],
        '경': ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'],
        '신': ['겁재', '비견', '상관', '식신', '정재', '편재', '정관', '편관', '정인', '편인'],
        '임': ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'],
        '계': ['겁재', '비견', '상관', '식신', '정재', '편재', '정관', '편관', '정인', '편인']
    };
    
    return sipsinMatrix[dayIndex] ? sipsinMatrix[dayIndex][otherIndex] : '미상';
}

// 오행 계산 함수
function getWuxing(stem) {
    const wuxingMap = {
        '갑': '목', '을': '목',
        '병': '화', '정': '화',
        '무': '토', '기': '토',
        '경': '금', '신': '금',
        '임': '수', '계': '수'
    };
    return wuxingMap[stem] || '미상';
}

// 지지 오행 계산
function getBranchWuxing(branch) {
    const branchWuxingMap = {
        '자': '수', '축': '토', '인': '목', '묘': '목',
        '진': '토', '사': '화', '오': '화', '미': '토',
        '신': '금', '유': '금', '술': '토', '해': '수'
    };
    return branchWuxingMap[branch] || '미상';
}

// 용신 분석 함수
function analyzeYongsin(manseryeok) {
    const dayWuxing = getWuxing(manseryeok.dayStem);
    const allWuxing = [
        getWuxing(manseryeok.yearStem),
        getWuxing(manseryeok.monthStem || '무'), // 월간 계산 필요시
        getWuxing(manseryeok.dayStem),
        getWuxing(manseryeok.hourStem || '무'), // 시간 계산 필요시
        getBranchWuxing(manseryeok.yearBranch),
        getBranchWuxing(manseryeok.monthBranch || '진'),
        getBranchWuxing(manseryeok.dayBranch),
        getBranchWuxing(manseryeok.hourBranch || '미')
    ];
    
    // 오행 개수 계산
    const wuxingCount = {};
    allWuxing.forEach(w => {
        wuxingCount[w] = (wuxingCount[w] || 0) + 1;
    });
    
    // 용신 추정 (간단한 로직)
    const weakElements = [];
    const strongElements = [];
    
    ['목', '화', '토', '금', '수'].forEach(element => {
        const count = wuxingCount[element] || 0;
        if (count === 0 || count === 1) weakElements.push(element);
        if (count >= 3) strongElements.push(element);
    });
    
    return {
        dayWuxing,
        wuxingCount,
        weakElements,
        strongElements,
        needSupport: weakElements.includes(dayWuxing) ? '부족' : '보통',
        yongsin: weakElements.length > 0 ? weakElements[0] : '균형'
    };
}

// 최적화된 전문가 프롬프트 생성
function createExpertSajuPrompt(manseryeok, sajuData) {
    const genderText = sajuData.gender === 'male' ? '남성' : '여성';
    const calendarTypeText = sajuData.calendarType === 'solar' ? '양력' : '음력';
    
    // 십신 분석
    const yearSipsin = calculateSipsin(manseryeok.dayStem, manseryeok.yearStem, sajuData.gender);
    const monthSipsin = calculateSipsin(manseryeok.dayStem, manseryeok.monthStem || '무', sajuData.gender);
    const hourSipsin = calculateSipsin(manseryeok.dayStem, manseryeok.hourStem || '무', sajuData.gender);
    
    // 오행 분석
    const wuxingAnalysis = analyzeYongsin(manseryeok);
    
    // 분석 목적 텍스트
    const purposeTexts = {
        'general': '전반적인 운세',
        'love': '연애운과 결혼운',
        'career': '직업운과 사업운',
        'wealth': '재물운과 투자운',
        'health': '건강운과 체질',
        'relationship': '인간관계와 사회운'
    };
    
    const selectedPurposes = sajuData.purposes.map(p => purposeTexts[p]).filter(Boolean);
    const purposeText = selectedPurposes.length > 0 ? 
        `\n\n🎯 **특별 집중 분석 요청:**\n${selectedPurposes.map(p => `- ${p}`).join('\n')}` : '';

    const expertPrompt = `당신은 30년 경력의 최고 수준 사주명리학 전문가입니다. 아래 상세한 사주 정보를 바탕으로 ${genderText}을 위한 전문적이고 정확한 사주 분석을 해주세요.

📊 **기본 정보**
- 성별: ${genderText}
- 생년월일시: ${manseryeok.year}년 ${manseryeok.month}월 ${manseryeok.day}일 ${manseryeok.hour}시 (${calendarTypeText})
- 띠: ${manseryeok.zodiac}띠
${sajuData.birthPlace ? `- 출생지: ${sajuData.birthPlace}` : ''}

📊 **사주 만세력 (四柱八字)**
```
년주(年柱): ${manseryeok.yearPillar} | 월주(月柱): ${manseryeok.monthPillar}
일주(日柱): ${manseryeok.dayPillar} | 시주(時柱): ${manseryeok.hourPillar}
```

🔍 **십신 분석 (十神)**
- 년간 십신: ${yearSipsin} (${manseryeok.yearStem})
- 월간 십신: ${monthSipsin} (${manseryeok.monthStem || '추정'})
- 일간 본인: ${manseryeok.dayStem} (${genderText} 기준)
- 시간 십신: ${hourSipsin} (${manseryeok.hourStem || '추정'})

🌟 **오행 분석 (五行)**
- 일간 오행: ${wuxingAnalysis.dayWuxing}
- 오행 분포: 목(${wuxingAnalysis.wuxingCount['목'] || 0}) 화(${wuxingAnalysis.wuxingCount['화'] || 0}) 토(${wuxingAnalysis.wuxingCount['토'] || 0}) 금(${wuxingAnalysis.wuxingCount['금'] || 0}) 수(${wuxingAnalysis.wuxingCount['수'] || 0})
- 일간 강약: ${wuxingAnalysis.needSupport}
- 용신 추정: ${wuxingAnalysis.yongsin}

🎯 **전문가 수준 분석 요청**

다음 각 항목을 ${genderText}의 특성과 십신/오행 이론을 완벽히 반영하여 **각각 400자 이상**으로 상세 분석해주세요:

## 1. 🧬 사주 구조 및 격국 분석
- 일간 ${manseryeok.dayStem}${manseryeok.dayBranch}의 ${genderText} 기본 성향과 타고난 기질
- 사주 전체의 오행 균형과 강약 분석 (용신/기신 포함)
- 십신 배치에 따른 성격적 특징과 인생 패턴
- 월령과의 관계 및 계절적 영향

## 2. 💕 연애운 & 결혼운 (${genderText} 전용 해석)
- ${genderText}으로서의 이성관과 연애 스타일 (십신 기준)
- 배우자궁(일지) ${manseryeok.dayBranch} 분석 및 배우자 특징
- 결혼 적령기와 인연 시기 (대운/세운 고려)
- 가정생활에서의 역할과 부부관계 조화법
- ${genderText} 특성을 고려한 연애/결혼 조언

## 3. 💰 재물운 & 직업운 (십신 기반)
- 재성(정재/편재) 분석을 통한 재물 획득 방식
- ${genderText}에게 최적화된 직업군과 사업 분야
- 관성(정관/편관) 분석을 통한 직장운과 승진운
- 투자 성향과 재테크 방향성
- 경제적 성공을 위한 구체적 전략

## 4. 🏥 건강운 & 체질 분석 (오행 의학)
- 일간 ${wuxingAnalysis.dayWuxing} 체질의 ${genderText} 건강 특성
- 오행 불균형으로 인한 취약 부위와 질병 경향
- 계절별/연령대별 건강 관리 포인트
- 음식, 운동, 생활습관 개선 방안
- 예방 중심의 건강 관리법

## 5. 👥 인간관계 & 사회운 (십신 관계론)
- 비겁/인성/관성을 통한 대인관계 패턴 분석
- ${genderText}으로서의 리더십과 팔로워십 특성
- 직장/사회에서의 처세술과 성공 전략
- 유리한 인맥 유형과 피해야 할 관계
- 갈등 해결과 소통 개선 방법

## 6. 📅 대운/세운 분석 (2025-2029년)
각 연도별로 다음을 상세 분석:
- 해당 연도 간지와 본 사주의 상호작용
- 십신 변화에 따른 운세 흐름
- 월별 주요 변화 시기와 기회
- 주의사항과 대비책
- 실행 가능한 구체적 행동 계획

## 7. 🎁 개운법 & 풍수 (오행 조화)
- 용신 ${wuxingAnalysis.yongsin} 기반 개운 방법
- 행운의 색상, 숫자, 방향 (오행 이론 적용)
- 주거/사무 공간 풍수 배치법
- 개운 아이템과 착용법 (${genderText} 맞춤)
- 금기사항과 피해야 할 것들

## 8. 🌟 종합 인생 전략 (${genderText} 맞춤)
- ${genderText}으로서 가장 중요한 인생 전략 5가지
- 십신/오행을 활용한 성공 로드맵
- 단계별 목표 설정과 실행 방안
- 위기 극복과 기회 활용법
- 평생 지켜야 할 핵심 원칙${purposeText}

**🔥 중요 지침:**
1. 반드시 ${genderText}의 생리적/사회적 특성을 완벽히 반영하여 십신을 해석하세요
2. 단순한 일반론이 아닌, 이 사주만의 고유한 특징을 찾아 분석하세요
3. 추상적 표현보다는 구체적이고 실용적인 조언을 제공하세요
4. 각 항목마다 400자 이상, 총 4000자 이상의 전문가 수준 분석을 부탁드립니다
5. 현대적 관점에서 실생활에 바로 적용 가능한 내용으로 구성하세요

이 사주의 핵심 키워드는 "${manseryeok.dayStem}${manseryeok.dayBranch} ${genderText}, ${wuxingAnalysis.yongsin} 용신, ${yearSipsin} 년간"입니다. 이를 중심으로 깊이 있는 분석을 부탁드립니다.`;

    return expertPrompt;
}

// 내보내기
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createExpertSajuPrompt,
        calculateSipsin,
        analyzeYongsin
    };
}
