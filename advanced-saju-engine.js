// 🔮 고급 사주 분석 엔진 - 만세력 기반 상세 분석

class AdvancedSajuEngine {
    constructor() {
        this.initializeData();
        console.log('🔮 고급 사주 분석 엔진 초기화 완료');
    }

    initializeData() {
        // 천간 (10개)
        this.heavenlyStems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
        
        // 지지 (12개)
        this.earthlyBranches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
        
        // 십이지 동물
        this.zodiacAnimals = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];
        
        // 오행
        this.fiveElements = {
            '갑': '목', '을': '목', '병': '화', '정': '화', '무': '토',
            '기': '토', '경': '금', '신': '금', '임': '수', '계': '수',
            '자': '수', '축': '토', '인': '목', '묘': '목', '진': '토',
            '사': '화', '오': '화', '미': '토', '신': '금', '유': '금',
            '술': '토', '해': '수'
        };
        
        // 음양
        this.yinYang = {
            '갑': '양', '을': '음', '병': '양', '정': '음', '무': '양',
            '기': '음', '경': '양', '신': '음', '임': '양', '계': '음',
            '자': '양', '축': '음', '인': '양', '묘': '음', '진': '양',
            '사': '음', '오': '양', '미': '음', '신': '양', '유': '음',
            '술': '양', '해': '음'
        };
    }

    // 만세력 계산 (성별 포함)
    calculateFourPillars(year, month, day, hour, gender = 'male') {
        console.log(`📊 만세력 계산: ${year}년 ${month}월 ${day}일 ${hour}시 (${gender === 'male' ? '남성' : '여성'})`);
        
        // 년주 계산
        const yearPillar = this.calculateYearPillar(year);
        
        // 월주 계산
        const monthPillar = this.calculateMonthPillar(year, month);
        
        // 일주 계산
        const dayPillar = this.calculateDayPillar(year, month, day);
        
        // 시주 계산
        const hourPillar = this.calculateHourPillar(dayPillar.stem, hour);
        
        const fourPillars = {
            year: yearPillar,
            month: monthPillar,
            day: dayPillar,
            hour: hourPillar
        };
        
        console.log('🔮 만세력 계산 완료:', fourPillars);
        return fourPillars;
    }

    // 년주 계산
    calculateYearPillar(year) {
        // 서기 4년을 갑자년으로 기준
        const baseYear = 4;
        const yearIndex = (year - baseYear) % 60;
        
        const stemIndex = yearIndex % 10;
        const branchIndex = yearIndex % 12;
        
        return {
            stem: this.heavenlyStems[stemIndex],
            branch: this.earthlyBranches[branchIndex],
            animal: this.zodiacAnimals[branchIndex],
            element: this.fiveElements[this.heavenlyStems[stemIndex]],
            yinYang: this.yinYang[this.heavenlyStems[stemIndex]]
        };
    }

    // 월주 계산
    calculateMonthPillar(year, month) {
        // 년간에 따른 월간 계산
        const yearStemIndex = (year - 4) % 10;
        const monthStemIndex = (yearStemIndex * 2 + month + 1) % 10;
        const monthBranchIndex = (month + 1) % 12;
        
        return {
            stem: this.heavenlyStems[monthStemIndex],
            branch: this.earthlyBranches[monthBranchIndex],
            element: this.fiveElements[this.heavenlyStems[monthStemIndex]],
            yinYang: this.yinYang[this.heavenlyStems[monthStemIndex]]
        };
    }

    // 일주 계산 (간단화된 버전)
    calculateDayPillar(year, month, day) {
        // 기준일로부터의 일수 계산
        const baseDate = new Date(1900, 0, 1);
        const targetDate = new Date(year, month - 1, day);
        const daysDiff = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
        
        const stemIndex = (daysDiff + 36) % 10; // 1900년 1월 1일이 정축일
        const branchIndex = (daysDiff + 37) % 12;
        
        return {
            stem: this.heavenlyStems[stemIndex],
            branch: this.earthlyBranches[branchIndex],
            element: this.fiveElements[this.heavenlyStems[stemIndex]],
            yinYang: this.yinYang[this.heavenlyStems[stemIndex]]
        };
    }

    // 시주 계산
    calculateHourPillar(dayStem, hour) {
        const dayStemIndex = this.heavenlyStems.indexOf(dayStem);
        const hourBranchIndex = Math.floor(hour / 2) % 12;
        const hourStemIndex = (dayStemIndex * 2 + hourBranchIndex) % 10;
        
        return {
            stem: this.heavenlyStems[hourStemIndex],
            branch: this.earthlyBranches[hourBranchIndex],
            element: this.fiveElements[this.heavenlyStems[hourStemIndex]],
            yinYang: this.yinYang[this.heavenlyStems[hourStemIndex]]
        };
    }

    // 오행 분석
    analyzeFiveElements(fourPillars) {
        const elements = {
            목: 0, 화: 0, 토: 0, 금: 0, 수: 0
        };
        
        // 각 주의 천간, 지지 오행 계산
        Object.values(fourPillars).forEach(pillar => {
            elements[pillar.element]++;
            elements[this.fiveElements[pillar.branch]]++;
        });
        
        // 가장 강한 오행과 약한 오행 찾기
        const sortedElements = Object.entries(elements).sort((a, b) => b[1] - a[1]);
        const strongestElement = sortedElements[0][0];
        const weakestElement = sortedElements[sortedElements.length - 1][0];
        
        return {
            distribution: elements,
            strongest: strongestElement,
            weakest: weakestElement,
            balance: this.calculateElementBalance(elements)
        };
    }

    // 오행 균형 계산
    calculateElementBalance(elements) {
        const total = Object.values(elements).reduce((sum, count) => sum + count, 0);
        const average = total / 5;
        const variance = Object.values(elements).reduce((sum, count) => sum + Math.pow(count - average, 2), 0) / 5;
        
        if (variance < 1) return '매우 균형';
        if (variance < 2) return '균형';
        if (variance < 4) return '약간 불균형';
        return '불균형';
    }

    // 용신 분석 (간단화된 버전)
    analyzeUsefulGod(fourPillars, fiveElementAnalysis) {
        const dayMaster = fourPillars.day.element;
        const { strongest, weakest } = fiveElementAnalysis;
        
        // 일간이 강하면 설기하는 오행이 용신
        // 일간이 약하면 도와주는 오행이 용신
        let usefulGod;
        let avoidGod;
        
        if (strongest === dayMaster) {
            // 일간이 강함 - 설기하는 오행이 용신
            usefulGod = this.getControllingElement(dayMaster);
            avoidGod = this.getSupportingElement(dayMaster);
        } else {
            // 일간이 약함 - 도와주는 오행이 용신
            usefulGod = this.getSupportingElement(dayMaster);
            avoidGod = this.getControllingElement(dayMaster);
        }
        
        return { usefulGod, avoidGod, dayMaster };
    }

    // 오행 상생상극 관계
    getControllingElement(element) {
        const control = {
            '목': '토', '화': '금', '토': '수', '금': '목', '수': '화'
        };
        return control[element];
    }

    getSupportingElement(element) {
        const support = {
            '목': '수', '화': '목', '토': '화', '금': '토', '수': '금'
        };
        return support[element];
    }

    // 십신 분석
    analyzeTenGods(fourPillars) {
        const dayMaster = fourPillars.day.stem;
        const dayMasterIndex = this.heavenlyStems.indexOf(dayMaster);
        
        const tenGods = {};
        
        Object.entries(fourPillars).forEach(([position, pillar]) => {
            if (position !== 'day') {
                const stemIndex = this.heavenlyStems.indexOf(pillar.stem);
                const relationship = this.calculateTenGodRelationship(dayMasterIndex, stemIndex);
                tenGods[position] = relationship;
            }
        });
        
        return tenGods;
    }

    // 십신 관계 계산
    calculateTenGodRelationship(dayMasterIndex, targetIndex) {
        const diff = (targetIndex - dayMasterIndex + 10) % 10;
        const tenGodNames = [
            '비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'
        ];
        return tenGodNames[diff];
    }

    // 성별에 따른 사주 해석 차이 분석
    analyzeGenderDifferences(fourPillars, gender) {
        const analysis = {
            gender: gender,
            genderSpecific: {},
            marriageAspects: {},
            careerAspects: {},
            healthAspects: {}
        };

        // 성별에 따른 십신 해석 차이
        const tenGods = this.analyzeTenGods(fourPillars);
        
        if (gender === 'male') {
            // 남성의 경우
            analysis.genderSpecific = {
                정재: '아내, 배우자를 의미하며 결혼운과 직결',
                편재: '연인, 이성관계를 나타내며 바람기와 관련',
                정관: '직업, 명예, 사회적 지위를 의미',
                편관: '권력욕, 도전정신, 리더십을 나타냄',
                식신: '자녀운, 창의성, 표현력을 의미',
                상관: '재능, 기술, 반항정신을 나타냄'
            };
            
            analysis.marriageAspects = {
                정재강함: '좋은 배우자를 만날 가능성이 높고 결혼생활이 안정적',
                편재강함: '이성관계가 복잡할 수 있으며 바람기 주의',
                재성부족: '결혼운이 늦거나 배우자복이 약할 수 있음'
            };
            
        } else {
            // 여성의 경우
            analysis.genderSpecific = {
                정관: '남편, 배우자를 의미하며 결혼운과 직결',
                편관: '연인, 이성관계를 나타내며 복잡한 관계 가능',
                정인: '어머니, 보호자, 학습능력을 의미',
                편인: '계모, 독립성, 창의성을 나타냄',
                식신: '자녀운, 표현력, 여성적 매력을 의미',
                상관: '재능, 남편을 극하는 기운으로 주의 필요'
            };
            
            analysis.marriageAspects = {
                정관강함: '좋은 남편을 만날 가능성이 높고 결혼생활이 순조로움',
                편관강함: '이성관계가 복잡하거나 강한 남성을 선호',
                관성부족: '결혼운이 늦거나 남편복이 약할 수 있음',
                상관강함: '남편과 갈등이 생기기 쉬우므로 주의 필요'
            };
        }

        return analysis;
    }

    // 성별에 따른 오행 해석 차이
    analyzeFiveElementsByGender(fiveElementsBalance, gender) {
        const genderAnalysis = {
            ...fiveElementsBalance,
            genderSpecific: {}
        };

        if (gender === 'male') {
            genderAnalysis.genderSpecific = {
                목강함: '리더십이 강하고 진취적이나 고집이 셀 수 있음',
                화강함: '열정적이고 사교적이나 성급할 수 있음',
                토강함: '신중하고 안정적이나 보수적일 수 있음',
                금강함: '의지가 강하고 결단력이 있으나 융통성 부족',
                수강함: '지혜롭고 적응력이 뛰어나나 우유부단할 수 있음'
            };
        } else {
            genderAnalysis.genderSpecific = {
                목강함: '독립적이고 자주적이나 남성적 성향이 강할 수 있음',
                화강함: '매력적이고 활발하나 감정기복이 클 수 있음',
                토강함: '포용력이 크고 현실적이나 고집이 셀 수 있음',
                금강함: '의지가 강하고 깔끔하나 차가워 보일 수 있음',
                수강함: '지혜롭고 부드러우나 의존적일 수 있음'
            };
        }

        return genderAnalysis;
    }

    // 성별 맞춤 조언 생성
    generateGenderSpecificAdvice(fourPillars, gender) {
        const advice = {
            relationship: [],
            career: [],
            health: [],
            lifestyle: []
        };

        if (gender === 'male') {
            advice.relationship.push('배우자와의 관계에서 포용력을 발휘하세요');
            advice.relationship.push('가정에서 든든한 버팀목 역할을 하세요');
            advice.career.push('리더십을 발휘할 수 있는 분야에서 성공 가능');
            advice.career.push('사회적 책임감을 가지고 일하세요');
            advice.health.push('스트레스 관리와 규칙적인 운동이 중요');
            advice.lifestyle.push('가족을 위한 경제적 안정을 추구하세요');
        } else {
            advice.relationship.push('내면의 여성적 매력을 발휘하세요');
            advice.relationship.push('상대방을 이해하고 배려하는 마음을 가지세요');
            advice.career.push('섬세함과 직관력을 활용한 분야에서 성공');
            advice.career.push('인간관계를 중시하는 업무가 적합');
            advice.health.push('여성 건강 관리와 정기검진이 중요');
            advice.lifestyle.push('일과 가정의 균형을 잘 맞추세요');
        }

        return advice;
    }
}

// 전역 인스턴스 생성
window.advancedSajuEngine = new AdvancedSajuEngine();
