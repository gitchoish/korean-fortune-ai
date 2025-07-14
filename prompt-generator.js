// 프롬프트 생성기 메인 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sajuForm');
    const resultSection = document.getElementById('resultSection');
    const manseryeokResult = document.getElementById('manseryeokResult');
    const generatedPrompt = document.getElementById('generatedPrompt');
    const copyPromptBtn = document.getElementById('copyPrompt');
    
    // 성별 선택 피드백
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const genderMessage = document.getElementById('genderMessage');
    
    genderInputs.forEach(input => {
        input.addEventListener('change', function() {
            const selectedGender = this.value === 'male' ? '남성' : '여성';
            genderMessage.innerHTML = `✅ ${selectedGender} 선택 완료 - ${selectedGender} 맞춤 사주 분석 프롬프트가 생성됩니다`;
            genderMessage.style.color = '#4299e1';
            genderMessage.style.fontWeight = '600';
        });
    });

    // 폼 제출 처리
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(form);
        const sajuData = {
            gender: formData.get('gender'),
            calendarType: formData.get('calendarType'),
            birthDate: formData.get('birthDate'),
            birthTime: formData.get('birthTime'),
            birthPlace: formData.get('birthPlace') || '',
            purposes: formData.getAll('purpose')
        };
        
        // 유효성 검사
        if (!sajuData.gender) {
            alert('⚠️ 성별을 선택해주세요.');
            document.querySelector('.gender-selection').scrollIntoView({ behavior: 'smooth' });
            return;
        }
        
        if (!sajuData.birthDate || !sajuData.birthTime) {
            alert('⚠️ 생년월일과 출생시간을 모두 입력해주세요.');
            return;
        }
        
        // 만세력 계산 및 프롬프트 생성
        generateSajuPrompt(sajuData);
    });
    
    // 프롬프트 복사 기능
    copyPromptBtn.addEventListener('click', function() {
        generatedPrompt.select();
        document.execCommand('copy');
        
        // 복사 완료 피드백
        const originalText = this.textContent;
        this.textContent = '✅ 복사 완료!';
        this.classList.add('copied');
        
        setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove('copied');
        }, 2000);
    });
});

// 만세력 계산 및 프롬프트 생성 함수
function generateSajuPrompt(sajuData) {
    try {
        // 날짜 파싱
        const birthDateTime = new Date(sajuData.birthDate + 'T' + sajuData.birthTime);
        
        // 만세력 계산 (기존 함수 활용)
        const manseryeok = calculateManseryeok(birthDateTime, sajuData.calendarType === 'lunar');
        
        // 결과 표시
        displayManseryeok(manseryeok, sajuData);
        
        // 프롬프트 생성
        const prompt = createOptimizedPrompt(manseryeok, sajuData);
        
        // 프롬프트 표시
        document.getElementById('generatedPrompt').value = prompt;
        
        // 결과 섹션 표시
        document.getElementById('resultSection').style.display = 'block';
        document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('프롬프트 생성 오류:', error);
        alert('❌ 프롬프트 생성 중 오류가 발생했습니다. 입력 정보를 확인해주세요.');
    }
}

