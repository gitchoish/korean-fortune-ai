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

    // 기본 사주 계산 (간단한 버전)
    const yearStem = heavenlyStems[(year - 4) % 10];
    const yearBranch = earthlyBranches[(year - 4) % 12];
    const monthStem = heavenlyStems[(month - 1) % 10];
    const monthBranch = earthlyBranches[(month - 1) % 12];
    const dayStem = heavenlyStems[(day - 1) % 10];
    const dayBranch = earthlyBranches[(day - 1) % 12];
    const hourStem = heavenlyStems[(hour) % 10];
    const hourBranch = earthlyBranches[(hour) % 12];

    return {
        year: { stem: yearStem, branch: yearBranch, element: fiveElements[yearStem], yinYang: yinYang[yearStem] },
        month: { stem: monthStem, branch: monthBranch, element: fiveElements[monthStem], yinYang: yinYang[monthStem] },
        day: { stem: dayStem, branch: dayBranch, element: fiveElements[dayStem], yinYang: yinYang[dayStem] },
        hour: { stem: hourStem, branch: hourBranch, element: fiveElements[hourStem], yinYang: yinYang[hourStem] }
    };
}

// 오행 분석
function analyzeFiveElements(fourPillars) {
    const elements = ['목', '화', '토', '금', '수'];
    const elementCount = {};
    
    elements.forEach(element => {
        elementCount[element] = 0;
    });
    
    // 사주 팔자에서 오행 개수 계산
    Object.values(fourPillars).forEach(pillar => {
        elementCount[pillar.element]++;
    });
    
    // 가장 많은/적은 오행 찾기
    const maxElement = Object.keys(elementCount).reduce((a, b) => 
        elementCount[a] > elementCount[b] ? a : b
    );
    const minElement = Object.keys(elementCount).reduce((a, b) => 
        elementCount[a] < elementCount[b] ? a : b
    );
    
    return {
        elementCount,
        strongElement: maxElement,
        weakElement: minElement,
        balance: calculateElementBalance(elementCount)
    };
}

// 오행 균형 계산
function calculateElementBalance(elementCount) {
    const total = Object.values(elementCount).reduce((sum, count) => sum + count, 0);
    const average = total / 5;
    const variance = Object.values(elementCount).reduce((sum, count) => 
        sum + Math.pow(count - average, 2), 0) / 5;
    
    if (variance < 0.5) return '균형';
    if (variance < 1.5) return '약간 불균형';
    return '불균형';
}

// 용신 분석
function analyzeUsefulGod(fourPillars, fiveElementAnalysis) {
    const dayMaster = fourPillars.day.element;
    const weakElement = fiveElementAnalysis.weakElement;
    
    // 간단한 용신 결정 로직
    const usefulElements = [];
    
    if (fiveElementAnalysis.balance === '불균형') {
        usefulElements.push(weakElement);
    }
    
    // 일간을 도와주는 오행 추가
    const supportingElements = {
        '목': ['수', '목'],
        '화': ['목', '화'],
        '토': ['화', '토'],
        '금': ['토', '금'],
        '수': ['금', '수']
    };
    
    supportingElements[dayMaster].forEach(element => {
        if (!usefulElements.includes(element)) {
            usefulElements.push(element);
        }
    });
    
    return {
        dayMaster,
        usefulElements,
        avoidElements: getAvoidElements(usefulElements)
    };
}

// 기피 오행 계산
function getAvoidElements(usefulElements) {
    const allElements = ['목', '화', '토', '금', '수'];
    return allElements.filter(element => !usefulElements.includes(element));
}

