// 🔮 사주 AI 분석 Cloudflare Pages Function
// 완전 무료 솔루션 - Cloudflare Pages + Google Gemini

export async function onRequestPost(context) {
    const { request, env } = context;
    
    // CORS 헤더 설정
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    try {
        const { birthData } = await request.json();
        
        if (!birthData) {
            return new Response(JSON.stringify({ error: '생년월일 데이터가 필요합니다.' }), {
                status: 400,
                headers: corsHeaders
            });
        }

        console.log('🔮 AI 사주 분석 요청:', birthData);

        // Gemini AI 만세력 분석 요청
        const analysis = await analyzeWithGeminiAI(birthData, env);
        
        return new Response(JSON.stringify({
            success: true,
            analysis: analysis,
            provider: 'Gemini AI + Advanced Saju Engine',
            cost: 'FREE',
            note: 'Cloudflare Pages + Gemini AI 기반 만세력 전문 분석'
        }), {
            status: 200,
            headers: corsHeaders
        });

    } catch (error) {
        console.error('❌ AI 분석 오류:', error);
        
        // 오류 발생시 대체 분석 제공
        const fallbackAnalysis = getFallbackAnalysis(birthData);
        
        return new Response(JSON.stringify({
            success: true,
            analysis: fallbackAnalysis,
            provider: 'Fallback System',
            cost: 'FREE',
            note: '자체 만세력 분석 시스템 (Gemini AI 오류시 대체)'
        }), {
            status: 200,
            headers: corsHeaders
        });
    }
}

// OPTIONS 요청 처리 (CORS preflight)
export async function onRequestOptions() {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}
            cost: 'FREE',
            note: 'AI 서비스 일시 불가로 대체 분석을 제공합니다.'
        });
    }
}

// 만세력 계산 함수들
function calculateFourPillars(year, month, day, hour) {
    // 천간, 지지 배열
    const heavenlyStems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
    const earthlyBranches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
    const zodiacAnimals = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];
    
    // 오행 매핑
    const fiveElements = {
        '갑': '목', '을': '목', '병': '화', '정': '화', '무': '토',
        '기': '토', '경': '금', '신': '금', '임': '수', '계': '수',
        '자': '수', '축': '토', '인': '목', '묘': '목', '진': '토',
        '사': '화', '오': '화', '미': '토', '신': '금', '유': '금',
        '술': '토', '해': '수'
    };
    
    // 음양 매핑
    const yinYang = {
        '갑': '양', '을': '음', '병': '양', '정': '음', '무': '양',
        '기': '음', '경': '양', '신': '음', '임': '양', '계': '음',
        '자': '양', '축': '음', '인': '양', '묘': '음', '진': '양',
        '사': '음', '오': '양', '미': '음', '신': '양', '유': '음',
        '술': '양', '해': '음'
    };
    
    // 년주 계산
    const yearIndex = (year - 4) % 60;
    const yearStemIndex = yearIndex % 10;
    const yearBranchIndex = yearIndex % 12;
    
    // 월주 계산
    const monthStemIndex = (yearStemIndex * 2 + month + 1) % 10;
    const monthBranchIndex = (month + 1) % 12;
    
    // 일주 계산 (간단화)
    const baseDate = new Date(1900, 0, 1);
    const targetDate = new Date(year, month - 1, day);
    const daysDiff = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
    const dayStemIndex = (daysDiff + 36) % 10;
    const dayBranchIndex = (daysDiff + 37) % 12;
    
    // 시주 계산
    const hourBranchIndex = Math.floor(hour / 2) % 12;
    const hourStemIndex = (dayStemIndex * 2 + hourBranchIndex) % 10;
    
    return {
        year: {
            stem: heavenlyStems[yearStemIndex],
            branch: earthlyBranches[yearBranchIndex],
            animal: zodiacAnimals[yearBranchIndex],
            element: fiveElements[heavenlyStems[yearStemIndex]],
            yinYang: yinYang[heavenlyStems[yearStemIndex]]
        },
        month: {
            stem: heavenlyStems[monthStemIndex],
            branch: earthlyBranches[monthBranchIndex],
            element: fiveElements[heavenlyStems[monthStemIndex]],
            yinYang: yinYang[heavenlyStems[monthStemIndex]]
        },
        day: {
            stem: heavenlyStems[dayStemIndex],
            branch: earthlyBranches[dayBranchIndex],
            element: fiveElements[heavenlyStems[dayStemIndex]],
            yinYang: yinYang[heavenlyStems[dayStemIndex]]
        },
        hour: {
            stem: heavenlyStems[hourStemIndex],
            branch: earthlyBranches[hourBranchIndex],
            element: fiveElements[heavenlyStems[hourStemIndex]],
            yinYang: yinYang[heavenlyStems[hourStemIndex]]
        }
    };
}

// 오행 분석
function analyzeFiveElements(fourPillars) {
    const elements = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
    
    // 천간, 지지 오행 계산
    Object.values(fourPillars).forEach(pillar => {
        elements[pillar.element]++;
        // 지지 오행도 추가 (간단화)
        const branchElements = {
            '자': '수', '축': '토', '인': '목', '묘': '목', '진': '토',
            '사': '화', '오': '화', '미': '토', '신': '금', '유': '금',
            '술': '토', '해': '수'
        };
        elements[branchElements[pillar.branch]]++;
    });
    
    const sortedElements = Object.entries(elements).sort((a, b) => b[1] - a[1]);
    const strongest = sortedElements[0][0];
    const weakest = sortedElements[sortedElements.length - 1][0];
    
    // 균형도 계산
    const total = Object.values(elements).reduce((sum, count) => sum + count, 0);
    const average = total / 5;
    const variance = Object.values(elements).reduce((sum, count) => sum + Math.pow(count - average, 2), 0) / 5;
    
    let balance;
    if (variance < 1) balance = '매우 균형';
    else if (variance < 2) balance = '균형';
    else if (variance < 4) balance = '약간 불균형';
    else balance = '불균형';
    
    return { distribution: elements, strongest, weakest, balance };
}

// 용신 분석
function analyzeUsefulGod(fourPillars, fiveElementAnalysis) {
    const dayMaster = fourPillars.day.element;
    const { strongest, weakest } = fiveElementAnalysis;
    
    let usefulGod, avoidGod;
    
    if (strongest === dayMaster) {
        // 일간이 강함 - 설기하는 오행이 용신
        const controlMap = { '목': '금', '화': '수', '토': '목', '금': '화', '수': '토' };
        usefulGod = controlMap[dayMaster];
        const supportMap = { '목': '수', '화': '목', '토': '화', '금': '토', '수': '금' };
        avoidGod = supportMap[dayMaster];
    } else {
        // 일간이 약함 - 도와주는 오행이 용신
        const supportMap = { '목': '수', '화': '목', '토': '화', '금': '토', '수': '금' };
        usefulGod = supportMap[dayMaster];
        const controlMap = { '목': '금', '화': '수', '토': '목', '금': '화', '수': '토' };
        avoidGod = controlMap[dayMaster];
    }
    
    return { usefulGod, avoidGod, dayMaster };
}

// 십신 분석
function analyzeTenGods(fourPillars) {
    const heavenlyStems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
    const dayMaster = fourPillars.day.stem;
    const dayMasterIndex = heavenlyStems.indexOf(dayMaster);
    
    const tenGods = {};
    const tenGodNames = ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'];
    
    Object.entries(fourPillars).forEach(([position, pillar]) => {
        if (position !== 'day') {
            const stemIndex = heavenlyStems.indexOf(pillar.stem);
            const diff = (stemIndex - dayMasterIndex + 10) % 10;
            tenGods[position] = tenGodNames[diff];
        }
    });
    
    return tenGods;
}

// 상세 분석 생성
function generateDetailedAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis, tenGodsAnalysis) {
    return {
        personality: generatePersonalityAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis),
        fortune: generateFortuneAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis),
        career: generateCareerAnalysis(birthData, fourPillars, tenGodsAnalysis, usefulGodAnalysis),
        love: generateLoveAnalysis(birthData, fourPillars, fiveElementAnalysis, tenGodsAnalysis),
        wealth: generateWealthAnalysis(birthData, fourPillars, tenGodsAnalysis, usefulGodAnalysis),
        health: generateHealthAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis)
    };
}

// 만세력 기반 Gemini AI 분석 (Cloudflare Pages 환경)
async function analyzeWithGeminiAI(birthData, env) {
    const { gender, year, month, day, hour, zodiac } = birthData;
    
    const genderText = gender === 'male' ? '남성' : '여성';
    console.log(`🤖 Gemini AI 만세력 분석 시작: ${genderText} ${zodiac}띠 (${year}년 ${month}월 ${day}일 ${hour}시)`);
    
    try {
        // 1. 만세력 계산 (성별 포함)
        const fourPillars = calculateFourPillars(year, month, day, hour, gender);
        const fiveElementAnalysis = analyzeFiveElements(fourPillars, gender);
        const usefulGodAnalysis = analyzeUsefulGod(fourPillars, fiveElementAnalysis);
        const tenGodsAnalysis = analyzeTenGods(fourPillars, gender);
        
        console.log('📊 만세력 계산 완료:', { fourPillars, fiveElementAnalysis, usefulGodAnalysis });
        
        // 2. Gemini API 호출 (성별 정보 포함)
        const geminiAnalysis = await callGeminiAPI(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis, tenGodsAnalysis, env);
        
        if (geminiAnalysis.success) {
            console.log('✅ Gemini AI 분석 성공');
            return geminiAnalysis.analysis;
        } else {
            console.log('⚠️ Gemini AI 실패, 자체 분석으로 대체');
            throw new Error('Gemini API 호출 실패');
        }
        
    } catch (error) {
        console.error('❌ Gemini AI 분석 오류:', error);
        
        // Gemini 실패시 자체 고급 분석으로 폴백
        return await analyzeWithAdvancedSystem(birthData);
    }
}

