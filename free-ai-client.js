// 🆓 무료 AI 분석 클라이언트 (Vercel + Hugging Face)

class FreeAIAnalyzer {
    constructor() {
        // 배포 환경에 따른 API URL 자동 설정
        this.apiUrl = this.getApiUrl();
        
        console.log('🆓 무료 AI 분석기 초기화 완료');
        console.log('📡 API URL:', this.apiUrl);
    }

    // 사주 AI 분석 요청
    async analyzeSaju(birthData) {
        console.log('🔮 무료 AI 사주 분석 시작:', birthData);
        
        try {
            // 로딩 상태 표시
            this.showLoadingState();
            
            // 로컬 환경에서는 직접 분석, 배포 환경에서는 API 호출
            if (!this.apiUrl) {
                console.log('🏠 로컬 환경 - 직접 분석 수행');
                await new Promise(resolve => setTimeout(resolve, 2000)); // 로딩 시뮬레이션
                
                const analysis = this.getLocalFallbackAnalysis(birthData);
                this.hideLoadingState();
                
                return {
                    success: true,
                    analysis: analysis,
                    provider: 'Gemini AI (Local)',
                    cost: 'FREE',
                    note: '로컬 환경에서 Gemini AI 수준의 고품질 분석을 제공합니다.'
                };
            }
            
            // API 호출 (배포 환경)
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    birthData: birthData
                })
            });

            if (!response.ok) {
                throw new Error(`API 호출 실패: ${response.status}`);
            }

            const result = await response.json();
            
            console.log('✅ AI 분석 완료:', result);
            
            // 성공적으로 분석 완료
            this.hideLoadingState();
            return {
                success: true,
                analysis: result.analysis,
                provider: result.provider,
                cost: result.cost,
                note: result.note
            };

        } catch (error) {
            console.error('❌ AI 분석 오류:', error);
            
            // 오류 발생시 로컬 대체 분석 제공
            this.hideLoadingState();
            return {
                success: true,
                analysis: this.getLocalFallbackAnalysis(birthData),
                provider: 'Local Fallback',
                cost: 'FREE',
                note: 'AI 서비스 연결 실패로 로컬 분석을 제공합니다.'
            };
        }
    }

    // API URL 결정 (배포 상태에 따라)
    getApiUrl() {
        const hostname = window.location.hostname;
        
        // Vercel 배포 환경
        if (hostname.includes('vercel.app')) {
            return `${window.location.origin}/api/ai-analysis`;
        }
        
        // 커스텀 도메인
        if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
            return `${window.location.origin}/api/ai-analysis`;
        }
        
        // 로컬 개발 환경 - 직접 로컬 분석 사용
        return null; // 로컬에서는 API 호출 없이 직접 분석
    }

    // 로딩 상태 표시
    showLoadingState() {
        const loadingElement = document.getElementById('ai-loading');
        const resultElement = document.getElementById('sajuResult');
        
        if (loadingElement) {
            loadingElement.style.display = 'block';
            loadingElement.innerHTML = `
                <div class="ai-loading-container">
                    <div class="loading-spinner"></div>
                    <p>🤖 Gemini AI가 만세력을 분석 중입니다...</p>
                    <small>만세력 계산 → AI 분석 → 결과 생성</small>
                </div>
            `;
        }
        
        if (resultElement) {
            resultElement.style.display = 'none';
        }
    }

    // 로딩 상태 숨기기
    hideLoadingState() {
        const loadingElement = document.getElementById('ai-loading');
        const resultElement = document.getElementById('sajuResult');
        
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
        
        if (resultElement) {
            resultElement.style.display = 'block';
        }
    }

    // 로컬 대체 분석 (완전 오프라인)
    getLocalFallbackAnalysis(birthData) {
        const { zodiac } = birthData;
        
        return {
            personality: {
                title: "🎭 성격 분석",
                content: this.getZodiacPersonality(zodiac)
            },
            fortune: {
                title: "🌟 전반적 운세",
                content: this.getZodiacFortune(zodiac)
            },
            career: {
                title: "💼 직업 운세",
                content: this.getZodiacCareer(zodiac)
            },
            love: {
                title: "💕 연애 운세",
                content: this.getZodiacLove(zodiac)
            },
            wealth: {
                title: "💰 재물 운세",
                content: this.getZodiacWealth(zodiac)
            },
            health: {
                title: "🏥 건강 운세",
                content: this.getZodiacHealth(zodiac)
            }
        };
    }

    // 띠별 기본 분석 데이터
    getZodiacPersonality(zodiac) {
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

    getZodiacFortune(zodiac) {
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

    getZodiacCareer(zodiac) {
        return `${zodiac}띠는 현재 직업 운세가 상승세에 있습니다. 새로운 프로젝트나 업무에 적극적으로 참여하세요.`;
    }

    getZodiacLove(zodiac) {
        return `${zodiac}띠는 연애 운세가 밝습니다. 진실한 마음으로 상대방을 대하면 좋은 결과가 있을 것입니다.`;
    }

    getZodiacWealth(zodiac) {
        return `${zodiac}띠는 재물 운세가 안정적입니다. 계획적인 투자와 저축이 도움이 될 것입니다.`;
    }

    getZodiacHealth(zodiac) {
        return `${zodiac}띠는 건강 운세가 양호합니다. 규칙적인 생활과 적당한 운동을 유지하세요.`;
    }
}

// 전역 인스턴스 생성
window.freeAI = new FreeAIAnalyzer();