// 십신 분석
function analyzeTenGods(fourPillars, birthData) {
    const dayMaster = fourPillars.day.stem;
    const gender = birthData.gender;
    
    // 십신 기본 매핑
    const tenGodsMapping = {
        '갑': { '갑': '비견', '을': '겁재', '병': '식신', '정': '상관', '무': '편재', '기': '정재', '경': '편관', '신': '정관', '임': '편인', '계': '정인' },
        '을': { '갑': '겁재', '을': '비견', '병': '상관', '정': '식신', '무': '정재', '기': '편재', '경': '정관', '신': '편관', '임': '정인', '계': '편인' },
        '병': { '갑': '편인', '을': '정인', '병': '비견', '정': '겁재', '무': '식신', '기': '상관', '경': '편재', '신': '정재', '임': '편관', '계': '정관' },
        '정': { '갑': '정인', '을': '편인', '병': '겁재', '정': '비견', '무': '상관', '기': '식신', '경': '정재', '신': '편재', '임': '정관', '계': '편관' },
        '무': { '갑': '편관', '을': '정관', '병': '편인', '정': '정인', '무': '비견', '기': '겁재', '경': '식신', '신': '상관', '임': '편재', '계': '정재' },
        '기': { '갑': '정관', '을': '편관', '병': '정인', '정': '편인', '무': '겁재', '기': '비견', '경': '상관', '신': '식신', '임': '정재', '계': '편재' },
        '경': { '갑': '편재', '을': '정재', '병': '편관', '정': '정관', '무': '편인', '기': '정인', '경': '비견', '신': '겁재', '임': '식신', '계': '상관' },
        '신': { '갑': '정재', '을': '편재', '병': '정관', '정': '편관', '무': '정인', '기': '편인', '경': '겁재', '신': '비견', '임': '상관', '계': '식신' },
        '임': { '갑': '식신', '을': '상관', '병': '편재', '정': '정재', '무': '편관', '기': '정관', '경': '편인', '신': '정인', '임': '비견', '계': '겁재' },
        '계': { '갑': '상관', '을': '식신', '병': '정재', '정': '편재', '무': '정관', '기': '편관', '경': '정인', '신': '편인', '임': '겁재', '계': '비견' }
    };
    
    const tenGods = {};
    Object.keys(fourPillars).forEach(pillar => {
        const stem = fourPillars[pillar].stem;
        tenGods[pillar] = tenGodsMapping[dayMaster][stem];
    });
    
    return {
        dayMaster,
        tenGods,
        genderSpecificAnalysis: getGenderSpecificAnalysis(tenGods, gender)
    };
}

// 성별별 십신 분석
function getGenderSpecificAnalysis(tenGods, gender) {
    const analysis = {};
    
    Object.entries(tenGods).forEach(([pillar, god]) => {
        analysis[pillar] = {
            god,
            meaning: getGenderSpecificMeaning(god, gender)
        };
    });
    
    return analysis;
}

// 성별별 십신 의미
function getGenderSpecificMeaning(god, gender) {
    const meanings = {
        male: {
            '정관': '직업운, 명예, 책임감',
            '편관': '도전정신, 리더십, 변화',
            '정재': '아내운, 안정적 재물',
            '편재': '사업운, 투자, 기회',
            '정인': '학문, 전통, 어머니',
            '편인': '창의성, 독창성, 기술',
            '식신': '자식운, 표현력, 재능',
            '상관': '창작력, 자유로움, 반항',
            '비견': '형제운, 협력, 경쟁',
            '겁재': '친구운, 도움, 손실'
        },
        female: {
            '정관': '남편운, 안정, 전통',
            '편관': '연애운, 매력, 변화',
            '정재': '재물운, 검소함, 관리',
            '편재': '사교성, 활동력, 소비',
            '정인': '학문, 품격, 어머니',
            '편인': '직감, 예술성, 독립',
            '식신': '자식운, 온화함, 복',
            '상관': '미모, 재능, 자유',
            '비견': '자매운, 독립성, 고집',
            '겁재': '친구운, 의리, 경쟁'
        }
    };
    
    return meanings[gender][god] || '일반적 의미';
}

// Gemini AI 분석 함수
async function analyzeWithGeminiAI(birthData, env) {
    try {
        // 만세력 계산
        const fourPillars = calculateFourPillars(
            birthData.year, 
            birthData.month, 
            birthData.day, 
            birthData.hour || 12
        );
        
        const fiveElementAnalysis = analyzeFiveElements(fourPillars);
        const usefulGodAnalysis = analyzeUsefulGod(fourPillars, fiveElementAnalysis);
        const tenGodsAnalysis = analyzeTenGods(fourPillars, birthData);
        
        // Gemini API 호출
        const geminiResult = await callGeminiAPI(
            birthData, 
            fourPillars, 
            fiveElementAnalysis, 
            usefulGodAnalysis, 
            tenGodsAnalysis, 
            env
        );
        
        return geminiResult;
        
    } catch (error) {
        console.error('❌ Gemini AI 분석 오류:', error);
        
        // 대체 분석 반환
        return getFallbackAnalysis(birthData);
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
                    maxOutputTokens: 2048,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API 오류: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.candidates && result.candidates[0] && result.candidates[0].content) {
            return result.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Gemini API 응답 형식 오류');
        }
        
    } catch (error) {
        console.error('❌ Gemini API 호출 오류:', error);
        throw error;
    }
}