// 만세력 계산 함수 (간소화된 버전)
function calculateManseryeok(birthDate, isLunar = false) {
    // 실제 만세력 계산 로직 (기존 saju-functions.js 활용)
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    const hour = birthDate.getHours();
    
    // 간단한 천간지지 계산 (실제로는 더 복잡한 계산 필요)
    const heavenlyStems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
    const earthlyBranches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
    const zodiacAnimals = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];
    
    // 년주 계산
    const yearStemIndex = (year - 4) % 10;
    const yearBranchIndex = (year - 4) % 12;
    const yearPillar = heavenlyStems[yearStemIndex] + earthlyBranches[yearBranchIndex];
    const zodiac = zodiacAnimals[yearBranchIndex];
    
    // 월주 계산 (간소화)
    const monthStemIndex = (yearStemIndex * 2 + month) % 10;
    const monthBranchIndex = (month + 1) % 12;
    const monthPillar = heavenlyStems[monthStemIndex] + earthlyBranches[monthBranchIndex];
    
    // 일주 계산 (간소화)
    const dayCount = Math.floor((birthDate - new Date(1900, 0, 1)) / (1000 * 60 * 60 * 24));
    const dayStemIndex = dayCount % 10;
    const dayBranchIndex = dayCount % 12;
    const dayPillar = heavenlyStems[dayStemIndex] + earthlyBranches[dayBranchIndex];
    
    // 시주 계산
    const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
    const hourStemIndex = (dayStemIndex * 2 + hourBranchIndex) % 10;
    const hourPillar = heavenlyStems[hourStemIndex] + earthlyBranches[hourBranchIndex];
    
    return {
        year: year,
        month: month,
        day: day,
        hour: hour,
        isLunar: isLunar,
        yearPillar: yearPillar,
        monthPillar: monthPillar,
        dayPillar: dayPillar,
        hourPillar: hourPillar,
        zodiac: zodiac,
        yearStem: heavenlyStems[yearStemIndex],
        yearBranch: earthlyBranches[yearBranchIndex],
        dayStem: heavenlyStems[dayStemIndex],
        dayBranch: earthlyBranches[dayBranchIndex]
    };
}

// 만세력 결과 표시
function displayManseryeok(manseryeok, sajuData) {
    const calendarTypeText = sajuData.calendarType === 'solar' ? '양력' : '음력';
    const genderText = sajuData.gender === 'male' ? '남성' : '여성';
    
    const html = `
        <div class="manseryeok-grid">
            <div class="manseryeok-item">
                <h4>📅 생년월일</h4>
                <div class="value">${manseryeok.year}년 ${manseryeok.month}월 ${manseryeok.day}일</div>
                <div style="font-size: 0.8rem; color: #718096; margin-top: 0.25rem;">${calendarTypeText} ${manseryeok.hour}시</div>
            </div>
            <div class="manseryeok-item">
                <h4>👤 성별 & 띠</h4>
                <div class="value">${genderText}</div>
                <div style="font-size: 0.9rem; color: #4299e1; margin-top: 0.25rem;">${manseryeok.zodiac}띠</div>
            </div>
            <div class="manseryeok-item">
                <h4>📊 년주 (年柱)</h4>
                <div class="value">${manseryeok.yearPillar}</div>
                <div style="font-size: 0.8rem; color: #718096; margin-top: 0.25rem;">연간 운세의 기본</div>
            </div>
            <div class="manseryeok-item">
                <h4>📊 월주 (月柱)</h4>
                <div class="value">${manseryeok.monthPillar}</div>
                <div style="font-size: 0.8rem; color: #718096; margin-top: 0.25rem;">부모, 형제 관계</div>
            </div>
            <div class="manseryeok-item">
                <h4>📊 일주 (日柱)</h4>
                <div class="value">${manseryeok.dayPillar}</div>
                <div style="font-size: 0.8rem; color: #718096; margin-top: 0.25rem;">본인, 배우자 관계</div>
            </div>
            <div class="manseryeok-item">
                <h4>📊 시주 (時柱)</h4>
                <div class="value">${manseryeok.hourPillar}</div>
                <div style="font-size: 0.8rem; color: #718096; margin-top: 0.25rem;">자녀, 말년 운세</div>
            </div>
        </div>
        ${sajuData.birthPlace ? `<div style="text-align: center; margin-top: 1rem; color: #4a5568;"><strong>📍 출생지:</strong> ${sajuData.birthPlace}</div>` : ''}
    `;
    
    document.getElementById('manseryeokResult').innerHTML = html;
}