// Gemini API 호출 함수 (Cloudflare Pages 환경)
async function callGeminiAPI(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis, tenGodsAnalysis, env) {
    const GEMINI_API_KEY = env?.GEMINI_API_KEY;
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    
    // API 키 확인
    if (!GEMINI_API_KEY) {
        console.error('❌ GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.');
        throw new Error('API 키가 설정되지 않았습니다.');
    }
    
    // 만세력 정보를 구조화된 프롬프트로 생성 (성별 포함)
    const prompt = generateGeminiPrompt(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis, tenGodsAnalysis);
    
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 4000,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API 오류: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            
            // AI 응답을 구조화된 분석으로 파싱
            const structuredAnalysis = parseGeminiResponse(aiText, birthData, fourPillars);
            
            return {
                success: true,
                analysis: structuredAnalysis
            };
        } else {
            throw new Error('Gemini API 응답 형식 오류');
        }
        
    } catch (error) {
        console.error('Gemini API 호출 실패:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Gemini용 전문가 수준 상세 프롬프트 생성
function generateGeminiPrompt(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis, tenGodsAnalysis) {
    const { gender, year, month, day, hour, zodiac } = birthData;
    const { strongest, weakest, balance, distribution } = fiveElementAnalysis;
    const { usefulGod, avoidGod, dayMaster } = usefulGodAnalysis;
    
    // 성별 텍스트 설정
    const genderText = gender === 'male' ? '남성' : '여성';
    const genderEmoji = gender === 'male' ? '👨' : '👩';
    
    return `당신은 30년 경력의 최고 수준 사주명리학 전문가입니다. 다음 만세력 정보를 바탕으로 **${genderText} 전용 맞춤 분석**을 매우 상세하게 해주세요.

**📊 의뢰인 기본 정보**
- 성별: ${genderEmoji} ${genderText}
- 생년월일시: ${year}년 ${month}월 ${day}일 ${hour}시
- 띠: ${zodiac}

**🔮 완전한 만세력 (사주팔자)**
- 년주: ${fourPillars.year.stem}${fourPillars.year.branch} (${fourPillars.year.animal}) - 조상, 부모, 어린 시절
- 월주: ${fourPillars.month.stem}${fourPillars.month.branch} - 청년기, 사회생활, 형제자매
- 일주: ${fourPillars.day.stem}${fourPillars.day.branch} - 본인, 배우자, 중년기 ← **핵심**
- 시주: ${fourPillars.hour.stem}${fourPillars.hour.branch} - 자녀, 말년, 부하직원

**⚖️ 상세 오행 분석**
- 목: ${distribution.목}개 | 화: ${distribution.화}개 | 토: ${distribution.토}개 | 금: ${distribution.금}개 | 수: ${distribution.수}개
- 오행 균형도: ${balance}
- 가장 강한 오행: ${strongest} (과다 시 문제점 분석 필요)
- 가장 약한 오행: ${weakest} (부족 시 보완 방법 제시)
- 일간 오행: ${fourPillars.day.element} (본인의 핵심 기질)

**🎯 용신/기신 분석 (매우 중요)**
- 용신(用神 - 도움되는 오행): ${usefulGod} ← 인생 성공의 열쇠
- 기신(忌神 - 피해야 할 오행): ${avoidGod} ← 주의해야 할 요소
- 일간: ${dayMaster} (본인의 근본 성질)

**🔟 십신 분석 (인간관계와 성향) - ${genderText} 기준**
${Object.entries(tenGodsAnalysis).map(([pos, god]) => `- ${pos}주 ${god}: ${getTenGodMeaningByGender(god, gender)}`).join('\n')}

---

위 만세력을 바탕으로 **${genderText} 전용 30년 경력 최고 전문가 수준**의 매우 상세한 분석을 해주세요:

## 🎯 **종합 운세 (${genderText} 맞춤 심층 분석)**
- 전체적인 인생 흐름과 특징 (400자 이상)
- ${genderText}으로서의 고유한 강점과 매력
- 주의해야 할 약점과 개선 방향
- 인생의 전환점과 중요한 시기들

## 💝 **연애운 & 결혼운 (${genderText} 특화 분석)**
${gender === 'male' ? 
  `- 남성으로서의 매력과 연애 스타일 분석
- 이상형과 궁합이 좋은 여성 유형
- 결혼 적령기와 배우자 만날 시기
- 가정에서의 역할과 아버지로서의 모습
- 연애와 결혼에서 주의할 점` :
  `- 여성으로서의 매력과 연애 패턴 분석
- 이상형과 궁합이 좋은 남성 유형
- 결혼운과 좋은 남편감 특징
- 가정 운영 능력과 어머니로서의 모습
- 연애와 결혼에서 주의할 점`
}

## 💰 **재물운 & 직업운 (상세 분석)**
- 돈 버는 능력과 재물 관리 성향
- 적성에 맞는 구체적 직업과 사업 분야
- 투자 성향과 부동산 운세
- 경제적 성공을 위한 전략
- 재물과 관련된 주의사항

## 🏥 **건강운 (${genderText} 체질 맞춤)**
${gender === 'male' ? 
  `- 남성 특유의 건강 주의사항과 질병 경향
- 스트레스 관리법과 정신건강
- 운동과 생활습관 개선 조언
- 나이대별 건강 관리 포인트` :
  `- 여성 건강과 생리 주기의 영향
- 임신과 출산 관련 건강 조언
- 미용과 다이어트 운세
- 갱년기와 노년기 건강 관리`
}

## 👥 **인간관계운 (구체적 분석)**
- 가족관계 (부모, 형제자매, 자녀)
- 친구와 동료 관계의 특징
- 상사와 부하 직원과의 관계
- 사회적 네트워크 구축 능력

## 📅 **연도별 상세 운세 (향후 5년)**
- **2025년**: 구체적인 월별 운세와 주요 이벤트
- **2026년**: 중요한 변화와 기회 포착
- **2027년**: 도전과 성장의 해
- **2028년**: 안정과 발전의 시기
- **2029년**: 새로운 전환점과 준비

## 🎁 **${genderText}을 위한 특별 개운법**
- 행운의 색깔, 숫자, 방향 제시
- 풍수 인테리어와 생활 환경 조언
- 개운 아이템과 액세서리 추천
- 피해야 할 것들과 금기사항
- 인생의 터닝포인트 활용법

## 🌟 **최종 종합 조언**
- ${genderText}으로서 가장 중요한 인생 전략
- 성공을 위한 핵심 포인트 3가지
- 행복한 삶을 위한 실용적 조언
- 앞으로의 인생 설계 방향

**각 항목마다 구체적이고 실용적인 조언을 300자 이상 매우 상세히 작성해주세요. ${genderText}의 특성을 반드시 고려하여 맞춤형 분석을 제공해주세요.**`;
}

## 3. 💕 **연애와 결혼운 (매우 상세)**

### 연애 스타일과 특징
- 일간과 일지가 보여주는 연애 성향
- ${estimatedGender}으로서의 연애 패턴
- 이성에게 어필하는 매력 포인트
- 연애에서 자주 겪는 문제점과 해결책

### 이상적인 배우자상
- 오행 상생 관계의 배우자 특징
- 십신 조합상 좋은 배우자의 성향
- 나이차, 직업, 성격적 특징
- 만나게 될 가능성이 높은 인연의 형태

### 결혼 후 삶의 모습
- 배우자궁(일지) 분석을 통한 결혼생활 예측
- 가정에서의 역할과 책임
- 시댁/처가와의 관계
- 자녀운과 육아 스타일

### 연애/결혼 시기와 주의사항
- 좋은 인연을 만날 가능성이 높은 시기
- 연애/결혼에서 피해야 할 패턴
- 관계 발전을 위한 구체적 조언

## 4. 💰 **재물운과 직업운 (실용적 분석)**

### 적합한 직업과 업종
- 일간과 십신 조합이 보여주는 직업 적성
- 용신 오행과 관련된 구체적 직업군
- 사업 vs 직장 적성 분석
- 프리랜서, 창업, 조직생활 중 최적 선택

### 재물 축적 방법
- 정재 vs 편재 성향에 따른 돈 버는 방식
- 투자 vs 저축 성향 분석
- 부동산, 주식, 사업 등 분야별 적성
- 재물 운용에서 주의해야 할 점

### 직업 성공 전략
- 승진과 성공을 위한 구체적 방법
- 상사, 동료, 부하와의 관계 관리
- 이직과 전직 타이밍
- 부업과 투잡 가능성

## 5. 🏥 **건강운 (예방 중심)**

### 건강상 강점과 약점
- 일간 오행이 건강에 미치는 영향
- ${strongest} 과다와 ${weakest} 부족의 건강 영향
- 선천적 체질과 후천적 관리 포인트
- 나이대별 주의해야 할 건강 문제

### 생활습관 개선 방안
- 용신 ${usefulGod} 기운을 보강하는 생활습관
- 기신 ${avoidGod} 기운을 줄이는 방법
- 식습관, 운동, 수면 등 구체적 조언
- 계절별, 시간대별 건강 관리법

## 6. 📅 **대운과 세운 (미래 예측)**

### 인생의 중요한 변화점
- 10년 단위 대운의 흐름과 특징
- 각 대운별 주요 이슈와 기회
- 특별히 주의해야 할 대운 시기
- 대운 변화에 따른 대비책

### 향후 5년간 세운 분석
- 연도별 주요 운세와 이슈
- 좋은 해와 조심해야 할 해
- 중요한 결정을 내리기 좋은 시기
- 각 해별 구체적 조언과 전략

## 7. ⚖️ **오행 균형과 보완법**

### 현재 오행 상태 진단
- ${balance} 상태의 구체적 의미
- 각 오행별 과부족이 삶에 미치는 영향
- 오행 불균형으로 인한 문제점들

### 실용적 보완 방법
- 용신 ${usefulGod} 기운 보강 방법 (색깔, 방향, 직업, 음식, 취미 등)
- 기신 ${avoidGod} 기운 줄이는 방법
- 일상생활에서 실천 가능한 구체적 방법들
- 주거환경, 인테리어, 패션 등 실용적 조언

## 8. 🎯 **삶의 주요 목표와 방향성**

### 인생의 핵심 과제
- 사주가 보여주는 인생의 주요 테마
- 극복해야 할 숙명적 과제들
- 발전시켜야 할 재능과 능력
- 추구해야 할 가치관과 삶의 방향

### 성공을 위한 전략
- 강점을 최대화하는 방법
- 약점을 보완하는 전략
- 기회를 포착하는 타이밍
- 위기를 극복하는 방법

---

## 🔍 **특별 주목 사항**

다음 부분들을 특별히 깊이 있게 분석해주세요:

1. **숨겨진 재능**: 본인도 모르는 잠재 능력
2. **인생의 전환점**: 중요한 변화가 일어날 시기
3. **주의해야 할 함정**: 반복되는 실수 패턴
4. **최고의 기회**: 인생 최대 성공 가능 시기
5. **궁합 분석**: 최적의 파트너와 협력자
6. **건강 적신호**: 미리 대비해야 할 건강 이슈
7. **재물 증식**: 부를 축적할 수 있는 방법
8. **정신적 성장**: 내면의 평화와 만족을 위한 조언

각 항목마다 **구체적인 근거**를 만세력에서 찾아 제시하고, **실용적인 조언**을 포함해주세요. 

20년 경력 전문 역술가가 직접 상담하는 것처럼 **매우 상세하고 개인화된 분석**을 부탁드립니다.`;
}

// 십신별 의미 설명 함수 (성별 반영)
function getTenGodMeaningByGender(tenGod, gender) {
    const meanings = {
        '비견': {
            male: '동등한 관계, 형제자매, 동업자, 남성 친구',
            female: '동등한 관계, 자매, 여성 친구, 동료'
        },
        '겁재': {
            male: '라이벌, 경쟁, 도전 정신, 변화 추구',
            female: '경쟁 의식, 독립성, 자주성, 변화 추구'
        },
        '식신': {
            male: '표현력, 창작, 자유로움, 자녀운',
            female: '여성적 매력, 창작력, 자녀운, 표현력'
        },
        '상관': {
            male: '재능, 기술, 개성, 반항 정신',
            female: '재능, 기술, 남편을 극하는 기운 (주의 필요)'
        },
        '편재': {
            male: '연인, 이성관계, 바람기, 활동적 재물',
            female: '사업 수완, 투자, 활동적 재물 추구'
        },
        '정재': {
            male: '아내, 배우자, 결혼운, 안정적 수입',
            female: '안정적 수입, 저축, 보수적 재물 관리'
        },
        '편관': {
            male: '자유로운 권위, 도전적 리더십',
            female: '연인, 복잡한 이성관계, 강한 남성 선호'
        },
        '정관': {
            male: '품격 있는 권위, 안정적 지위',
            female: '남편, 배우자, 결혼운, 사회적 지위'
        },
        '편인': {
            male: '독창적 학습, 연구, 직감적 지혜',
            female: '계모, 독립성, 창의성, 직감적 지혜'
        },
        '정인': {
            male: '전통적 학습, 교육, 보호받는 관계',
            female: '어머니, 보호자, 학습능력, 교육'
        }
    };
    
    return meanings[tenGod]?.[gender] || meanings[tenGod]?.male || '특별한 의미';
}

// 십신별 의미 설명 함수 (기본)
function getTenGodMeaning(tenGod) {
    const meanings = {
        '비견': '동등한 관계, 형제자매, 동업자, 경쟁자',
        '겁재': '라이벌, 경쟁, 도전, 변화 추구',
        '식신': '표현력, 창작, 자유로움, 즐거움 추구',
        '상관': '재능, 기술, 개성, 반항 정신',
        '편재': '사업 수완, 투자, 활동적 재물 추구',
        '정재': '안정적 수입, 저축, 보수적 재물 관리',
        '편관': '자유로운 권위, 도전적 리더십',
        '정관': '품격 있는 권위, 안정적 지위',
        '편인': '독창적 학습, 연구, 직감적 지혜',
        '정인': '전통적 학습, 교육, 보호받는 관계'
    };
    return meanings[tenGod] || '특별한 의미';
}

// Gemini 응답 파싱 및 구조화 (상세 버전)
function parseGeminiResponse(aiText, birthData, fourPillars) {
    console.log('📝 Gemini 상세 응답 파싱 시작');
    
    // AI 응답을 더 정교하게 섹션별로 분리
    const sections = {
        personality: extractDetailedSection(aiText, ['성격', '🎭', '기질', '성향', '타고난']),
        fortune: extractDetailedSection(aiText, ['운세', '🌟', '전반적', '미래', '대운']),
        career: extractDetailedSection(aiText, ['직업', '💼', '💰', '재물', '일', '사업']),
        love: extractDetailedSection(aiText, ['연애', '💕', '결혼', '배우자', '사랑']),
        wealth: extractDetailedSection(aiText, ['재물', '💰', '돈', '투자', '수입']),
        health: extractDetailedSection(aiText, ['건강', '🏥', '체질', '질병', '관리'])
    };
    
    // 각 섹션을 구조화된 형태로 변환
    return {
        personality: {
            title: "🎭 타고난 성격과 기질 (심층 분석)",
            content: sections.personality || generateDetailedFallbackPersonality(birthData, fourPillars)
        },
        fortune: {
            title: "🌟 인생 운세와 흐름 (대운/세운)", 
            content: sections.fortune || generateDetailedFallbackFortune(birthData, fourPillars)
        },
        career: {
            title: "💼 직업운과 재물운 (통합 분석)",
            content: sections.career || generateDetailedFallbackCareer(birthData, fourPillars)
        },
        love: {
            title: "💕 연애와 결혼운 (상세 분석)",
            content: sections.love || generateDetailedFallbackLove(birthData, fourPillars)
        },
        wealth: {
            title: "💰 재물 축적과 운용 전략",
            content: sections.wealth || generateDetailedFallbackWealth(birthData, fourPillars)
        },
        health: {
            title: "🏥 건강운과 생활 관리법",
            content: sections.health || generateDetailedFallbackHealth(birthData, fourPillars)
        }
    };
}

// 더 정교한 섹션 추출 함수
function extractDetailedSection(text, keywords) {
    const lines = text.split('\n');
    let sectionLines = [];
    let inSection = false;
    let sectionStarted = false;
    let currentSectionDepth = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // 섹션 시작 감지 (더 정교한 패턴 매칭)
        const isKeywordMatch = keywords.some(keyword => 
            line.toLowerCase().includes(keyword.toLowerCase())
        );
        
        const isSectionHeader = line.match(/^#{1,3}\s/) || 
                               line.match(/^[🎭🌟💼💕💰🏥]\s/) ||
                               line.match(/^\d+\.\s/);
        
        if (isKeywordMatch && isSectionHeader) {
            inSection = true;
            sectionStarted = true;
            currentSectionDepth = (line.match(/^#+/) || [''])[0].length;
            sectionLines.push(line);
            continue;
        }
        
        // 다음 섹션 시작 감지
        if (sectionStarted && isSectionHeader) {
            const newDepth = (line.match(/^#+/) || [''])[0].length;
            if (newDepth <= currentSectionDepth && !isKeywordMatch) {
                break; // 현재 섹션 종료
            }
        }
        
        if (inSection) {
            sectionLines.push(line);
            
            // 섹션이 충분히 길어지면 다음 주요 섹션에서 중단
            if (sectionLines.length > 50 && isSectionHeader && !isKeywordMatch) {
                break;
            }
        }
    }
    
    const result = sectionLines.join('\n').trim();
    
    // 결과가 너무 짧으면 전체 텍스트에서 키워드 관련 부분 추출
    if (result.length < 100) {
        return extractByKeywordContext(text, keywords);
    }
    
    return result;
}

// 키워드 컨텍스트 기반 추출
function extractByKeywordContext(text, keywords) {
    const lines = text.split('\n');
    let contextLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (keywords.some(keyword => line.toLowerCase().includes(keyword.toLowerCase()))) {
            // 앞뒤 컨텍스트 포함
            const start = Math.max(0, i - 2);
            const end = Math.min(lines.length, i + 10);
            
            for (let j = start; j < end; j++) {
                if (!contextLines.includes(lines[j].trim()) && lines[j].trim().length > 0) {
                    contextLines.push(lines[j].trim());
                }
            }
        }
    }
    
    return contextLines.join('\n');
}

// 상세한 폴백 분석 생성 함수들
function generateDetailedFallbackPersonality(birthData, fourPillars) {
    const { year, month, day, hour } = birthData;
    const dayMaster = fourPillars.day.stem;
    const dayBranch = fourPillars.day.branch;
    
    return `**🎭 타고난 성격과 기질 심층 분석**

**기본 성향**
일간 ${dayMaster}의 특성을 바탕으로, 당신은 ${getDayMasterDetailedPersonality(dayMaster)}

일지 ${dayBranch}의 영향으로 ${getDayBranchDetailedInfluence(dayBranch)}

**내면의 특징**
${year}년 ${month}월 ${day}일 ${hour}시에 태어난 당신의 만세력은 복합적인 성격 구조를 보여줍니다. 겉으로 드러나는 모습과 내면의 진짜 모습 사이에 미묘한 차이가 있을 수 있습니다.

**주변 사람들과의 관계**
대인관계에서는 ${dayMaster} 일간의 특성이 강하게 나타나며, 특히 ${dayBranch} 지지의 영향으로 특별한 매력을 발산합니다.

*Gemini AI 분석이 일시적으로 불가능하여 기본 분석을 제공합니다. 더 상세한 분석을 원하시면 다시 시도해주세요.*`;
}

function generateDetailedFallbackFortune(birthData, fourPillars) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthData.year + 1;
    
    return `**🌟 인생 운세와 흐름 분석**

**현재 ${age}세 운세**
현재 나이대는 인생에서 중요한 전환점에 해당합니다. 일간 ${fourPillars.day.stem}의 특성상 이 시기에 특별한 의미가 있습니다.

**향후 운세 전망**
앞으로 5년간은 전반적으로 안정적인 흐름을 보일 것으로 예상됩니다. 특히 ${birthData.year + 40}년경에 중요한 변화가 있을 것으로 보입니다.

**대운의 흐름**
10년 단위 대운의 변화에 따라 인생의 주요 테마가 달라질 것입니다.

*더 정확한 대운 분석을 위해서는 Gemini AI 분석을 다시 시도해주세요.*`;
}

function generateDetailedFallbackCareer(birthData, fourPillars) {
    return `**💼 직업운과 재물운 통합 분석**

**적합한 직업 분야**
일간 ${fourPillars.day.stem}의 특성상 ${getDayMasterCareer(fourPillars.day.stem)}

**재물 축적 방향**
당신의 사주 구조상 안정적인 재물 관리가 유리할 것으로 보입니다.

**성공 전략**
꾸준한 노력과 인내심을 바탕으로 한 장기적 접근이 성공의 열쇠입니다.

*구체적인 직업 추천과 재물 전략은 Gemini AI 분석에서 더 상세히 제공됩니다.*`;
}

function generateDetailedFallbackLove(birthData, fourPillars) {
    return `**💕 연애와 결혼운 상세 분석**

**연애 스타일**
일간 ${fourPillars.day.stem}의 특성상 ${getDayMasterLoveStyle(fourPillars.day.stem, fourPillars.day.yinYang === '양')}

**배우자궁 분석**
일지 ${fourPillars.day.branch}를 통해 본 배우자와의 관계는 ${getSpouseAnalysis(fourPillars.day.branch)}

**결혼 운세**
전반적으로 안정적인 결혼 생활을 할 수 있는 구조입니다.

*더 구체적인 연애 조언과 결혼 시기는 Gemini AI 분석에서 확인하세요.*`;
}

function generateDetailedFallbackWealth(birthData, fourPillars) {
    return `**💰 재물 축적과 운용 전략**

**재물 성향**
일간 ${fourPillars.day.stem}의 특성상 ${getDayMasterWealth(fourPillars.day.stem)}

**투자 전략**
안정적이고 장기적인 관점의 투자가 유리할 것으로 보입니다.

**주의사항**
급한 투자나 투기성 거래는 피하는 것이 좋겠습니다.

*개인화된 재물 증식 전략은 Gemini AI 분석에서 더 자세히 제공됩니다.*`;
}

function generateDetailedFallbackHealth(birthData, fourPillars) {
    return `**🏥 건강운과 생활 관리법**

**건강 특성**
일간 오행 ${fourPillars.day.element}의 특성상 ${getElementHealthCharacteristic(fourPillars.day.element)}

**관리 포인트**
규칙적인 생활 패턴과 적당한 운동이 건강 유지의 핵심입니다.

**예방 중심 관리**
미리 건강 관리에 신경 쓰면 큰 문제없이 건강한 삶을 유지할 수 있습니다.

*구체적인 건강 관리법과 주의사항은 Gemini AI 분석에서 확인하세요.*`;
}

// 상세한 일간별 성격 분석
function getDayMasterDetailedPersonality(dayMaster) {
    const detailedPersonalities = {
        '갑': '큰 나무의 기상을 가진 리더형 인물입니다. 강직하고 정의로우며, 새로운 것을 개척하는 진취적 성격을 가지고 있습니다. 다만 때로는 고집이 세고 융통성이 부족할 수 있어, 타인의 의견을 경청하는 자세가 필요합니다.',
        '을': '부드러운 풀과 꽃의 성질을 가진 섬세한 인물입니다. 적응력이 뛰어나고 예술적 감각이 있으며, 타인을 배려하는 마음이 깊습니다. 하지만 우유부단하고 의존적인 면이 있어 주체성을 기르는 것이 중요합니다.',
        '병': '태양과 같은 밝고 열정적인 성격의 소유자입니다. 창의력이 뛰어나고 사교적이며, 사람들을 이끄는 카리스마가 있습니다. 다만 감정 기복이 크고 지속력이 부족할 수 있어 꾸준함을 기르는 것이 필요합니다.',
        '정': '촛불처럼 따뜻하고 세심한 배려심을 가진 인물입니다. 예술적 재능이 있고 사람들과의 관계를 중시하며, 섬세한 감성을 가지고 있습니다. 하지만 예민하고 스트레스를 잘 받는 편이라 마음의 평정을 유지하는 것이 중요합니다.',
        '무': '산과 같은 든든함과 안정감을 주는 성격입니다. 책임감이 강하고 포용력이 크며, 신뢰할 수 있는 인물입니다. 다만 변화를 싫어하고 보수적인 면이 있어, 때로는 새로운 시도에 도전하는 용기가 필요합니다.',
        '기': '밭과 같은 너그럽고 실용적인 성격을 가지고 있습니다. 봉사정신이 강하고 다른 사람을 잘 도와주며, 현실적인 판단력이 뛰어납니다. 하지만 자기주장이 약하고 우유부단할 수 있어 확고한 의지를 기르는 것이 중요합니다.',
        '경': '금속과 같은 강한 의지력과 정의감을 가진 인물입니다. 원칙을 중시하고 결단력이 있으며, 목표 달성을 위한 추진력이 강합니다. 다만 융통성이 부족하고 고집이 셀 수 있어 타협하는 자세를 기르는 것이 필요합니다.',
        '신': '보석과 같은 세련됨과 완벽주의적 성향을 가진 인물입니다. 미적 감각이 뛰어나고 품격이 있으며, 정밀한 일을 잘 처리합니다. 하지만 까다롭고 비판적인 면이 있어 관용의 마음을 기르는 것이 중요합니다.',
        '임': '바다와 같은 깊이와 포용력을 가진 지혜로운 인물입니다. 통찰력이 뛰어나고 적응력이 좋으며, 다양한 분야에 관심이 많습니다. 다만 변덕스럽고 일관성이 부족할 수 있어 중심을 잡는 것이 필요합니다.',
        '계': '이슬과 같은 순수함과 직감력을 가진 감성적인 인물입니다. 창의적이고 예술적 재능이 있으며, 깊은 감수성을 가지고 있습니다. 하지만 소극적이고 의존적인 면이 있어 자립심을 기르는 것이 중요합니다.'
    };
    return detailedPersonalities[dayMaster] || '특별한 개성과 매력을 가진 성격입니다.';
}

// 상세한 일지 영향 분석
function getDayBranchDetailedInfluence(dayBranch) {
    const detailedInfluences = {
        '자': '지혜와 학문을 추구하는 성향이 강화됩니다. 깊이 있는 사고를 좋아하고 연구하는 것을 즐기며, 직관력이 발달되어 있습니다. 물과 관련된 일이나 지적인 활동에서 재능을 발휘할 수 있습니다.',
        '축': '성실함과 근면함이 두드러지게 나타납니다. 꾸준한 노력을 통해 성과를 이루는 타입이며, 실무 능력이 뛰어납니다. 토와 관련된 일이나 안정적인 분야에서 성공할 가능성이 높습니다.',
        '인': '적극성과 진취성이 강화되어 새로운 도전을 즐깁니다. 리더십이 뛰어나고 개척 정신이 강하며, 목표 달성을 위한 추진력이 있습니다. 목과 관련된 분야나 성장 산업에서 두각을 나타낼 수 있습니다.',
        '묘': '온화함과 예술적 감각이 돋보입니다. 미적 감각이 뛰어나고 평화를 추구하며, 조화로운 관계를 중시합니다. 예술이나 문화 관련 분야에서 재능을 발휘할 수 있습니다.',
        '진': '변화와 혁신을 추구하는 성향이 강해집니다. 기존의 틀을 벗어나 새로운 것을 시도하는 것을 좋아하며, 개혁적인 사고를 가지고 있습니다. 변화가 많은 분야에서 성공할 가능성이 높습니다.',
        '사': '지적 호기심과 분석력이 뛰어납니다. 깊이 있는 통찰력을 가지고 있으며, 복잡한 문제를 해결하는 능력이 있습니다. 연구나 분석이 필요한 분야에서 두각을 나타낼 수 있습니다.',
        '오': '열정과 활동력이 넘칩니다. 에너지가 풍부하고 사교적이며, 사람들과의 관계에서 중심 역할을 합니다. 화와 관련된 분야나 활동적인 일에서 성공할 가능성이 높습니다.',
        '미': '배려심과 봉사정신이 강화됩니다. 다른 사람을 돕는 것을 좋아하고 희생정신이 있으며, 조화로운 관계를 만드는 능력이 있습니다. 서비스업이나 사회봉사 분야에서 보람을 찾을 수 있습니다.',
        '신': '자유로움과 모험심이 두드러집니다. 변화를 즐기고 새로운 경험을 추구하며, 독립적인 성향이 강합니다. 자유로운 환경에서 일할 때 최고의 능력을 발휘할 수 있습니다.',
        '유': '완벽주의와 세심함이 특징입니다. 정확하고 체계적인 일처리를 선호하며, 품질에 대한 기준이 높습니다. 정밀함이 요구되는 분야에서 뛰어난 성과를 거둘 수 있습니다.',
        '술': '포용력과 관용이 넘칩니다. 너그러운 마음을 가지고 있으며, 사람들을 포용하는 능력이 뛰어납니다. 인정이 많고 정이 깊어 많은 사람들의 사랑을 받을 수 있습니다.',
        '해': '순수함과 직관력이 돋보입니다. 감성이 풍부하고 창의적이며, 예술적 재능이 있습니다. 직감적인 판단력이 뛰어나 영감이 필요한 분야에서 성공할 수 있습니다.'
    };
    return detailedInfluences[dayBranch] || '특별한 영향을 미치며 독특한 매력을 더해줍니다.';
}

// AI 응답에서 특정 섹션 추출
function extractSection(text, keywords) {
    const lines = text.split('\n');
    let sectionLines = [];
    let inSection = false;
    let sectionStarted = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // 섹션 시작 감지
        if (keywords.some(keyword => line.includes(keyword))) {
            inSection = true;
            sectionStarted = true;
            sectionLines.push(line);
            continue;
        }
        
        // 다음 섹션 시작 감지 (이모지나 번호로 시작하는 새로운 섹션)
        if (sectionStarted && (line.match(/^[🎭🌟💼💕💰🏥]/) || line.match(/^\d+\./))) {
            if (!keywords.some(keyword => line.includes(keyword))) {
                break; // 현재 섹션 종료
            }
        }
        
        if (inSection && line.length > 0) {
            sectionLines.push(line);
        }
    }
    
    return sectionLines.join('\n').trim();
}

// 폴백 분석 생성 함수들 (Gemini 실패시 사용)
function generateFallbackPersonality(birthData, fourPillars) {
    return `**만세력 기반 성격 분석**\n\n일간 ${fourPillars.day.stem}의 특성을 바탕으로 한 상세 분석입니다. Gemini AI 분석이 일시적으로 불가능하여 자체 분석을 제공합니다.`;
}

function generateFallbackFortune(birthData, fourPillars) {
    return `**만세력 기반 운세 분석**\n\n${fourPillars.day.stem}일간의 운세 흐름을 분석한 결과입니다.`;
}

function generateFallbackCareer(birthData, fourPillars) {
    return `**만세력 기반 직업 분석**\n\n일간 ${fourPillars.day.stem}의 직업 적성을 분석한 결과입니다.`;
}

function generateFallbackLove(birthData, fourPillars) {
    return `**만세력 기반 연애 분석**\n\n${fourPillars.day.stem}일간의 연애 스타일을 분석한 결과입니다.`;
}

function generateFallbackWealth(birthData, fourPillars) {
    return `**만세력 기반 재물 분석**\n\n일간 ${fourPillars.day.stem}의 재물 운세를 분석한 결과입니다.`;
}

function generateFallbackHealth(birthData, fourPillars) {
    return `**만세력 기반 건강 분석**\n\n${fourPillars.day.element} 오행의 건강 특성을 분석한 결과입니다.`;
}

// 개인화된 분석 생성 (생년월일 기반)
function generatePersonalizedAnalysis(birthData) {
    const { year, month, day, hour, zodiac } = birthData;
    
    // 생년월일 기반 개인화 요소
    const birthNumber = (year + month + day + hour) % 10;
    const seasonFactor = Math.floor((month - 1) / 3); // 0:봄, 1:여름, 2:가을, 3:겨울
    const timeFactor = Math.floor(hour / 6); // 0:새벽, 1:오전, 2:오후, 3:저녁
    
    return {
        personality: {
            title: "🎭 성격 분석",
            content: getPersonalizedPersonality(zodiac, birthNumber, seasonFactor)
        },
        fortune: {
            title: "🌟 전반적 운세",
            content: getPersonalizedFortune(zodiac, birthNumber, timeFactor)
        },
        career: {
            title: "💼 직업 운세",
            content: getPersonalizedCareer(zodiac, seasonFactor, timeFactor)
        },
        love: {
            title: "💕 연애 운세",
            content: getPersonalizedLove(zodiac, birthNumber, month)
        },
        wealth: {
            title: "💰 재물 운세",
            content: getPersonalizedWealth(zodiac, birthNumber, day)
        },
        health: {
            title: "🏥 건강 운세",
            content: getPersonalizedHealth(zodiac, seasonFactor, timeFactor)
        }
    };
}

// 개인화된 성격 분석
function getPersonalizedPersonality(zodiac, birthNumber, seasonFactor) {
    const basePersonality = getZodiacPersonality(zodiac);
    const personalityModifiers = [
        "특히 창의적인 면이 강하고",
        "리더십이 뛰어나며",
        "섬세하고 배려심이 깊으며",
        "적응력이 뛰어나고",
        "직관력이 발달되어 있으며",
        "사교적이고 유머감각이 있으며",
        "완벽주의적 성향이 있고",
        "모험심이 강하며",
        "안정을 추구하는 성향이 있고",
        "감성이 풍부하며"
    ];
    
    const seasonalTraits = [
        "새로운 시작을 좋아하는", // 봄
        "열정적이고 활동적인", // 여름
        "차분하고 성숙한", // 가을
        "신중하고 깊이 있는" // 겨울
    ];
    
    return `${basePersonality} ${personalityModifiers[birthNumber]} ${seasonalTraits[seasonFactor]} 특성을 보입니다.`;
}

// 개인화된 운세 분석
function getPersonalizedFortune(zodiac, birthNumber, timeFactor) {
    const baseFortune = getZodiacFortune(zodiac);
    const timeInfluences = [
        "새벽의 고요한 에너지로 인해 깊은 통찰력을 발휘할 수 있는",
        "오전의 상승 에너지로 인해 적극적인 도전이 유리한",
        "오후의 안정된 에너지로 인해 꾸준한 발전이 기대되는",
        "저녁의 성찰 에너지로 인해 지혜로운 판단이 빛나는"
    ];
    
    const luckyNumbers = [1, 3, 7, 9, 2, 5, 8, 4, 6, 0];
    
    return `${baseFortune} ${timeInfluences[timeFactor]} 시기입니다. 특히 ${luckyNumbers[birthNumber]}과 관련된 일에서 좋은 기운이 있을 것입니다.`;
}

// 개인화된 직업 운세
function getPersonalizedCareer(zodiac, seasonFactor, timeFactor) {
    const careerAdvice = [
        "창의적이고 혁신적인 분야", // 봄
        "활동적이고 역동적인 분야", // 여름  
        "안정적이고 체계적인 분야", // 가을
        "전문적이고 깊이 있는 분야" // 겨울
    ];
    
    const workStyle = [
        "새로운 아이디어로 돌파구를 찾는", // 새벽
        "적극적인 추진력을 발휘하는", // 오전
        "꾸준한 노력으로 성과를 내는", // 오후
        "신중한 판단으로 완성도를 높이는" // 저녁
    ];
    
    return `${zodiac}띠는 ${careerAdvice[seasonFactor]}에서 재능을 발휘할 수 있습니다. ${workStyle[timeFactor]} 방식으로 일할 때 최고의 성과를 거둘 수 있을 것입니다.`;
}

// 개인화된 연애 운세
function getPersonalizedLove(zodiac, birthNumber, month) {
    const loveStyles = [
        "진실하고 깊이 있는 사랑", "열정적이고 로맨틱한 사랑", "안정적이고 따뜻한 사랑",
        "자유롭고 개방적인 사랑", "섬세하고 배려 깊은 사랑", "유머러스하고 즐거운 사랑",
        "완벽하고 이상적인 사랑", "모험적이고 스릴 있는 사랑", "평화롭고 조화로운 사랑",
        "감성적이고 예술적인 사랑"
    ];
    
    const monthlyAdvice = month <= 3 ? "새로운 만남" : 
                        month <= 6 ? "관계 발전" :
                        month <= 9 ? "깊어지는 유대" : "안정된 관계";
    
    return `${zodiac}띠는 ${loveStyles[birthNumber]}을 추구합니다. 현재는 ${monthlyAdvice}에 좋은 시기이며, 진실한 마음으로 다가가면 좋은 결과가 있을 것입니다.`;
}

// 개인화된 재물 운세
function getPersonalizedWealth(zodiac, birthNumber, day) {
    const wealthPatterns = [
        "꾸준한 저축으로 안정적인 재물 증식", "적극적인 투자로 큰 수익 기대",
        "부동산 관련 좋은 기회", "사업 확장을 통한 수익 증대",
        "부업이나 투잡을 통한 추가 수입", "지식과 기술을 활용한 수익",
        "협력과 파트너십을 통한 이익", "창의적 아이디어로 수익 창출",
        "장기적 관점의 투자 성공", "예상치 못한 횡재 가능성"
    ];
    
    const timing = day <= 10 ? "상순" : day <= 20 ? "중순" : "하순";
    
    return `${zodiac}띠는 ${wealthPatterns[birthNumber]}의 패턴을 보입니다. 특히 매월 ${timing}에 재물과 관련된 좋은 소식이 있을 가능성이 높습니다.`;
}

// 개인화된 건강 운세
function getPersonalizedHealth(zodiac, seasonFactor, timeFactor) {
    const healthFocus = [
        "면역력 강화와 활력 증진", // 봄
        "체력 관리와 수분 보충", // 여름
        "호흡기 건강과 피부 관리", // 가을
        "관절 건강과 보온 관리" // 겨울
    ];
    
    const exerciseTime = [
        "새벽 운동이나 명상", // 새벽
        "오전 유산소 운동", // 오전
        "오후 가벼운 산책", // 오후
        "저녁 스트레칭이나 요가" // 저녁
    ];
    
    return `${zodiac}띠는 ${healthFocus[seasonFactor]}에 특히 신경 쓰시기 바랍니다. ${exerciseTime[timeFactor]}을 규칙적으로 하시면 건강 운세가 더욱 좋아질 것입니다.`;
}

// 대체 분석 시스템 (AI 실패시 사용)
function getFallbackAnalysis(birthData) {
    const { zodiac } = birthData;
    
    return {
        personality: {
            title: "🎭 성격 분석",
            content: getZodiacPersonality(zodiac)
        },
        fortune: {
            title: "🌟 전반적 운세",
            content: getZodiacFortune(zodiac)
        },
        career: {
            title: "💼 직업 운세",
            content: getZodiacCareer(zodiac)
        },
        love: {
            title: "💕 연애 운세",
            content: getZodiacLove(zodiac)
        },
        wealth: {
            title: "💰 재물 운세",
            content: getZodiacWealth(zodiac)
        },
        health: {
            title: "🏥 건강 운세",
            content: getZodiacHealth(zodiac)
        }
    };
}

// 띠별 성격 분석
function getZodiacPersonality(zodiac) {
    const personalities = {
        '쥐': '영리하고 적응력이 뛰어나며, 기회를 잘 포착하는 성격입니다. 사교적이고 유머감각이 있어 사람들과 잘 어울립니다.',
        '소': '성실하고 인내심이 강하며, 책임감이 뛰어난 성격입니다. 꾸준함과 신뢰성으로 주변 사람들의 믿음을 얻습니다.',
        '호랑이': '용감하고 리더십이 강하며, 정의감이 뛰어난 성격입니다. 모험을 좋아하고 새로운 도전을 두려워하지 않습니다.',
        '토끼': '온화하고 섬세하며, 예술적 감각이 뛰어난 성격입니다. 평화를 사랑하고 조화로운 관계를 중시합니다.',
        '용': '카리스마가 있고 야심찬 성격으로, 큰 꿈을 품고 실현하려 노력합니다. 자신감이 넘치고 리더의 자질을 갖추고 있습니다.',
        '뱀': '지혜롭고 직관력이 뛰어나며, 신중한 판단력을 가진 성격입니다. 깊이 있는 사고와 통찰력으로 문제를 해결합니다.',
        '말': '자유롭고 활동적이며, 열정적인 성격입니다. 새로운 경험을 추구하고 변화를 즐기는 모험가적 기질을 가지고 있습니다.',
        '양': '온순하고 창의적이며, 예술적 재능이 뛰어난 성격입니다. 감성이 풍부하고 타인을 배려하는 마음이 깊습니다.',
        '원숭이': '똑똑하고 재치가 있으며, 유연한 사고력을 가진 성격입니다. 호기심이 많고 다양한 분야에 관심을 보입니다.',
        '닭': '정확하고 체계적이며, 완벽주의적 성향을 가진 성격입니다. 시간 관념이 뚜렷하고 계획적으로 일을 처리합니다.',
        '개': '충성스럽고 정직하며, 강한 도덕성을 가진 성격입니다. 가족과 친구를 소중히 여기고 신뢰할 수 있는 사람입니다.',
        '돼지': '관대하고 낙천적이며, 풍부한 감정을 가진 성격입니다. 물질적 풍요를 추구하고 안정된 삶을 선호합니다.'
    };
    
    return personalities[zodiac] || '특별한 개성과 매력을 가진 성격입니다.';
}

// 띠별 운세 분석 (간단 버전)
function getZodiacFortune(zodiac) {
    const fortunes = {
        '쥐': '올해는 새로운 기회가 많이 찾아올 것입니다. 특히 하반기에 큰 변화가 예상됩니다.',
        '소': '꾸준한 노력이 결실을 맺는 해입니다. 인내심을 가지고 계속 전진하세요.',
        '호랑이': '리더십을 발휘할 기회가 많은 해입니다. 적극적인 도전이 좋은 결과를 가져올 것입니다.',
        '토끼': '평화롭고 안정적인 한 해가 될 것입니다. 인간관계에서 좋은 소식이 있을 것입니다.',
        '용': '큰 성취를 이룰 수 있는 해입니다. 야심찬 계획을 실행에 옮기기 좋은 시기입니다.',
        '뱀': '지혜로운 판단으로 어려움을 극복하는 해입니다. 직감을 믿고 행동하세요.',
        '말': '활발한 활동과 새로운 경험이 많은 해입니다. 변화를 두려워하지 마세요.',
        '양': '창의적인 활동에서 좋은 성과를 거둘 수 있는 해입니다. 예술적 재능을 발휘하세요.',
        '원숭이': '다양한 기회가 동시에 찾아오는 해입니다. 선택의 지혜가 필요한 시기입니다.',
        '닭': '계획한 일들이 순조롭게 진행되는 해입니다. 체계적인 접근이 성공의 열쇠입니다.',
        '개': '신뢰할 수 있는 사람들과의 관계가 더욱 깊어지는 해입니다. 협력이 중요합니다.',
        '돼지': '물질적 풍요와 정신적 만족을 동시에 얻을 수 있는 해입니다.'
    };
    
    return fortunes[zodiac] || '특별한 운세가 기다리고 있습니다.';
}

// 나머지 함수들도 간단히 구현
function getZodiacCareer(zodiac) {
    return `${zodiac}띠는 현재 직업 운세가 상승세에 있습니다. 새로운 프로젝트나 업무에 적극적으로 참여하세요.`;
}

function getZodiacLove(zodiac) {
    return `${zodiac}띠는 연애 운세가 밝습니다. 진실한 마음으로 상대방을 대하면 좋은 결과가 있을 것입니다.`;
}

function getZodiacWealth(zodiac) {
    return `${zodiac}띠는 재물 운세가 안정적입니다. 계획적인 투자와 저축이 도움이 될 것입니다.`;
}

function getZodiacHealth(zodiac) {
    return `${zodiac}띠는 건강 운세가 양호합니다. 규칙적인 생활과 적당한 운동을 유지하세요.`;
}
// 성격 분석 생성
function generatePersonalityAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis) {
    const { year, month, day, hour } = birthData;
    const dayMaster = fourPillars.day.stem;
    const dayBranch = fourPillars.day.branch;
    const { strongest, weakest, balance } = fiveElementAnalysis;
    
    let analysis = `**📊 만세력 기반 성격 분석**\n\n`;
    
    // 일간 기본 성격
    analysis += `**🎯 일간(日干) ${dayMaster}의 기본 성격:**\n`;
    analysis += getDayMasterPersonality(dayMaster) + '\n\n';
    
    // 일지의 영향
    analysis += `**🏠 일지(日支) ${dayBranch}의 영향:**\n`;
    analysis += getDayBranchInfluence(dayBranch) + '\n\n';
    
    // 오행 분석
    analysis += `**⚖️ 오행 분석 (${balance}):**\n`;
    analysis += `• 가장 강한 오행: ${strongest} - ${getElementCharacteristic(strongest)}\n`;
    analysis += `• 가장 약한 오행: ${weakest} - ${getElementWeakness(weakest)}\n\n`;
    
    // 태어난 시기의 영향
    analysis += `**🌅 출생 시기의 영향:**\n`;
    analysis += getBirthTimeInfluence(year, month, day, hour) + '\n\n';
    
    // 종합 결론
    analysis += `**🎭 종합 성격 특성:**\n`;
    analysis += getPersonalitySummary(fourPillars, fiveElementAnalysis);
    
    return {
        title: "🎭 성격 분석",
        content: analysis
    };
}

// 운세 분석 생성
function generateFortuneAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis) {
    const { usefulGod, avoidGod } = usefulGodAnalysis;
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthData.year + 1;
    
    let analysis = `**🌟 만세력 기반 운세 분석**\n\n`;
    
    // 용신 분석
    analysis += `**🎯 용신(用神) 분석:**\n`;
    analysis += `• 용신: ${usefulGod} - ${getUsefulGodMeaning(usefulGod)}\n`;
    analysis += `• 기신: ${avoidGod} - ${getAvoidGodMeaning(avoidGod)}\n\n`;
    
    // 현재 나이대 운세
    analysis += `**📅 현재 ${age}세 운세:**\n`;
    analysis += getCurrentAgeFortune(age, usefulGod) + '\n\n';
    
    // 계절별 운세
    analysis += `**🌸 계절별 운세:**\n`;
    analysis += getSeasonalFortune(usefulGod, avoidGod) + '\n\n';
    
    // 향후 전망
    analysis += `**🔮 향후 전망:**\n`;
    analysis += getFutureProspect(birthData, usefulGod);
    
    return {
        title: "🌟 전반적 운세",
        content: analysis
    };
}

// 직업 분석 생성
function generateCareerAnalysis(birthData, fourPillars, tenGodsAnalysis, usefulGodAnalysis) {
    const dayMaster = fourPillars.day.stem;
    const { usefulGod } = usefulGodAnalysis;
    
    let analysis = `**💼 만세력 기반 직업 분석**\n\n`;
    
    // 일간별 직업 적성
    analysis += `**🎯 일간 ${dayMaster}의 직업 적성:**\n`;
    analysis += getDayMasterCareer(dayMaster) + '\n\n';
    
    // 십신 분석
    analysis += `**🔟 십신(十神) 직업 분석:**\n`;
    analysis += getTenGodsCareerAnalysis(tenGodsAnalysis) + '\n\n';
    
    // 용신 기반 직업 추천
    analysis += `**⭐ 용신 ${usefulGod} 기반 추천 직업:**\n`;
    analysis += getUsefulGodCareer(usefulGod) + '\n\n';
    
    // 사업 vs 직장
    analysis += `**🏢 사업 vs 직장 적성:**\n`;
    analysis += getBusinessVsEmployee(tenGodsAnalysis);
    
    return {
        title: "💼 직업 운세",
        content: analysis
    };
}

// 연애 분석 생성
function generateLoveAnalysis(birthData, fourPillars, fiveElementAnalysis, tenGodsAnalysis) {
    const dayMaster = fourPillars.day.stem;
    const dayBranch = fourPillars.day.branch;
    const isYang = fourPillars.day.yinYang === '양';
    
    let analysis = `**💕 만세력 기반 연애 분석**\n\n`;
    
    // 일간별 연애 스타일
    analysis += `**💖 일간 ${dayMaster}의 연애 스타일:**\n`;
    analysis += getDayMasterLoveStyle(dayMaster, isYang) + '\n\n';
    
    // 배우자궁 분석
    analysis += `**🏠 배우자궁(日支) 분석:**\n`;
    analysis += getSpouseAnalysis(dayBranch) + '\n\n';
    
    // 십신 연애 분석
    analysis += `**🔟 십신 연애 패턴:**\n`;
    analysis += getTenGodsLoveAnalysis(tenGodsAnalysis) + '\n\n';
    
    // 궁합 조언
    analysis += `**💑 이상적인 상대방:**\n`;
    analysis += getIdealPartner(fourPillars, fiveElementAnalysis);
    
    return {
        title: "💕 연애 운세",
        content: analysis
    };
}

// 재물 분석 생성
function generateWealthAnalysis(birthData, fourPillars, tenGodsAnalysis, usefulGodAnalysis) {
    const dayMaster = fourPillars.day.stem;
    const { usefulGod } = usefulGodAnalysis;
    
    let analysis = `**💰 만세력 기반 재물 분석**\n\n`;
    
    // 일간별 재물 성향
    analysis += `**💎 일간 ${dayMaster}의 재물 성향:**\n`;
    analysis += getDayMasterWealth(dayMaster) + '\n\n';
    
    // 십신 재물 분석
    analysis += `**🔟 십신 재물 패턴:**\n`;
    analysis += getTenGodsWealthAnalysis(tenGodsAnalysis) + '\n\n';
    
    // 용신 기반 재물 조언
    analysis += `**⭐ 용신 ${usefulGod} 기반 재물 전략:**\n`;
    analysis += getUsefulGodWealthStrategy(usefulGod) + '\n\n';
    
    // 투자 성향
    analysis += `**📈 투자 성향 분석:**\n`;
    analysis += getInvestmentStyle(tenGodsAnalysis);
    
    return {
        title: "💰 재물 운세",
        content: analysis
    };
}

// 건강 분석 생성
function generateHealthAnalysis(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis) {
    const dayElement = fourPillars.day.element;
    const { strongest, weakest } = fiveElementAnalysis;
    const { usefulGod } = usefulGodAnalysis;
    
    let analysis = `**🏥 만세력 기반 건강 분석**\n\n`;
    
    // 일간별 건강 특성
    analysis += `**🎯 일간 오행 ${dayElement}의 건강 특성:**\n`;
    analysis += getElementHealthCharacteristic(dayElement) + '\n\n';
    
    // 오행 불균형 건강 영향
    analysis += `**⚖️ 오행 불균형 건강 영향:**\n`;
    analysis += `• 과다한 ${strongest}: ${getExcessElementHealth(strongest)}\n`;
    analysis += `• 부족한 ${weakest}: ${getDeficientElementHealth(weakest)}\n\n`;
    
    // 용신 기반 건강 관리
    analysis += `**⭐ 용신 ${usefulGod} 기반 건강 관리:**\n`;
    analysis += getUsefulGodHealthAdvice(usefulGod) + '\n\n';
    
    // 계절별 건강 주의사항
    analysis += `**🌸 계절별 건강 관리:**\n`;
    analysis += getSeasonalHealthAdvice(fourPillars, fiveElementAnalysis);
    
    return {
        title: "🏥 건강 운세",
        content: analysis
    };
}

// 기본 분석 (오류시 사용)
function generateBasicAnalysis(birthData) {
    const { zodiac } = birthData;
    
    return {
        personality: {
            title: "🎭 성격 분석",
            content: `${zodiac}띠의 기본적인 성격 특성을 바탕으로 한 분석입니다. 더 정확한 분석을 위해서는 정확한 출생 시간이 필요합니다.`
        },
        fortune: {
            title: "🌟 전반적 운세",
            content: `${zodiac}띠의 전반적인 운세 흐름을 분석한 결과입니다.`
        },
        career: {
            title: "💼 직업 운세",
            content: `${zodiac}띠에게 적합한 직업 분야와 성향을 분석한 결과입니다.`
        },
        love: {
            title: "💕 연애 운세",
            content: `${zodiac}띠의 연애 스타일과 궁합을 분석한 결과입니다.`
        },
        wealth: {
            title: "💰 재물 운세",
            content: `${zodiac}띠의 재물 운세와 투자 성향을 분석한 결과입니다.`
        },
        health: {
            title: "🏥 건강 운세",
            content: `${zodiac}띠의 건강 관리 포인트를 분석한 결과입니다.`
        }
    };
}
// 일간별 기본 성격 (상세 버전)
function getDayMasterPersonality(dayMaster) {
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
function getDayBranchInfluence(dayBranch) {
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

// 오행별 특성과 약점
function getElementCharacteristic(element) {
    const characteristics = {
        '목': '성장과 발전을 추구하는 진취적 성격',
        '화': '열정적이고 창의적인 표현력',
        '토': '안정과 신뢰를 바탕으로 한 포용력',
        '금': '원칙과 정의를 중시하는 강인함',
        '수': '지혜와 적응력을 바탕으로 한 유연성'
    };
    return characteristics[element];
}

function getElementWeakness(element) {
    const weaknesses = {
        '목': '성장 동력 부족으로 인한 소극적 성향',
        '화': '표현력 부족으로 인한 내성적 성향',
        '토': '안정감 부족으로 인한 불안정성',
        '금': '의지력 부족으로 인한 우유부단함',
        '수': '지혜 부족으로 인한 판단력 저하'
    };
    return weaknesses[element];
}

// 출생 시기 영향 분석
function getBirthTimeInfluence(year, month, day, hour) {
    const season = Math.floor((month - 1) / 3);
    const timeOfDay = Math.floor(hour / 6);
    
    const seasonInfluences = [
        `봄(${month}월)에 태어나 새로운 시작과 성장의 에너지를 가지고 있습니다.`,
        `여름(${month}월)에 태어나 열정과 활력의 에너지를 가지고 있습니다.`,
        `가을(${month}월)에 태어나 수확과 성숙의 에너지를 가지고 있습니다.`,
        `겨울(${month}월)에 태어나 저장과 성찰의 에너지를 가지고 있습니다.`
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
function getPersonalitySummary(fourPillars, fiveElementAnalysis) {
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

// 용신/기신 의미 설명
function getUsefulGodMeaning(usefulGod) {
    const meanings = {
        '목': '성장과 발전을 도와주는 에너지. 새로운 도전과 학습이 도움됩니다.',
        '화': '열정과 창의성을 북돋는 에너지. 표현 활동과 사교 활동이 도움됩니다.',
        '토': '안정과 신뢰를 주는 에너지. 꾸준한 노력과 기반 구축이 도움됩니다.',
        '금': '의지력과 결단력을 주는 에너지. 원칙 있는 행동과 정의로운 일이 도움됩니다.',
        '수': '지혜와 유연성을 주는 에너지. 학습과 적응력 향상이 도움됩니다.'
    };
    return meanings[usefulGod];
}

function getAvoidGodMeaning(avoidGod) {
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
function getCurrentAgeFortune(age, usefulGod) {
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
function getSeasonalFortune(usefulGod, avoidGod) {
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

// 향후 전망
function getFutureProspect(birthData, usefulGod) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthData.year + 1;
    
    let prospect = `향후 5년간은 전반적으로 `;
    
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
function getDayMasterCareer(dayMaster) {
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
function getTenGodsCareerAnalysis(tenGodsAnalysis) {
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
function getUsefulGodCareer(usefulGod) {
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
function getBusinessVsEmployee(tenGodsAnalysis) {
    const hasEntrepreneurSpirit = Object.values(tenGodsAnalysis).includes('편재') || 
                                Object.values(tenGodsAnalysis).includes('편관');
    const hasStability = Object.values(tenGodsAnalysis).includes('정재') || 
                        Object.values(tenGodsAnalysis).includes('정관');
    
    if (hasEntrepreneurSpirit && !hasStability) {
        return '사업가 기질이 강합니다. 자유로운 환경에서 창의성을 발휘할 때 성공할 가능성이 높습니다.';
    } else if (hasStability && !hasEntrepreneurSpirit) {
        return '직장인 기질이 강습니다. 안정적인 조직에서 체계적으로 일할 때 성공할 가능성이 높습니다.';
    } else {
        return '사업과 직장 모두 가능합니다. 상황에 따라 유연하게 선택하는 것이 좋겠습니다.';
    }
}

// 일간별 연애 스타일
function getDayMasterLoveStyle(dayMaster, isYang) {
    const loveStyles = {
        '갑': isYang ? '직선적이고 적극적인 연애를 선호합니다. 상대방을 이끌어가는 스타일입니다.' : '부드럽지만 확고한 의지를 가진 연애 스타일입니다.',
        '을': isYang ? '섬세하면서도 적극적인 연애를 합니다.' : '온화하고 배려심 깊은 연애 스타일로 상대방을 감싸줍니다.',
        '병': isYang ? '열정적이고 로맨틱한 연애를 추구합니다. 드라마틱한 사랑을 좋아합니다.' : '따뜻하고 세심한 배려를 보이는 연애 스타일입니다.',
        '정': isYang ? '창의적이고 예술적인 연애를 선호합니다.' : '감성적이고 로맨틱한 분위기를 중시하는 연애 스타일입니다.',
        '무': isYang ? '안정적이고 든든한 연애를 추구합니다. 책임감 있는 사랑을 합니다.' : '포용력 있고 너그러운 연애 스타일입니다.',
        '기': isYang ? '실용적이면서도 따뜻한 연애를 합니다.' : '헌신적이고 봉사하는 마음으로 사랑합니다.',
        '경': isYang ? '원칙 있고 정의로운 연애를 추구합니다. 진실한 사랑을 중시합니다.' : '세련되고 품격 있는 연애 스타일입니다.',
        '신': isYang ? '완벽하고 이상적인 연애를 추구합니다.' : '섬세하고 까다로운 연애 스타일을 보입니다.',
        '임': isYang ? '자유롭고 개방적인 연애를 선호합니다. 다양한 경험을 추구합니다.' : '깊이 있고 지적인 연애를 추구합니다.',
        '계': isYang ? '순수하고 직관적인 연애를 합니다.' : '감성적이고 예술적인 연애 스타일을 보입니다.'
    };
    return loveStyles[dayMaster];
}

// 배우자궁 분석
function getSpouseAnalysis(dayBranch) {
    const spouseAnalysis = {
        '자': '지적이고 학구적인 배우자를 만날 가능성이 높습니다. 깊이 있는 대화를 나눌 수 있는 관계가 될 것입니다.',
        '축': '성실하고 근면한 배우자와 인연이 있습니다. 안정적이고 든든한 결혼 생활을 할 수 있습니다.',
        '인': '적극적이고 진취적인 배우자를 만날 것입니다. 서로 발전시켜주는 관계가 될 것입니다.',
        '묘': '온화하고 예술적 감각이 있는 배우자와 인연이 있습니다. 조화로운 가정을 이룰 것입니다.',
        '진': '변화를 추구하는 역동적인 배우자를 만날 가능성이 높습니다.',
        '사': '지혜롭고 통찰력 있는 배우자와 인연이 있습니다.',
        '오': '열정적이고 활동적인 배우자를 만날 것입니다. 활기찬 결혼 생활을 할 수 있습니다.',
        '미': '배려심 깊고 봉사정신이 강한 배우자와 인연이 있습니다.',
        '신': '자유롭고 모험적인 배우자를 만날 가능성이 높습니다.',
        '유': '완벽주의적이고 세심한 배우자와 인연이 있습니다.',
        '술': '포용력 있고 너그러운 배우자를 만날 것입니다.',
        '해': '순수하고 감성적인 배우자와 인연이 있습니다.'
    };
    return spouseAnalysis[dayBranch];
}

// 십신 연애 분석
function getTenGodsLoveAnalysis(tenGodsAnalysis) {
    let analysis = '';
    Object.entries(tenGodsAnalysis).forEach(([position, tenGod]) => {
        const meanings = {
            '비견': '동등한 관계의 연애를 선호',
            '겁재': '경쟁적이고 역동적인 연애',
            '식신': '즐겁고 유쾌한 연애 스타일',
            '상관': '독특하고 개성적인 연애',
            '편재': '자유롭고 개방적인 연애',
            '정재': '안정적이고 진실한 연애',
            '편관': '강렬하고 열정적인 연애',
            '정관': '품격 있고 격식 있는 연애',
            '편인': '지적이고 정신적인 연애',
            '정인': '따뜻하고 보호받는 연애'
        };
        analysis += `• ${position}주 ${tenGod}: ${meanings[tenGod]}\n`;
    });
    return analysis;
}

// 이상적인 상대방
function getIdealPartner(fourPillars, fiveElementAnalysis) {
    const dayElement = fourPillars.day.element;
    const { weakest } = fiveElementAnalysis;
    
    const complementaryElements = {
        '목': '토', '화': '수', '토': '목', '금': '화', '수': '금'
    };
    
    const idealElement = complementaryElements[dayElement];
    
    let advice = `오행상 ${idealElement} 기운이 강한 상대방과 좋은 궁합을 보일 것입니다. `;
    advice += `또한 부족한 ${weakest} 오행을 보완해줄 수 있는 상대방이 이상적입니다. `;
    advice += '무엇보다 서로의 장단점을 이해하고 보완해주는 관계가 중요합니다.';
    
    return advice;
}

// 일간별 재물 성향
function getDayMasterWealth(dayMaster) {
    const wealthStyles = {
        '갑': '큰 규모의 사업이나 투자를 통해 재물을 축적하는 성향이 있습니다. 장기적 관점의 투자가 유리합니다.',
        '을': '꾸준하고 안정적인 방법으로 재물을 모으는 것이 좋습니다. 작은 것부터 차근차근 쌓아가세요.',
        '병': '창의적이고 혁신적인 아이디어로 수익을 창출할 수 있습니다. 트렌드를 활용한 투자가 유리합니다.',
        '정': '세심하고 신중한 재물 관리가 특징입니다. 안전한 투자를 선호하며 꾸준히 모으는 타입입니다.',
        '무': '부동산이나 실물 자산 투자에 재능이 있습니다. 안정적이고 확실한 수익을 추구합니다.',
        '기': '실용적이고 검소한 재물 관리를 합니다. 필요한 곳에 적절히 투자하는 지혜가 있습니다.',
        '경': '원칙 있고 계획적인 재물 관리를 합니다. 정확한 분석을 바탕으로 한 투자가 유리합니다.',
        '신': '정밀하고 세련된 투자 감각을 가지고 있습니다. 고급 상품이나 기술 관련 투자에 재능이 있습니다.',
        '임': '유연하고 적응력 있는 재물 관리를 합니다. 다양한 분야에 분산 투자하는 것이 좋습니다.',
        '계': '직감적이고 감성적인 투자 성향을 보입니다. 예술품이나 문화 관련 투자에 관심이 많습니다.'
    };
    return wealthStyles[dayMaster];
}

// 십신 재물 분석
function getTenGodsWealthAnalysis(tenGodsAnalysis) {
    let analysis = '';
    Object.entries(tenGodsAnalysis).forEach(([position, tenGod]) => {
        const meanings = {
            '비견': '동업이나 공동 투자에 유리',
            '겁재': '경쟁을 통한 수익 창출',
            '식신': '창작이나 서비스업으로 수익',
            '상관': '기술이나 전문성으로 수익',
            '편재': '사업이나 투자로 큰 수익 가능',
            '정재': '안정적인 수입과 저축',
            '편관': '도전적 투자로 큰 수익 추구',
            '정관': '공적 업무나 안정적 직업으로 수익',
            '편인': '연구나 학습을 통한 수익',
            '정인': '교육이나 상담으로 수익'
        };
        analysis += `• ${position}주 ${tenGod}: ${meanings[tenGod]}\n`;
    });
    return analysis;
}

// 용신 기반 재물 전략
function getUsefulGodWealthStrategy(usefulGod) {
    const strategies = {
        '목': '성장주나 신재생 에너지, 교육 관련 투자가 유리합니다. 장기적 관점의 투자를 추천합니다.',
        '화': 'IT, 전자, 엔터테인먼트 관련 투자가 좋습니다. 트렌드를 활용한 단기 투자도 고려해보세요.',
        '토': '부동산, 건설, 농업 관련 투자가 안정적입니다. 실물 자산 중심의 포트폴리오를 구성하세요.',
        '금': '금융, 기계, 자동차 관련 투자가 유리합니다. 안정적이고 확실한 수익을 추구하세요.',
        '수': '물류, 운송, 통신 관련 투자를 고려해보세요. 유동성 있는 투자가 적합합니다.'
    };
    return strategies[usefulGod];
}

// 투자 성향 분석
function getInvestmentStyle(tenGodsAnalysis) {
    const hasRisk = Object.values(tenGodsAnalysis).includes('편재') || 
                   Object.values(tenGodsAnalysis).includes('편관');
    const hasStability = Object.values(tenGodsAnalysis).includes('정재') || 
                        Object.values(tenGodsAnalysis).includes('정관');
    
    if (hasRisk && !hasStability) {
        return '적극적이고 도전적인 투자 성향을 보입니다. 고수익 고위험 투자를 선호하지만 신중함도 필요합니다.';
    } else if (hasStability && !hasRisk) {
        return '안정적이고 보수적인 투자 성향을 보입니다. 확실한 수익을 추구하며 위험을 최소화하려 합니다.';
    } else {
        return '균형 잡힌 투자 성향을 보입니다. 안정성과 수익성을 동시에 고려하는 현명한 투자자입니다.';
    }
}

// 건강 관련 함수들
function getElementHealthCharacteristic(element) {
    const characteristics = {
        '목': '간, 담낭, 근육, 신경계 건강에 주의가 필요합니다. 스트레스 관리와 충분한 휴식이 중요합니다.',
        '화': '심장, 소장, 혈관계 건강을 관리해야 합니다. 과도한 흥분이나 스트레스를 피하세요.',
        '토': '위, 비장, 소화기계 건강에 신경 써야 합니다. 규칙적인 식사와 적당한 운동이 필요합니다.',
        '금': '폐, 대장, 호흡기계 건강을 챙겨야 합니다. 공기 좋은 곳에서의 운동을 추천합니다.',
        '수': '신장, 방광, 생식기계 건강에 주의하세요. 충분한 수분 섭취와 하체 운동이 도움됩니다.'
    };
    return characteristics[element];
}

function getExcessElementHealth(element) {
    const effects = {
        '목': '간 기능 항진, 신경과민, 불면증 등이 나타날 수 있습니다.',
        '화': '고혈압, 심장 질환, 불안증 등에 주의가 필요합니다.',
        '토': '소화불량, 비만, 당뇨 등의 위험이 있습니다.',
        '금': '호흡기 질환, 피부 트러블, 변비 등이 생길 수 있습니다.',
        '수': '신장 기능 저하, 부종, 냉증 등에 주의해야 합니다.'
    };
    return effects[element];
}

function getDeficientElementHealth(element) {
    const effects = {
        '목': '간 기능 저하, 근육 약화, 우울감 등이 나타날 수 있습니다.',
        '화': '혈액순환 장애, 냉증, 무기력감 등에 주의가 필요합니다.',
        '토': '소화 기능 약화, 영양 흡수 장애 등의 문제가 있을 수 있습니다.',
        '금': '면역력 저하, 호흡기 약화, 피로감 등이 생길 수 있습니다.',
        '수': '신진대사 저하, 생식 기능 약화, 골다공증 등에 주의해야 합니다.'
    };
    return effects[element];
}

function getUsefulGodHealthAdvice(usefulGod) {
    const advice = {
        '목': '녹색 채소를 많이 섭취하고, 산책이나 등산 등 자연 속 운동을 하세요. 스트레칭도 도움됩니다.',
        '화': '붉은색 음식을 적당히 섭취하고, 유산소 운동을 규칙적으로 하세요. 웃음과 긍정적 사고가 중요합니다.',
        '토': '노란색 음식과 곡물을 충분히 섭취하고, 요가나 태극권 같은 안정적인 운동을 하세요.',
        '금': '흰색 음식과 견과류를 섭취하고, 호흡법이나 명상을 통해 폐 기능을 강화하세요.',
        '수': '검은색 음식과 해산물을 섭취하고, 수영이나 하체 운동을 통해 신장 기능을 강화하세요.'
    };
    return advice[usefulGod];
}

function getSeasonalHealthAdvice(fourPillars, fiveElementAnalysis) {
    const { strongest, weakest } = fiveElementAnalysis;
    
    let advice = '계절별 건강 관리 포인트:\n';
    advice += `• 봄: ${strongest === '목' ? '간 기능 조절에 주의' : '새싹 채소로 간 건강 관리'}\n`;
    advice += `• 여름: ${strongest === '화' ? '심장 건강과 체온 조절 주의' : '적당한 운동으로 심폐 기능 강화'}\n`;
    advice += `• 가을: ${strongest === '금' ? '호흡기 건강 관리 중요' : '폐 건강을 위한 호흡 운동'}\n`;
    advice += `• 겨울: ${strongest === '수' ? '신장 기능과 보온 관리' : '따뜻한 음식으로 신장 기능 보강'}`;
    
    return advice;
}
// 자체 고급 분석 시스템 (Gemini 폴백용)
async function analyzeWithAdvancedSystem(birthData) {
    const { year, month, day, hour, zodiac } = birthData;
    
    console.log(`🔮 자체 고급 만세력 분석 시작: ${zodiac}띠 (${year}년 ${month}월 ${day}일 ${hour}시)`);
    
    // 약간의 지연으로 실제 AI 분석하는 것처럼 표현
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
        // 만세력 계산
        const fourPillars = calculateFourPillars(year, month, day, hour);
        
        // 오행 분석
        const fiveElementAnalysis = analyzeFiveElements(fourPillars);
        
        // 용신 분석
        const usefulGodAnalysis = analyzeUsefulGod(fourPillars, fiveElementAnalysis);
        
        // 십신 분석
        const tenGodsAnalysis = analyzeTenGods(fourPillars);
        
        // 상세 분석 생성
        const detailedAnalysis = generateDetailedAnalysis(
            birthData, 
            fourPillars, 
            fiveElementAnalysis, 
            usefulGodAnalysis, 
            tenGodsAnalysis
        );
        
        console.log('✅ 자체 고급 만세력 분석 완료');
        return detailedAnalysis;
        
    } catch (error) {
        console.error('❌ 자체 고급 분석 오류:', error);
        // 오류 발생시 기본 분석으로 폴백
        return generateBasicAnalysis(birthData);
    }
}

// 성별에 따른 십신 의미 해석
function getTenGodMeaningByGender(tenGod, gender) {
    const meanings = {
        '비견': {
            male: '형제, 동료, 경쟁자를 의미하며 남성적 경쟁심과 동료애를 나타냄',
            female: '자매, 친구를 의미하며 여성적 연대감과 협력 정신을 나타냄'
        },
        '겁재': {
            male: '라이벌, 투자 손실을 의미하며 남성적 도전 정신과 위험 감수를 나타냄',
            female: '경쟁 상대, 질투를 의미하며 여성적 경쟁 심리와 시기심을 나타냄'
        },
        '식신': {
            male: '자유로운 표현, 예술적 재능을 의미하며 남성적 창의성과 여유를 나타냄',
            female: '자녀, 모성애를 의미하며 여성적 양육 본능과 창조력을 나타냄'
        },
        '상관': {
            male: '재능, 반항 정신을 의미하며 남성적 개성과 독립성을 나타냄',
            female: '남편을 극하는 기운으로 독립적 성향과 강한 자아를 나타냄'
        },
        '편재': {
            male: '연인, 바람기를 의미하며 남성적 매력과 이성 관계를 나타냄',
            female: '아버지, 후원자를 의미하며 경제적 지원과 보호를 나타냄'
        },
        '정재': {
            male: '아내, 배우자를 의미하며 결혼운과 가정 생활을 나타냄',
            female: '어머니, 재물을 의미하며 안정적 수입과 절약 정신을 나타냄'
        },
        '편관': {
            male: '상사, 권위를 의미하며 남성적 권력 욕구와 사회적 지위를 나타냄',
            female: '연인, 불안정한 이성 관계를 의미하며 복잡한 감정을 나타냄'
        },
        '정관': {
            male: '직업, 명예를 의미하며 남성적 사회적 성공과 책임감을 나타냄',
            female: '남편, 배우자를 의미하며 결혼운과 안정적 관계를 나타냄'
        },
        '편인': {
            male: '스승, 학문을 의미하며 남성적 지적 탐구와 정신세계를 나타냄',
            female: '계모, 복잡한 모성을 의미하며 지적 능력과 직관력을 나타냄'
        },
        '정인': {
            male: '어머니, 보호자를 의미하며 남성적 안정감과 전통을 나타냄',
            female: '친정어머니, 학문을 의미하며 여성적 지혜와 교육열을 나타냄'
        }
    };
    
    return meanings[tenGod] ? meanings[tenGod][gender] : `${tenGod}의 기운을 나타냄`;
}