// Gemini 프롬프트 생성
function generateGeminiPrompt(birthData, fourPillars, fiveElementAnalysis, usefulGodAnalysis, tenGodsAnalysis) {
    const gender = birthData.gender === 'male' ? '남성' : '여성';
    
    return `
당신은 30년 경력의 전문 사주 명리학자입니다. 다음 ${gender}의 사주를 분석해주세요.

## 기본 정보
- 성별: ${gender}
- 생년월일: ${birthData.year}년 ${birthData.month}월 ${birthData.day}일
- 생시: ${birthData.hour || 12}시

## 사주팔자 (만세력)
- 년주: ${fourPillars.year.stem}${fourPillars.year.branch} (${fourPillars.year.element}${fourPillars.year.yinYang})
- 월주: ${fourPillars.month.stem}${fourPillars.month.branch} (${fourPillars.month.element}${fourPillars.month.yinYang})
- 일주: ${fourPillars.day.stem}${fourPillars.day.branch} (${fourPillars.day.element}${fourPillars.day.yinYang})
- 시주: ${fourPillars.hour.stem}${fourPillars.hour.branch} (${fourPillars.hour.element}${fourPillars.hour.yinYang})

## 오행 분석
- 오행 분포: ${JSON.stringify(fiveElementAnalysis.elementCount)}
- 강한 오행: ${fiveElementAnalysis.strongElement}
- 약한 오행: ${fiveElementAnalysis.weakElement}
- 오행 균형: ${fiveElementAnalysis.balance}

## 용신 분석
- 일간: ${usefulGodAnalysis.dayMaster}
- 용신: ${usefulGodAnalysis.usefulElements.join(', ')}
- 기신: ${usefulGodAnalysis.avoidElements.join(', ')}

## 십신 분석 (${gender} 맞춤)
- 년주: ${tenGodsAnalysis.tenGods.year}
- 월주: ${tenGodsAnalysis.tenGods.month}
- 일주: ${tenGodsAnalysis.tenGods.day}
- 시주: ${tenGodsAnalysis.tenGods.hour}

다음 형식으로 ${gender} 맞춤 상세 분석을 해주세요:

### 🎯 성격 및 기질 (${gender} 특성 반영)
[${gender}의 관점에서 성격, 기질, 장단점 분석]

### 💼 직업 및 사업운 (${gender} 맞춤)
[${gender}에게 적합한 직업, 사업 방향, 성공 포인트]

### 💕 연애 및 결혼운 (${gender} 전용)
[${gender}의 연애 패턴, 이상형, 결혼 시기와 상대방 특징]

### 💰 재물운 (${gender} 관점)
[${gender}의 재물 획득 방식, 투자 성향, 주의사항]

### 🏥 건강운
[체질, 주의해야 할 건강 문제, 건강 관리법]

### 🔮 2025년 운세
[올해 전반적 운세, 월별 주요 포인트, 주의사항]

### ✨ 개운법 및 조언
[${gender}에게 맞는 개운 방법, 실천 가능한 조언]

전문가 수준의 구체적이고 실용적인 분석을 부탁드립니다.
`;
}

// 대체 분석 (Gemini AI 오류시)
function getFallbackAnalysis(birthData) {
    const gender = birthData.gender === 'male' ? '남성' : '여성';
    const zodiac = getZodiacAnimal(birthData.year);
    
    return `
### 🎯 ${gender} 맞춤 사주 분석

**기본 정보**
- 성별: ${gender}
- 생년: ${birthData.year}년 (${zodiac}띠)
- 생월일: ${birthData.month}월 ${birthData.day}일

### 🌟 성격 및 기질
${gender === '남성' ? 
`남성으로서 강인한 의지력과 책임감을 가지고 있습니다. 목표 지향적이며 리더십이 뛰어납니다.` :
`여성으로서 섬세함과 직감력이 뛰어납니다. 배려심이 깊고 조화를 중시합니다.`}

### 💼 직업운
${gender === '남성' ?
`관리직, 기술직, 사업 분야에서 성공 가능성이 높습니다.` :
`교육, 서비스, 창작 분야에서 재능을 발휘할 수 있습니다.`}

### 💕 연애운
${gender === '남성' ?
`진실한 사랑을 추구하며, 가정적인 여성과 좋은 인연을 맺을 수 있습니다.` :
`따뜻하고 신뢰할 수 있는 남성과의 만남이 기다리고 있습니다.`}

### 💰 재물운
꾸준한 노력을 통해 안정적인 재물을 축적할 수 있습니다. 투자보다는 저축을 권합니다.

### 🏥 건강운
전반적으로 건강하나, 스트레스 관리와 규칙적인 생활이 중요합니다.

### 🔮 2025년 운세
새로운 기회가 찾아오는 해입니다. 적극적인 자세로 도전하시기 바랍니다.

### ✨ 개운법
- ${gender === '남성' ? '파란색, 검은색 계열 활용' : '분홍색, 흰색 계열 활용'}
- 규칙적인 운동과 독서
- 긍정적인 마음가짐 유지

*AI 서비스 일시 불가로 기본 분석을 제공했습니다. 더 상세한 분석을 원하시면 잠시 후 다시 시도해주세요.*
`;
}

// 띠 동물 계산
function getZodiacAnimal(year) {
    const animals = ['원숭이', '닭', '개', '돼지', '쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양'];
    return animals[year % 12];
}