// 십신 계산 함수
function calculateSipsin(dayStem, otherStem) {
    const stemOrder = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
    const dayIndex = stemOrder.indexOf(dayStem);
    const otherIndex = stemOrder.indexOf(otherStem);
    
    if (dayIndex === -1 || otherIndex === -1) return '미상';
    
    // 십신 계산 로직 (간소화)
    const diff = (otherIndex - dayIndex + 10) % 10;
    const sipsinNames = ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'];
    return sipsinNames[diff] || '미상';
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

// 오행 균형 분석
function analyzeWuxingBalance(manseryeok) {
    const allWuxing = [
        getWuxing(manseryeok.yearStem),
        getWuxing(manseryeok.dayStem),
        getBranchWuxing(manseryeok.yearBranch),
        getBranchWuxing(manseryeok.monthPillar.charAt(1)),
        getBranchWuxing(manseryeok.dayBranch), 
        getBranchWuxing(manseryeok.hourPillar.charAt(1))
    ];
    
    const wuxingCount = {};
    allWuxing.forEach(w => {
        wuxingCount[w] = (wuxingCount[w] || 0) + 1;
    });
    
    const dayWuxing = getWuxing(manseryeok.dayStem);
    const weakElements = [];
    const strongElements = [];
    
    ['목', '화', '토', '금', '수'].forEach(element => {
        const count = wuxingCount[element] || 0;
        if (count <= 1) weakElements.push(element);
        if (count >= 3) strongElements.push(element);
    });
    
    return {
        dayWuxing,
        wuxingCount,
        weakElements,
        strongElements,
        yongsin: weakElements.includes(dayWuxing) ? weakElements[0] : (weakElements[0] || '균형')
    };
}

// 최적화된 전문가 프롬프트 생성
function createOptimizedPrompt(manseryeok, sajuData) {
    const genderText = sajuData.gender === 'male' ? '남성' : '여성';
    const calendarTypeText = sajuData.calendarType === 'solar' ? '양력' : '음력';
    
    // 십신 분석
    const yearSipsin = calculateSipsin(manseryeok.dayStem, manseryeok.yearStem);
    const monthSipsin = calculateSipsin(manseryeok.dayStem, manseryeok.monthPillar.charAt(0));
    const hourSipsin = calculateSipsin(manseryeok.dayStem, manseryeok.hourPillar.charAt(0));
    
    // 오행 분석
    const wuxingAnalysis = analyzeWuxingBalance(manseryeok);
    
    // 분석 목적 텍스트 생성
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

    const prompt = `당신은 30년 경력의 최고 수준 사주명리학 전문가입니다. 아래 상세한 사주 정보를 바탕으로 ${genderText}을 위한 전문적이고 정확한 사주 분석을 해주세요.

📊 **기본 정보**
- 성별: ${genderText}
- 생년월일시: ${manseryeok.year}년 ${manseryeok.month}월 ${manseryeok.day}일 ${manseryeok.hour}시 (${calendarTypeText})
- 띠: ${manseryeok.zodiac}띠
${sajuData.birthPlace ? `- 출생지: ${sajuData.birthPlace}` : ''}

📊 **사주 만세력 (四柱八字)**
\`\`\`
년주(年柱): ${manseryeok.yearPillar} | 월주(月柱): ${manseryeok.monthPillar}
일주(日柱): ${manseryeok.dayPillar} | 시주(時柱): ${manseryeok.hourPillar}
\`\`\`

🔍 **십신 분석 (十神)**
- 년간 십신: ${yearSipsin} (${manseryeok.yearStem})
- 월간 십신: ${monthSipsin} (${manseryeok.monthPillar.charAt(0)})
- 일간 본인: ${manseryeok.dayStem} (${genderText} 기준)
- 시간 십신: ${hourSipsin} (${manseryeok.hourPillar.charAt(0)})

🌟 **오행 분석 (五行)**
- 일간 오행: ${wuxingAnalysis.dayWuxing}
- 오행 분포: 목(${wuxingAnalysis.wuxingCount['목'] || 0}) 화(${wuxingAnalysis.wuxingCount['화'] || 0}) 토(${wuxingAnalysis.wuxingCount['토'] || 0}) 금(${wuxingAnalysis.wuxingCount['금'] || 0}) 수(${wuxingAnalysis.wuxingCount['수'] || 0})
- 용신 추정: ${wuxingAnalysis.yongsin}

🎯 **전문가 수준 분석 요청**

다음 각 항목을 ${genderText}의 특성과 십신/오행 이론을 완벽히 반영하여 **각각 400자 이상**으로 상세 분석해주세요:

## 1. 🧬 사주 구조 및 격국 분석
- 일간 ${manseryeok.dayStem}${manseryeok.dayBranch}의 ${genderText} 기본 성향과 타고난 기질
- 사주 전체의 오행 균형과 강약 분석 (용신 ${wuxingAnalysis.yongsin} 포함)
- 십신 배치에 따른 성격적 특징과 인생 패턴
- 월령과의 관계 및 계절적 영향

## 2. 💕 연애운 & 결혼운 (${genderText} 전용 해석)
- ${genderText}으로서의 이성관과 연애 스타일 (십신 ${yearSipsin}, ${monthSipsin} 기준)
- 배우자궁(일지) ${manseryeok.dayBranch} 분석 및 배우자 특징
- 결혼 적령기와 인연 시기 예측
- 가정생활에서의 역할과 부부관계 조화법
- ${genderText} 특성을 고려한 연애/결혼 조언

## 3. 💰 재물운 & 직업운 (십신 기반)
- 재성 분석을 통한 재물 획득 방식과 투자 성향
- ${genderText}에게 최적화된 직업군과 사업 분야
- 관성 분석을 통한 직장운과 승진 가능성
- 경제적 성공을 위한 구체적 전략과 시기
- 재테크와 부동산 투자 방향성

## 4. 🏥 건강운 & 체질 분석 (오행 의학)
- 일간 ${wuxingAnalysis.dayWuxing} 체질의 ${genderText} 건강 특성
- 오행 불균형으로 인한 취약 부위와 질병 경향
- 계절별/연령대별 건강 관리 포인트
- 음식, 운동, 생활습관 개선 방안
- 예방 중심의 건강 관리법

## 5. 👥 인간관계 & 사회운 (십신 관계론)
- 십신을 통한 대인관계 패턴 분석
- ${genderText}으로서의 리더십과 팔로워십 특성
- 직장/사회에서의 처세술과 성공 전략
- 유리한 인맥 유형과 피해야 할 관계
- 갈등 해결과 소통 개선 방법

## 6. 📅 대운/세운 분석 (2025-2029년)
각 연도별로 다음을 상세 분석:
- 해당 연도 간지와 본 사주의 상호작용
- 십신 변화에 따른 운세 흐름과 기회
- 월별 주요 변화 시기와 주의사항
- 실행 가능한 구체적 행동 계획
- 위기 극복과 기회 활용 방법

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
- 평생 지켜야 할 핵심 원칙과 가치관
- 최종 성공을 위한 종합 조언${purposeText}

**🔥 중요 지침:**
1. 반드시 ${genderText}의 생리적/사회적 특성을 완벽히 반영하여 십신을 해석하세요
2. 단순한 일반론이 아닌, 이 사주만의 고유한 특징을 찾아 분석하세요  
3. 추상적 표현보다는 구체적이고 실용적인 조언을 제공하세요
4. 각 항목마다 400자 이상, 총 4000자 이상의 전문가 수준 분석을 부탁드립니다
5. 현대적 관점에서 실생활에 바로 적용 가능한 내용으로 구성하세요

이 사주의 핵심 키워드는 "${manseryeok.dayStem}${manseryeok.dayBranch} ${genderText}, ${wuxingAnalysis.yongsin} 용신, ${yearSipsin} 년간"입니다. 이를 중심으로 깊이 있는 분석을 부탁드립니다.`;

    return prompt;
}

// 유틸리티 함수들
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function formatTime(date) {
    return date.toTimeString().split(' ')[0].substring(0, 5);
}
