# 🔮 Korean Fortune AI - 한국 사주 AI 서비스

세계 최초의 성별 맞춤 AI 사주 분석 서비스입니다.

## ✨ 주요 기능

### 🎯 **성별 맞춤 사주 분석**
- 👨 남성 / 👩 여성 전용 해석
- 십신 분석의 성별별 의미 완전 분리
- 30년 경력 전문가 수준의 상세 분석

### 🤖 **AI 기반 분석**
- Google Gemini AI 활용
- 만세력 기반 정확한 계산
- 실시간 상세 분석 (3-5초)

### 📱 **현대적 UI/UX**
- 반응형 웹 디자인
- 직관적인 사용자 인터페이스
- 모바일 최적화

## 🚀 **설치 및 설정**

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd korean-fortune-ai
```

### 2. 환경 변수 설정
```bash
# .env.example을 복사하여 .env 파일 생성
cp .env.example .env

# .env 파일을 편집하여 실제 API 키 입력
# GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Google Gemini API 키 발급
1. [Google AI Studio](https://makersuite.google.com/app/apikey) 방문
2. API 키 생성
3. `.env` 파일에 키 입력

### 4. 로컬 개발 서버 실행
```bash
# Python 서버 사용
python3 -m http.server 8000

# 또는 Node.js 서버 사용
npm start
```

## 🌐 **배포**

### Cloudflare Pages 배포
1. Cloudflare Pages에 프로젝트 연결
2. 환경 변수 설정:
   - `GEMINI_API_KEY`: Google Gemini API 키
   - `ENVIRONMENT`: production
3. 자동 배포 완료

### 환경 변수 설정 (중요!)
- **로컬 개발**: `.env` 파일 사용
- **Cloudflare Pages**: 대시보드에서 환경 변수 설정
- **보안**: API 키를 소스코드에 직접 입력하지 마세요!

## 💰 **비용**
- **호스팅**: 완전 무료 (Cloudflare Pages)
- **AI API**: 월 15회 무료, 초과시 저렴 (Google Gemini)
- **총 비용**: 월 $0-5 (거의 무료)

## 🚀 **기술 스택**

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- 반응형 웹 디자인
- 모던 UI/UX 패턴

### Backend
- Cloudflare Pages Functions
- Google Gemini AI API
- 만세력 계산 엔진

## 📊 **특별한 성취**

### 🏆 **세계 최초**
- 성별을 완벽하게 반영한 AI 사주 분석
- 남녀별 십신 해석 완전 분리
- 성별 맞춤 오행/만세력 분석

### 🎯 **전문가 수준**
- 30년 경력 역술가 수준의 분석 품질
- 실제 사주학 이론 기반
- 구체적이고 실용적인 조언

## 🔧 **개발 정보**

### 파일 구조
```
korean-fortune-ai/
├── index.html                    # 메인 페이지
├── style.css                     # 스타일시트
├── script.js                     # 메인 JavaScript
├── saju-functions.js             # 사주 계산 함수
├── advanced-saju-engine.js       # 고급 사주 엔진
├── detailed-analysis-generator.js # 상세 분석 생성기
├── free-ai-client.js            # AI 클라이언트
├── functions/
│   └── api/
│       └── ai-analysis.js        # Cloudflare Function
├── assets/
│   └── images/                   # 이미지 파일들
├── _headers                      # Cloudflare 헤더 설정
├── _redirects                    # 리다이렉트 설정
├── wrangler.toml                # Cloudflare 설정
├── .env.example                 # 환경 변수 예시
└── .gitignore                   # Git 제외 파일
```

## 📈 **사용법**

1. 성별 선택 (👨 남성 / 👩 여성)
2. 생년월일시 정확히 입력
3. "AI 사주 분석 시작하기" 클릭
4. 3-5초 후 성별 맞춤 전문가 수준 분석 확인

## 🔒 **보안 주의사항**

- API 키를 소스코드에 직접 입력하지 마세요
- `.env` 파일은 Git에 커밋하지 마세요
- 환경 변수를 통해 안전하게 관리하세요

## 🐛 **문제 해결**

### API 키 관련 오류
```
❌ GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.
```
- `.env` 파일에 올바른 API 키가 설정되었는지 확인
- Cloudflare Pages 환경 변수 설정 확인

### 로컬 서버 실행 오류
- Python 3가 설치되어 있는지 확인
- 포트 8000이 사용 중인지 확인

---

**🔥 세계 최고 수준의 성별 맞춤 AI 사주 분석 서비스 🔥**

*Made with ❤️ for accurate Korean fortune telling*
