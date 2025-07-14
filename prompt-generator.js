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

// 최적화된 프롬프트 생성
function createOptimizedPrompt(manseryeok, sajuData) {
    const genderText = sajuData.gender === 'male' ? '남성' : '여성';
    const calendarTypeText = sajuData.calendarType === 'solar' ? '양력' : '음력';
    
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
        `\n\n특히 다음 분야에 대해 더 자세히 분석해주세요:\n${selectedPurposes.map(p => `- ${p}`).join('\n')}` : '';
    
    const prompt = `당신은 30년 경력의 최고 수준 사주 전문가입니다. 아래 정보를 바탕으로 ${genderText}을 위한 전문적이고 상세한 사주 분석을 해주세요.

📊 **사주 정보**
- 성별: ${genderText}
- 생년월일: ${manseryeok.year}년 ${manseryeok.month}월 ${manseryeok.day}일 ${manseryeok.hour}시 (${calendarTypeText})
- 띠: ${manseryeok.zodiac}띠
${sajuData.birthPlace ? `- 출생지: ${sajuData.birthPlace}` : ''}

📊 **만세력 (四柱)**
- 년주 (年柱): ${manseryeok.yearPillar}
- 월주 (月柱): ${manseryeok.monthPillar}  
- 일주 (日柱): ${manseryeok.dayPillar}
- 시주 (時柱): ${manseryeok.hourPillar}

🎯 **분석 요청사항**

다음 항목들을 ${genderText}의 특성을 완벽히 반영하여 각각 300자 이상으로 상세하게 분석해주세요:

## 1. 🌟 종합 운세 및 성격 분석
- 일간 ${manseryeok.dayStem}${manseryeok.dayBranch}의 ${genderText}으로서의 기본 성격과 특징
- 사주 전체의 균형과 강약 분석
- 타고난 재능과 잠재력

## 2. 💕 연애운 & 결혼운 (${genderText} 맞춤)
- ${genderText}으로서의 이성관과 연애 스타일
- 결혼 시기와 배우자 특징 (십신 분석 포함)
- 가정생활과 부부관계에서의 역할

## 3. 💰 재물운 & 직업운
- ${genderText}에게 적합한 직업과 사업 분야
- 재물 획득 방법과 투자 성향
- 경제적 성공을 위한 구체적 조언

## 4. 🏥 건강운 & 체질 분석
- ${genderText}의 체질과 주의해야 할 건강 문제
- 오행 균형에 따른 건강 관리법
- 연령대별 건강 주의사항

## 5. 👥 인간관계 & 사회운
- ${genderText}으로서의 대인관계 특징
- 직장과 사회에서의 처세술
- 유리한 인맥과 피해야 할 관계

## 6. 📅 연도별 상세 운세 (2025-2029년)
각 연도별로 다음을 분석:
- 전반적인 운세 흐름
- 주요 변화와 기회
- 월별 중요 시기
- 구체적인 실행 방안

## 7. 🎁 ${genderText}을 위한 특별 개운법
- 행운의 색깔, 숫자, 방향
- 풍수 인테리어와 생활 환경
- 개운 아이템과 액세서리
- 피해야 할 것들과 금기사항

## 8. 🌟 최종 종합 조언
- ${genderText}으로서 가장 중요한 인생 전략 3가지
- 성공과 행복을 위한 핵심 포인트
- 실생활에 바로 적용할 수 있는 구체적 조언${purposeText}

**중요**: 반드시 ${genderText}의 특성을 고려하여 십신(十神)의 의미를 성별에 맞게 해석하고, 실용적이고 구체적인 조언을 제공해주세요. 각 항목마다 충분히 상세하게 분석하여 총 3000자 이상의 전문가 수준 분석을 부탁드립니다.`;

    return prompt;
}

// 유틸리티 함수들
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function formatTime(date) {
    return date.toTimeString().split(' ')[0].substring(0, 5);
}
