// 🔮 상세 분석 생성기 - 만세력 기반 설득력 있는 해석

class DetailedAnalysisGenerator {
    constructor() {
        console.log('📝 상세 분석 생성기 초기화 완료');
    }

    // 메인 분석 생성 함수
    generateDetailedAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis, tenGodsAnalysis) {
        console.log('📊 상세 분석 생성 시작');
        
        const gender = birthData.gender || 'male';
        
        return {
            personality: this.generatePersonalityAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis, gender),
            fortune: this.generateFortuneAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis, gender),
            career: this.generateCareerAnalysis(birthData, fourPillars, tenGodsAnalysis, usefulGodAnalysis, gender),
            love: this.generateLoveAnalysis(birthData, fourPillars, fiveElementAnalysis, tenGodsAnalysis, gender),
            wealth: this.generateWealthAnalysis(birthData, fourPillars, tenGodsAnalysis, usefulGodAnalysis, gender),
            health: this.generateHealthAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis, gender)
        };
    }

    // 성격 분석 생성 (성별 반영)
    generatePersonalityAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis, gender) {
        const { year, month, day, hour } = birthData;
        const dayMaster = fourPillars.day.stem;
        const dayBranch = fourPillars.day.branch;
        const dayElement = fourPillars.day.element;
        const { strongest, weakest, balance } = fiveElementAnalysis;
        
        const genderText = gender === 'male' ? '남성' : '여성';
        
        let analysis = `**📊 만세력 기반 성격 분석 (${genderText})**\n\n`;
        
        // 일간 기본 성격 (성별 반영)
        analysis += `**🎯 일간(日干) ${dayMaster}의 기본 성격:**\n`;
        analysis += this.getDayMasterPersonalityByGender(dayMaster, gender) + '\n\n';
        
        // 일지의 영향 (성별 반영)
        analysis += `**🏠 일지(日支) ${dayBranch}의 영향:**\n`;
        analysis += this.getDayBranchInfluenceByGender(dayBranch, gender) + '\n\n';
        
        // 오행 분석 (성별 반영)
        analysis += `**⚖️ 오행 분석 (${balance}):**\n`;
        analysis += `• 가장 강한 오행: ${strongest} - ${this.getElementCharacteristicByGender(strongest, gender)}\n`;
        analysis += `• 가장 약한 오행: ${weakest} - ${this.getElementWeaknessByGender(weakest, gender)}\n\n`;
        
        // 태어난 시기의 영향
        analysis += `**🌅 출생 시기의 영향:**\n`;
        analysis += this.getBirthTimeInfluence(year, month, day, hour) + '\n\n';
        
        // 성별 특성 분석
        analysis += `**👤 ${genderText} 특성 분석:**\n`;
        analysis += this.getGenderSpecificPersonality(fourPillars, gender) + '\n\n';
        
        // 종합 결론
        analysis += `**🎭 종합 성격 특성:**\n`;
        analysis += this.getPersonalitySummary(fourPillars, fiveElementAnalysis);
        
        return {
            title: "🎭 성격 분석",
            content: analysis
        };
    }

    // 운세 분석 생성
    generateFortuneAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis) {
        const { usefulGod, avoidGod, dayMaster } = usefulGodAnalysis;
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthData.year + 1;
        
        let analysis = `**🌟 만세력 기반 운세 분석**\n\n`;
        
        // 용신 분석
        analysis += `**🎯 용신(用神) 분석:**\n`;
        analysis += `• 용신: ${usefulGod} - ${this.getUsefulGodMeaning(usefulGod)}\n`;
        analysis += `• 기신: ${avoidGod} - ${this.getAvoidGodMeaning(avoidGod)}\n\n`;
        
        // 현재 나이대 운세
        analysis += `**📅 현재 ${age}세 운세:**\n`;
        analysis += this.getCurrentAgeFortune(age, fourPillars, usefulGodAnalysis) + '\n\n';
        
        // 계절별 운세
        analysis += `**🌸 계절별 운세:**\n`;
        analysis += this.getSeasonalFortune(fourPillars, usefulGodAnalysis) + '\n\n';
        
        // 향후 5년 전망
        analysis += `**🔮 향후 5년 전망:**\n`;
        analysis += this.getFutureProspect(birthData, fourPillars, usefulGodAnalysis);
        
        return {
            title: "🌟 전반적 운세",
            content: analysis
        };
    }

    // 직업 분석 생성
    generateCareerAnalysis(birthData, fourPillars, tenGodsAnalysis, usefulGodAnalysis) {
        const dayMaster = fourPillars.day.stem;
        const dayElement = fourPillars.day.element;
        const { usefulGod } = usefulGodAnalysis;
        
        let analysis = `**💼 만세력 기반 직업 분석**\n\n`;
        
        // 일간별 직업 적성
        analysis += `**🎯 일간 ${dayMaster}의 직업 적성:**\n`;
        analysis += this.getDayMasterCareer(dayMaster) + '\n\n';
        
        // 십신 분석
        analysis += `**🔟 십신(十神) 직업 분석:**\n`;
        analysis += this.getTenGodsCareerAnalysis(tenGodsAnalysis) + '\n\n';
        
        // 용신 기반 직업 추천
        analysis += `**⭐ 용신 ${usefulGod} 기반 추천 직업:**\n`;
        analysis += this.getUsefulGodCareer(usefulGod) + '\n\n';
        
        // 사업 vs 직장
        analysis += `**🏢 사업 vs 직장 적성:**\n`;
        analysis += this.getBusinessVsEmployee(fourPillars, tenGodsAnalysis);
        
        return {
            title: "💼 직업 운세",
            content: analysis
        };
    }

    // 연애 분석 생성
    generateLoveAnalysis(birthData, fourPillars, fiveElementAnalysis, tenGodsAnalysis) {
        const dayMaster = fourPillars.day.stem;
        const dayElement = fourPillars.day.element;
        const isYang = fourPillars.day.yinYang === '양';
        
        let analysis = `**💕 만세력 기반 연애 분석**\n\n`;
        
        // 일간별 연애 스타일
        analysis += `**💖 일간 ${dayMaster}의 연애 스타일:**\n`;
        analysis += this.getDayMasterLoveStyle(dayMaster, isYang) + '\n\n';
        
        // 배우자궁 분석
        analysis += `**🏠 배우자궁(日支) 분석:**\n`;
        analysis += this.getSpouseAnalysis(fourPillars.day.branch) + '\n\n';
        
        // 십신 연애 분석
        analysis += `**🔟 십신 연애 패턴:**\n`;
        analysis += this.getTenGodsLoveAnalysis(tenGodsAnalysis) + '\n\n';
        
        // 궁합 조언
        analysis += `**💑 이상적인 상대방:**\n`;
        analysis += this.getIdealPartner(fourPillars, fiveElementAnalysis);
        
        return {
            title: "💕 연애 운세",
            content: analysis
        };
    }

    // 재물 분석 생성
    generateWealthAnalysis(birthData, fourPillars, tenGodsAnalysis, usefulGodAnalysis) {
        const dayMaster = fourPillars.day.stem;
        const { usefulGod } = usefulGodAnalysis;
        
        let analysis = `**💰 만세력 기반 재물 분석**\n\n`;
        
        // 일간별 재물 성향
        analysis += `**💎 일간 ${dayMaster}의 재물 성향:**\n`;
        analysis += this.getDayMasterWealth(dayMaster) + '\n\n';
        
        // 십신 재물 분석
        analysis += `**🔟 십신 재물 패턴:**\n`;
        analysis += this.getTenGodsWealthAnalysis(tenGodsAnalysis) + '\n\n';
        
        // 용신 기반 재물 조언
        analysis += `**⭐ 용신 ${usefulGod} 기반 재물 전략:**\n`;
        analysis += this.getUsefulGodWealthStrategy(usefulGod) + '\n\n';
        
        // 투자 vs 저축
        analysis += `**📈 투자 성향 분석:**\n`;
        analysis += this.getInvestmentStyle(fourPillars, tenGodsAnalysis);
        
        return {
            title: "💰 재물 운세",
            content: analysis
        };
    }

    // 건강 분석 생성
    generateHealthAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis) {
        const dayElement = fourPillars.day.element;
        const { strongest, weakest } = fiveElementAnalysis;
        const { usefulGod, avoidGod } = usefulGodAnalysis;
        
        let analysis = `**🏥 만세력 기반 건강 분석**\n\n`;
        
        // 일간별 건강 특성
        analysis += `**🎯 일간 오행 ${dayElement}의 건강 특성:**\n`;
        analysis += this.getElementHealthCharacteristic(dayElement) + '\n\n';
        
        // 오행 불균형 건강 영향
        analysis += `**⚖️ 오행 불균형 건강 영향:**\n`;
        analysis += `• 과다한 ${strongest}: ${this.getExcessElementHealth(strongest)}\n`;
        analysis += `• 부족한 ${weakest}: ${this.getDeficientElementHealth(weakest)}\n\n`;
        
        // 용신 기반 건강 관리
        analysis += `**⭐ 용신 ${usefulGod} 기반 건강 관리:**\n`;
        analysis += this.getUsefulGodHealthAdvice(usefulGod) + '\n\n';
        
        // 계절별 건강 주의사항
        analysis += `**🌸 계절별 건강 관리:**\n`;
        analysis += this.getSeasonalHealthAdvice(fourPillars, fiveElementAnalysis);
        
        return {
            title: "🏥 건강 운세",
            content: analysis
        };
    }

    // 일간별 기본 성격 (상세 버전)
    getDayMasterPersonality(dayMaster) {
        const personalities = {
            '갑': '큰 나무처럼 곧고 정직하며 리더십이 강합니다. 성장 욕구가 강하고 새로운 것을 개척하는 것을 좋아하지만, 때로는 고집이 세고 융통성이 부족할 수 있습니다.',
            '을': '꽃이나 풀처럼 부드럽고 섬세하며 적응력이 뛰어납니다. 예술적 감각이 뛰어나고 타인을 배려하는 마음이 깊지만, 우유부단하고 의존적인 면이 있습니다.',
            '병': '태양처럼 밝고 열정적이며 사교적입니다. 창의력이 뛰어나고 사람들을 이끄는 카리스마가 있지만, 감정 기복이 크고 지속력이 부족할 수 있습니다.',
            '정': '촛불처럼 따뜻하고 세심하며 배려심이 깊습니다. 예술적 재능이 있고 사람들과의 관계를 중시하지만, 예민하고 스트레스를 잘 받는 편입니다.',
            '무': '산처럼 든든하고 안정적이며 책임감이 강합니다. 포용력이 크고 신뢰할 수 있는 성격이지만, 변화를 싫어하고 보수적인 면이 있습니다.',
            '기': '밭처럼 너그럽고 포용력이 있으며 실용적입니다. 봉사정신이 강하고 다른 사람을 잘 도와주지만, 자기주장이 약하고 우유부단할 수 있습니다.',
            '경': '금속처럼 강하고 의지력이 있으며 정의감이 강합니다. 원칙을 중시하고 결단력이 있지만, 융통성이 부족하고 고집이 셀 수 있습니다.',
            '신': '보석처럼 세련되고 감각이 뛰어나며 완벽주의적입니다. 미적 감각이 뛰어나고 품격이 있지만, 까다롭고 비판적인 면이 있습니다.',
            '임': '바다처럼 깊고 넓으며 포용력이 있습니다. 지혜롭고 통찰력이 뛰어나며 적응력이 좋지만, 변덕스럽고 일관성이 부족할 수 있습니다.',
            '계': '이슬처럼 순수하고 섬세하며 직감력이 뛰어납니다. 감수성이 풍부하고 창의적이지만, 소극적이고 의존적인 면이 있습니다.'
        };
        return personalities[dayMaster] || '특별한 개성을 가진 성격입니다.';
    }

    // 일지의 영향 분석
    getDayBranchInfluence(dayBranch) {
        const influences = {
            '자': '지혜롭고 학구적인 성향을 강화시킵니다. 깊이 있는 사고를 하며 연구하는 것을 좋아합니다.',
            '축': '성실하고 근면한 성향을 강화시킵니다. 꾸준히 노력하며 실무 능력이 뛰어납니다.',
            '인': '적극적이고 진취적인 성향을 강화시킵니다. 새로운 도전을 즐기며 리더십을 발휘합니다.',
            '묘': '온화하고 예술적인 성향을 강화시킵니다. 미적 감각이 뛰어나며 평화를 추구합니다.',
            '진': '변화를 추구하는 성향을 강화시킵니다. 혁신적이고 개혁적인 성격을 보입니다.',
            '사': '지적이고 분석적인 성향을 강화시킵니다. 깊이 있는 통찰력을 가지고 있습니다.',
            '오': '열정적이고 활동적인 성향을 강화시킵니다. 에너지가 넘치며 사교적입니다.',
            '미': '배려심과 봉사정신을 강화시킵니다. 다른 사람을 돕는 것을 좋아합니다.',
            '신': '변화와 이동을 좋아하는 성향을 강화시킵니다. 자유롭고 모험적인 성격입니다.',
            '유': '완벽주의적 성향을 강화시킵니다. 세심하고 정확한 일처리를 선호합니다.',
            '술': '포용력과 관용을 강화시킵니다. 너그럽고 인정이 많은 성격을 보입니다.',
            '해': '순수하고 직관적인 성향을 강화시킵니다. 감성이 풍부하고 창의적입니다.'
        };
        return influences[dayBranch] || '특별한 영향을 미칩니다.';
    }

    // 오행별 특성
    getElementCharacteristic(element) {
        const characteristics = {
            '목': '성장과 발전을 추구하는 진취적 성격',
            '화': '열정적이고 창의적인 표현력',
            '토': '안정과 신뢰를 바탕으로 한 포용력',
            '금': '원칙과 정의를 중시하는 강인함',
            '수': '지혜와 적응력을 바탕으로 한 유연성'
        };
        return characteristics[element];
    }

    // 오행 부족시 약점
    getElementWeakness(element) {
        const weaknesses = {
            '목': '성장 동력 부족으로 인한 소극적 성향',
            '화': '표현력 부족으로 인한 내성적 성향',
            '토': '안정감 부족으로 인한 불안정성',
            '금': '의지력 부족으로 인한 우유부단함',
            '수': '지혜 부족으로 인한 판단력 저하'
        };
        return weaknesses[element];
    }
}
    // 출생 시기 영향 분석
    getBirthTimeInfluence(year, month, day, hour) {
        const season = Math.floor((month - 1) / 3);
        const timeOfDay = Math.floor(hour / 6);
        
        const seasonInfluences = [
            `봄(${month}월)에 태어나 새로운 시작과 성장의 에너지를 가지고 있습니다. 희망적이고 진취적인 성향이 강합니다.`,
            `여름(${month}월)에 태어나 열정과 활력의 에너지를 가지고 있습니다. 적극적이고 사교적인 성향이 강합니다.`,
            `가을(${month}월)에 태어나 수확과 성숙의 에너지를 가지고 있습니다. 차분하고 실용적인 성향이 강합니다.`,
            `겨울(${month}월)에 태어나 저장과 성찰의 에너지를 가지고 있습니다. 신중하고 깊이 있는 성향이 강합니다.`
        ];
        
        const timeInfluences = [
            `새벽(${hour}시)에 태어나 고요하고 성찰적인 에너지를 가지고 있습니다.`,
            `오전(${hour}시)에 태어나 상승하고 발전하는 에너지를 가지고 있습니다.`,
            `오후(${hour}시)에 태어나 안정되고 성숙한 에너지를 가지고 있습니다.`,
            `저녁(${hour}시)에 태어나 차분하고 지혜로운 에너지를 가지고 있습니다.`
        ];
        
        return seasonInfluences[season] + ' ' + timeInfluences[timeOfDay];
    }

    // 성격 종합 요약
    getPersonalitySummary(fourPillars, fiveElementAnalysis) {
        const dayMaster = fourPillars.day.stem;
        const { strongest, balance } = fiveElementAnalysis;
        
        let summary = `일간 ${dayMaster}의 기본 성격에 `;
        
        if (balance === '매우 균형' || balance === '균형') {
            summary += '오행이 조화롭게 배치되어 안정적이고 균형잡힌 성격을 보입니다. ';
        } else {
            summary += `${strongest} 오행이 강해 해당 특성이 두드러지게 나타납니다. `;
        }
        
        summary += '전체적으로 타고난 장점을 잘 활용하면서 부족한 부분을 보완해 나간다면 더욱 완성된 인격체로 성장할 수 있을 것입니다.';
        
        return summary;
    }

    // 용신 의미 설명
    getUsefulGodMeaning(usefulGod) {
        const meanings = {
            '목': '성장과 발전을 도와주는 에너지. 새로운 도전과 학습이 도움됩니다.',
            '화': '열정과 창의성을 북돋는 에너지. 표현 활동과 사교 활동이 도움됩니다.',
            '토': '안정과 신뢰를 주는 에너지. 꾸준한 노력과 기반 구축이 도움됩니다.',
            '금': '의지력과 결단력을 주는 에너지. 원칙 있는 행동과 정의로운 일이 도움됩니다.',
            '수': '지혜와 유연성을 주는 에너지. 학습과 적응력 향상이 도움됩니다.'
        };
        return meanings[usefulGod];
    }

    // 기신 의미 설명
    getAvoidGodMeaning(avoidGod) {
        const meanings = {
            '목': '과도한 성장 욕구로 인한 무리. 너무 급하게 추진하지 않도록 주의가 필요합니다.',
            '화': '과도한 열정으로 인한 소모. 감정 조절과 체력 관리에 주의가 필요합니다.',
            '토': '과도한 안주로 인한 정체. 변화를 두려워하지 말고 도전 정신을 가져야 합니다.',
            '금': '과도한 고집으로 인한 갈등. 융통성을 기르고 타협하는 자세가 필요합니다.',
            '수': '과도한 변화로 인한 불안정. 일관성을 유지하고 중심을 잡는 것이 중요합니다.'
        };
        return meanings[avoidGod];
    }

    // 현재 나이대 운세
    getCurrentAgeFortune(age, fourPillars, usefulGodAnalysis) {
        const { usefulGod } = usefulGodAnalysis;
        let fortune = '';
        
        if (age < 20) {
            fortune = '성장기로 기초를 다지는 시기입니다. 학습과 인격 형성에 집중하세요.';
        } else if (age < 30) {
            fortune = '청년기로 자아를 찾고 기반을 구축하는 시기입니다. 다양한 경험을 쌓으세요.';
        } else if (age < 40) {
            fortune = '성인기로 본격적인 사회 활동과 성취를 이루는 시기입니다. 적극적으로 도전하세요.';
        } else if (age < 50) {
            fortune = '중년기로 안정과 발전을 동시에 추구하는 시기입니다. 균형을 유지하세요.';
        } else if (age < 60) {
            fortune = '성숙기로 경험과 지혜를 바탕으로 후진을 양성하는 시기입니다.';
        } else {
            fortune = '원숙기로 인생의 완성과 여유를 즐기는 시기입니다.';
        }
        
        fortune += ` 특히 ${usefulGod} 오행과 관련된 활동이나 환경이 도움이 될 것입니다.`;
        
        return fortune;
    }

    // 계절별 운세
    getSeasonalFortune(fourPillars, usefulGodAnalysis) {
        const { usefulGod, avoidGod } = usefulGodAnalysis;
        
        const seasonalAdvice = {
            '봄': usefulGod === '목' ? '매우 좋은 시기' : avoidGod === '목' ? '주의가 필요한 시기' : '보통',
            '여름': usefulGod === '화' ? '매우 좋은 시기' : avoidGod === '화' ? '주의가 필요한 시기' : '보통',
            '가을': usefulGod === '금' ? '매우 좋은 시기' : avoidGod === '금' ? '주의가 필요한 시기' : '보통',
            '겨울': usefulGod === '수' ? '매우 좋은 시기' : avoidGod === '수' ? '주의가 필요한 시기' : '보통'
        };
        
        let advice = '';
        Object.entries(seasonalAdvice).forEach(([season, status]) => {
            advice += `• ${season}: ${status}\n`;
        });
        
        return advice;
    }

    // 향후 5년 전망
    getFutureProspect(birthData, fourPillars, usefulGodAnalysis) {
        const currentYear = new Date().getFullYear();
        const { usefulGod } = usefulGodAnalysis;
        
        let prospect = `향후 5년간은 전반적으로 `;
        
        // 간단한 대운 계산 (실제로는 더 복잡함)
        const age = currentYear - birthData.year + 1;
        const majorLuckPeriod = Math.floor(age / 10);
        
        if (majorLuckPeriod % 2 === 0) {
            prospect += '상승 운세를 보일 것으로 예상됩니다. ';
        } else {
            prospect += '안정적인 운세를 보일 것으로 예상됩니다. ';
        }
        
        prospect += `특히 ${usefulGod} 오행이 강해지는 시기에는 큰 발전이 있을 것이며, `;
        prospect += `${currentYear + 2}년과 ${currentYear + 4}년이 특히 중요한 전환점이 될 것으로 보입니다.`;
        
        return prospect;
    }

    // 일간별 직업 적성
    getDayMasterCareer(dayMaster) {
        const careers = {
            '갑': '대기업 임원, 정치가, 교육자, 건축가 등 큰 조직을 이끌거나 기반을 구축하는 일에 적합합니다.',
            '을': '예술가, 디자이너, 상담사, 서비스업 등 섬세함과 배려가 필요한 일에 적합합니다.',
            '병': '연예인, 광고업, 방송인, 영업직 등 창의성과 표현력이 필요한 일에 적합합니다.',
            '정': '요리사, 미용사, 간호사, 문화예술 분야 등 따뜻함과 세심함이 필요한 일에 적합합니다.',
            '무': '부동산업, 건설업, 농업, 금융업 등 안정성과 신뢰가 중요한 일에 적합합니다.',
            '기': '사회복지사, 농업, 유통업, 서비스업 등 봉사와 실용성이 중요한 일에 적합합니다.',
            '경': '법조인, 군인, 경찰, 의사 등 정의와 원칙이 중요한 일에 적합합니다.',
            '신': '보석상, 정밀기계, IT업계, 금융업 등 정확성과 기술이 중요한 일에 적합합니다.',
            '임': '학자, 연구원, 컨설턴트, 무역업 등 지혜와 유연성이 필요한 일에 적합합니다.',
            '계': '예술가, 종교인, 상담사, 치료사 등 순수함과 직감이 필요한 일에 적합합니다.'
        };
        return careers[dayMaster];
    }

    // 십신 직업 분석
    getTenGodsCareerAnalysis(tenGodsAnalysis) {
        let analysis = '';
        Object.entries(tenGodsAnalysis).forEach(([position, tenGod]) => {
            const meanings = {
                '비견': '동업이나 파트너십이 유리',
                '겁재': '경쟁이 치열한 분야에서 성공',
                '식신': '창작이나 표현 분야에 재능',
                '상관': '기술이나 전문 분야에 적합',
                '편재': '사업이나 투자에 재능',
                '정재': '안정적인 직장이 유리',
                '편관': '자유로운 환경에서 능력 발휘',
                '정관': '공직이나 대기업에 적합',
                '편인': '연구나 학술 분야에 재능',
                '정인': '교육이나 상담 분야에 적합'
            };
            analysis += `• ${position}주 ${tenGod}: ${meanings[tenGod]}\n`;
        });
        return analysis;
    }

    // 용신 기반 직업 추천
    getUsefulGodCareer(usefulGod) {
        const careers = {
            '목': '교육, 출판, 임업, 제지업, 섬유업 등 성장과 발전 관련 분야',
            '화': '방송, 광고, 요식업, 화학공업, 전자업 등 열정과 창의성 관련 분야',
            '토': '부동산, 건설, 농업, 도자기업, 보험업 등 안정과 신뢰 관련 분야',
            '금': '금융, 기계, 자동차, 철강업, 보안업 등 정확성과 강인함 관련 분야',
            '수': '물류, 운송, 수산업, 음료업, 정보통신업 등 유통과 소통 관련 분야'
        };
        return careers[usefulGod];
    }

    // 사업 vs 직장 적성
    getBusinessVsEmployee(fourPillars, tenGodsAnalysis) {
        const hasEntrepreneurSpirit = Object.values(tenGodsAnalysis).includes('편재') || 
                                    Object.values(tenGodsAnalysis).includes('편관');
        const hasStability = Object.values(tenGodsAnalysis).includes('정재') || 
                            Object.values(tenGodsAnalysis).includes('정관');
        
        if (hasEntrepreneurSpirit && !hasStability) {
            return '사업가 기질이 강합니다. 자유로운 환경에서 창의성을 발휘할 때 성공할 가능성이 높습니다.';
        } else if (hasStability && !hasEntrepreneurSpirit) {
            return '직장인 기질이 강합니다. 안정적인 조직에서 체계적으로 일할 때 성공할 가능성이 높습니다.';
        } else {
            return '사업과 직장 모두 가능합니다. 상황에 따라 유연하게 선택하는 것이 좋겠습니다.';
        }
    }

    // 성별에 따른 일간 성격 분석
    getDayMasterPersonalityByGender(dayMaster, gender) {
        const personalities = {
            '갑': {
                male: '큰 나무의 기상을 가진 남성으로, 강직하고 정의로우며 리더십이 뛰어납니다. 진취적이고 개척정신이 강하여 새로운 분야에서 성공할 가능성이 높습니다.',
                female: '큰 나무의 기상을 가진 여성으로, 독립적이고 자주적인 성향이 강합니다. 남성적인 면이 있어 리더십을 발휘하지만, 때로는 부드러움이 필요할 수 있습니다.'
            },
            '을': {
                male: '작은 나무의 유연함을 가진 남성으로, 섬세하고 배려심이 깊습니다. 협력을 중시하며 조화로운 관계를 만드는 데 뛰어납니다.',
                female: '작은 나무의 우아함을 가진 여성으로, 부드럽고 온화한 성격입니다. 여성적 매력이 뛰어나며 타인을 배려하는 마음이 깊습니다.'
            },
            '병': {
                male: '태양의 열정을 가진 남성으로, 활동적이고 사교적입니다. 밝고 긍정적인 에너지로 주변을 이끌어가는 카리스마가 있습니다.',
                female: '태양의 밝음을 가진 여성으로, 활발하고 매력적입니다. 사교성이 뛰어나고 주변을 밝게 만드는 긍정적인 에너지를 가지고 있습니다.'
            },
            '정': {
                male: '촛불의 따뜻함을 가진 남성으로, 섬세하고 예술적 감각이 뛰어납니다. 배려심이 깊고 타인의 마음을 잘 이해합니다.',
                female: '촛불의 온화함을 가진 여성으로, 부드럽고 따뜻한 성격입니다. 예술적 재능이 있고 섬세한 감성을 가지고 있습니다.'
            },
            '무': {
                male: '산의 안정감을 가진 남성으로, 신중하고 책임감이 강합니다. 현실적이고 실용적인 사고를 하며 신뢰할 수 있는 성격입니다.',
                female: '산의 포용력을 가진 여성으로, 안정적이고 현실적입니다. 가정적이고 책임감이 강하며 주변을 든든하게 뒷받침합니다.'
            },
            '기': {
                male: '대지의 포용력을 가진 남성으로, 온화하고 배려심이 깊습니다. 협력을 중시하며 조화로운 관계를 만드는 데 뛰어납니다.',
                female: '대지의 모성애를 가진 여성으로, 포용력이 크고 헌신적입니다. 가족과 주변 사람들을 잘 돌보는 따뜻한 성격입니다.'
            },
            '경': {
                male: '칼의 예리함을 가진 남성으로, 의지가 강하고 결단력이 뛰어납니다. 정의감이 강하고 원칙을 중시하는 성격입니다.',
                female: '칼의 강인함을 가진 여성으로, 의지가 강하고 독립적입니다. 때로는 차가워 보일 수 있지만 내면은 따뜻한 마음을 가지고 있습니다.'
            },
            '신': {
                male: '보석의 가치를 가진 남성으로, 세련되고 품격이 있습니다. 완벽주의 성향이 있고 아름다운 것을 추구합니다.',
                female: '보석의 아름다움을 가진 여성으로, 우아하고 세련된 매력을 가지고 있습니다. 품격 있는 생활을 추구하며 미적 감각이 뛰어납니다.'
            },
            '임': {
                male: '바다의 포용력을 가진 남성으로, 지혜롭고 적응력이 뛰어납니다. 깊이 있는 사고를 하며 상황 판단력이 뛰어납니다.',
                female: '바다의 깊이를 가진 여성으로, 지혜롭고 직관력이 뛰어납니다. 감정이 풍부하고 타인의 마음을 잘 이해합니다.'
            },
            '계': {
                male: '이슬의 순수함을 가진 남성으로, 섬세하고 감성적입니다. 예술적 재능이 있고 타인을 배려하는 마음이 깊습니다.',
                female: '이슬의 청순함을 가진 여성으로, 순수하고 감성적입니다. 여성적 매력이 뛰어나고 섬세한 감정을 가지고 있습니다.'
            }
        };
        
        return personalities[dayMaster]?.[gender] || '특별한 개성을 가진 분입니다.';
    }

    // 성별에 따른 일지 영향 분석
    getDayBranchInfluenceByGender(dayBranch, gender) {
        const influences = {
            '자': {
                male: '지혜와 학습능력이 뛰어난 남성입니다. 연구나 학술 분야에서 성공할 가능성이 높습니다.',
                female: '지적이고 현명한 여성입니다. 교육이나 상담 분야에서 능력을 발휘할 수 있습니다.'
            },
            '축': {
                male: '신중하고 안정적인 남성입니다. 꾸준함과 인내력으로 성공을 이룰 수 있습니다.',
                female: '현실적이고 실용적인 여성입니다. 가정을 잘 꾸려나가는 능력이 뛰어납니다.'
            },
            '인': {
                male: '진취적이고 개척정신이 강한 남성입니다. 새로운 분야에서 리더십을 발휘할 수 있습니다.',
                female: '독립적이고 자주적인 여성입니다. 사회활동에서 능력을 인정받을 수 있습니다.'
            },
            '묘': {
                male: '섬세하고 예술적 감각이 뛰어난 남성입니다. 창작 분야에서 재능을 발휘할 수 있습니다.',
                female: '우아하고 품격 있는 여성입니다. 예술이나 문화 분야에서 성공할 가능성이 높습니다.'
            },
            '진': {
                male: '포용력이 크고 리더십이 있는 남성입니다. 조직을 이끌어가는 능력이 뛰어납니다.',
                female: '포용력이 크고 헌신적인 여성입니다. 가족과 주변 사람들을 잘 돌보는 성격입니다.'
            },
            '사': {
                male: '열정적이고 창의적인 남성입니다. 예술이나 창작 분야에서 성공할 수 있습니다.',
                female: '매력적이고 감성적인 여성입니다. 표현력이 뛰어나고 사람들의 관심을 끌 수 있습니다.'
            },
            '오': {
                male: '활동적이고 사교적인 남성입니다. 대인관계가 원만하고 인기가 많습니다.',
                female: '밝고 활발한 여성입니다. 사교성이 뛰어나고 주변을 즐겁게 만드는 능력이 있습니다.'
            },
            '미': {
                male: '온화하고 배려심이 깊은 남성입니다. 협력을 중시하며 조화로운 관계를 만듭니다.',
                female: '부드럽고 따뜻한 여성입니다. 가정적이고 타인을 배려하는 마음이 깊습니다.'
            },
            '신': {
                male: '의지가 강하고 결단력이 있는 남성입니다. 목표를 향해 꾸준히 노력하는 성격입니다.',
                female: '강인하고 독립적인 여성입니다. 자신의 길을 개척해 나가는 능력이 있습니다.'
            },
            '유': {
                male: '세련되고 품격이 있는 남성입니다. 완벽을 추구하며 아름다운 것을 좋아합니다.',
                female: '우아하고 세련된 여성입니다. 미적 감각이 뛰어나고 품격 있는 생활을 추구합니다.'
            },
            '술': {
                male: '신뢰할 수 있고 책임감이 강한 남성입니다. 안정적인 관계를 중시합니다.',
                female: '현실적이고 실용적인 여성입니다. 가정을 안정적으로 꾸려나가는 능력이 뛰어납니다.'
            },
            '해': {
                male: '지혜롭고 적응력이 뛰어난 남성입니다. 상황 판단력이 뛰어나고 융통성이 있습니다.',
                female: '직관력이 뛰어나고 감성적인 여성입니다. 타인의 마음을 잘 이해하고 공감하는 능력이 있습니다.'
            }
        };
        
        return influences[dayBranch]?.[gender] || '특별한 영향을 받는 분입니다.';
    }

    // 성별에 따른 오행 특성 분석
    getElementCharacteristicByGender(element, gender) {
        const characteristics = {
            '목': {
                male: '성장과 발전을 추구하는 진취적인 성격으로, 리더십이 강하지만 때로는 고집이 셀 수 있습니다.',
                female: '독립적이고 자주적인 성격으로, 남성적인 면이 강하지만 내면의 부드러움도 가지고 있습니다.'
            },
            '화': {
                male: '열정적이고 활동적인 성격으로, 사교성이 뛰어나지만 때로는 성급할 수 있습니다.',
                female: '밝고 매력적인 성격으로, 표현력이 뛰어나지만 감정기복이 클 수 있습니다.'
            },
            '토': {
                male: '안정적이고 신중한 성격으로, 신뢰할 수 있지만 때로는 보수적일 수 있습니다.',
                female: '포용력이 크고 현실적인 성격으로, 가정적이지만 때로는 고집이 셀 수 있습니다.'
            },
            '금': {
                male: '의지가 강하고 결단력이 있는 성격으로, 정의롭지만 때로는 융통성이 부족할 수 있습니다.',
                female: '강인하고 독립적인 성격으로, 의지가 강하지만 때로는 차가워 보일 수 있습니다.'
            },
            '수': {
                male: '지혜롭고 적응력이 뛰어난 성격으로, 유연하지만 때로는 우유부단할 수 있습니다.',
                female: '직관력이 뛰어나고 감성적인 성격으로, 부드럽지만 때로는 의존적일 수 있습니다.'
            }
        };
        
        return characteristics[element]?.[gender] || '특별한 특성을 가지고 있습니다.';
    }

    // 성별에 따른 오행 약점 분석
    getElementWeaknessByGender(element, gender) {
        const weaknesses = {
            '목': {
                male: '성장 동력이 부족하여 진취성이 약할 수 있습니다. 새로운 도전을 통해 활력을 찾으세요.',
                female: '독립성이 부족하여 의존적일 수 있습니다. 자신만의 목표를 세우고 추진력을 기르세요.'
            },
            '화': {
                male: '열정과 표현력이 부족하여 소극적일 수 있습니다. 적극적인 소통과 활동을 늘리세요.',
                female: '매력과 활력이 부족하여 침체될 수 있습니다. 밝고 긍정적인 에너지를 기르세요.'
            },
            '토': {
                male: '안정감과 신뢰성이 부족하여 불안할 수 있습니다. 꾸준함과 인내력을 기르세요.',
                female: '포용력과 현실감각이 부족하여 실수할 수 있습니다. 실용적인 사고를 기르세요.'
            },
            '금': {
                male: '의지력과 결단력이 부족하여 우유부단할 수 있습니다. 명확한 목표를 세우고 추진하세요.',
                female: '강인함과 독립성이 부족하여 의존적일 수 있습니다. 자신감을 기르고 주체성을 발휘하세요.'
            },
            '수': {
                male: '지혜와 적응력이 부족하여 경직될 수 있습니다. 유연한 사고와 학습을 늘리세요.',
                female: '직관력과 감성이 부족하여 메마를 수 있습니다. 감정 표현과 공감 능력을 기르세요.'
            }
        };
        
        return weaknesses[element]?.[gender] || '특별한 보완이 필요합니다.';
    }

    // 성별 특성 분석
    getGenderSpecificPersonality(fourPillars, gender) {
        if (gender === 'male') {
            return `남성으로서 가정의 기둥 역할을 잘 해낼 수 있는 성격입니다. 
                   책임감이 강하고 가족을 위해 헌신하는 마음이 깊습니다. 
                   사회적으로도 신뢰받는 인물이 될 가능성이 높으며, 
                   리더십을 발휘하여 많은 사람들에게 도움이 되는 삶을 살 수 있습니다.`;
        } else {
            return `여성으로서 내면의 아름다움과 외적 매력을 모두 갖춘 성격입니다. 
                   타인을 배려하고 이해하는 능력이 뛰어나며, 
                   가정에서는 따뜻한 분위기를 만들어가는 중심 역할을 합니다. 
                   사회적으로도 인정받는 능력을 가지고 있어 다양한 분야에서 성공할 수 있습니다.`;
        }
    }
}

// 전역 인스턴스 생성
window.detailedAnalysisGenerator = new DetailedAnalysisGenerator();
