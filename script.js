// 전역 변수
let currentBirthData = null;

// 스크립트 로딩 확인
console.log('📜 script.js 로드 시작');
console.log('🔍 geminiAnalyzer 초기 상태:', !!window.geminiAnalyzer);

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ 메인 페이지 script.js 로드 완료");
  console.log('🔍 DOMContentLoaded 시점 geminiAnalyzer 상태:', !!window.geminiAnalyzer);

  // 1초 후 다시 확인 (defer 스크립트 로딩 대기)
  setTimeout(() => {
    console.log('🔍 1초 후 geminiAnalyzer 상태:', !!window.geminiAnalyzer);
  }, 1000);

  // 1) 메인 슬라이더 기능
  initSlider();
  
  // 2) 성별 선택 이벤트 리스너 추가
  document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const selectedGender = this.value;
      const genderText = selectedGender === 'male' ? '남성' : '여성';
      console.log(`👤 성별 선택: ${genderText}`);
      
      // 선택된 성별에 따른 시각적 피드백
      document.querySelectorAll('.radio-custom').forEach(custom => {
        custom.style.transform = 'scale(1)';
      });
      
      this.nextElementSibling.style.transform = 'scale(1.05)';
      
      // 성별 선택 완료 메시지
      const helpText = document.querySelector('.form-help');
      if (helpText) {
        helpText.textContent = `✅ ${genderText} 선택 완료 - ${genderText} 맞춤 사주 분석이 제공됩니다`;
        helpText.style.color = 'var(--primary-color)';
        helpText.style.fontWeight = '600';
      }
    });
  });
  
  // 2) 사주 입력 폼 기능
  initSajuForm();

  // 3) 결과 탭 기능
  initResultTabs();

  function initSlider() {
    const slideWrapper = document.querySelector(".main-slider-wrapper");
    const slides = document.querySelectorAll(".main-slide");
    const prevBtn = document.getElementById("prevSlide");
    const nextBtn = document.getElementById("nextSlide");

    if (!slideWrapper || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let isSliding = false;
    let autoSlideInterval = null;

    // 슬라이드 초기 설정
    slideWrapper.style.width = `${100 * totalSlides}%`;

    // 슬라이드 변경 함수
    function changeSlide(direction) {
      if (isSliding) return;
      isSliding = true;

      currentIndex += direction;
      if (currentIndex >= totalSlides) currentIndex = 0;
      if (currentIndex < 0) currentIndex = totalSlides - 1;

      const translateX = -currentIndex * (100 / totalSlides);
      slideWrapper.style.transform = `translateX(${translateX}%)`;

      setTimeout(() => {
        isSliding = false;
      }, 800);
    }

    // 버튼 이벤트
    if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));

    // 자동 슬라이드
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => changeSlide(1), 5000);
    }

    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    }

    // 자동 슬라이드 시작
    startAutoSlide();

    // 마우스 호버 시 자동 슬라이드 멈춤
    const sliderContainer = document.querySelector(".main-slider-container");
    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", stopAutoSlide);
      sliderContainer.addEventListener("mouseleave", startAutoSlide);
    }

    console.log("🎠 슬라이더 초기화 완료");
  }

  function initSajuForm() {
    const sajuForm = document.getElementById("sajuForm");
    const timeUnknownCheckbox = document.getElementById("timeUnknown");
    const birthTimeInput = document.getElementById("birthTime");

    if (!sajuForm) {
      console.log("⚠️ 사주 폼을 찾을 수 없습니다.");
      return;
    }

    // 시간 모름 체크박스 처리
    if (timeUnknownCheckbox && birthTimeInput) {
      timeUnknownCheckbox.addEventListener("change", function() {
        if (this.checked) {
          birthTimeInput.disabled = true;
          birthTimeInput.value = "";
          birthTimeInput.style.opacity = "0.5";
        } else {
          birthTimeInput.disabled = false;
          birthTimeInput.style.opacity = "1";
        }
      });
    }

    // 폼 제출 처리
    sajuForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      console.log("🔮 사주 폼 제출 시작");
      
      const gender = document.querySelector('input[name="gender"]:checked')?.value;
      const birthDate = document.getElementById("birthDate").value;
      const birthTime = document.getElementById("birthTime").value;
      const timeUnknown = document.getElementById("timeUnknown").checked;
      
      // 입력 검증
      if (!gender) {
        alert("⚠️ 성별을 선택해주세요.\n성별에 따라 사주 해석이 달라집니다.");
        document.querySelector('.gender-selection').scrollIntoView({ behavior: 'smooth' });
        return;
      }
      
      if (!birthDate) {
        alert("생년월일을 입력해주세요.");
        return;
      }
      
      console.log("📅 입력 데이터:", { gender, birthDate, birthTime, timeUnknown });
      
      // 전역 변수에 저장 (AI 분석용 데이터 포함)
      const birthDateObj = new Date(birthDate);
      const birthYear = birthDateObj.getFullYear();
      const birthMonth = birthDateObj.getMonth() + 1;
      const birthDay = birthDateObj.getDate();
      const birthHour = timeUnknown ? 12 : (birthTime ? parseInt(birthTime.split(':')[0]) : 12);
      const zodiacAnimal = getZodiacAnimal(birthYear);
      
      currentBirthData = {
        gender: gender,
        birthDate: birthDate,
        birthTime: timeUnknown ? "" : (birthTime || ""),
        timeUnknown: timeUnknown,
        // AI 분석용 데이터 추가
        year: birthYear,
        month: birthMonth,
        day: birthDay,
        hour: birthHour,
        zodiac: zodiacAnimal,
        fourPillars: {} // 사주 정보는 나중에 계산
      };
      
      console.log("🔍 AI 분석용 데이터:", currentBirthData);
      
      // 결과 표시
      showResults();
    });

    console.log("📝 사주 폼 초기화 완료");
  }

  function showResults() {
    const resultContainer = document.getElementById("resultContainer");
    if (resultContainer) {
      resultContainer.classList.remove("hidden");
      resultContainer.scrollIntoView({ behavior: 'smooth' });
      
      // 기본적으로 띠 분석 표시
      showZodiacAnalysis();
    }
  }

  function initResultTabs() {
    const tabButtons = document.querySelectorAll(".result-btn");
    
    tabButtons.forEach(button => {
      button.addEventListener("click", function() {
        // 모든 버튼에서 active 클래스 제거
        tabButtons.forEach(btn => btn.classList.remove("active"));
        // 클릭된 버튼에 active 클래스 추가
        this.classList.add("active");
        
        // 모든 섹션 숨기기
        document.querySelectorAll(".result-section").forEach(section => {
          section.classList.add("hidden");
        });
        
        // 해당 섹션 표시
        const buttonId = this.id;
        switch(buttonId) {
          case "showZodiac":
            showZodiacAnalysis();
            break;
          case "showFiveElements":
            showFiveElementsAnalysis();
            break;
          case "showCalendar":
            showCalendarAnalysis();
            break;
          case "showSaju":
            showSajuAnalysis();
            break;
        }
      });
    });
  }

  function showZodiacAnalysis() {
    if (!currentBirthData) return;
    
    const section = document.getElementById("zodiacSection");
    const result = document.getElementById("zodiacResult");
    
    section.classList.remove("hidden");
    
    const birthYear = new Date(currentBirthData.birthDate).getFullYear();
    const zodiacAnimal = getZodiacAnimal(birthYear);
    const zodiacInfo = getZodiacInfo(zodiacAnimal);
    
    result.innerHTML = `
      <div class="zodiac-card">
        <div class="zodiac-image">
          <img src="${zodiacInfo.이미지}" alt="${zodiacAnimal}띠" onerror="this.style.display='none'">
        </div>
        <div class="zodiac-info">
          <h4>🐭 당신의 띠: ${zodiacAnimal}띠 (${birthYear}년생)</h4>
          <div class="zodiac-description">
            ${zodiacInfo.특징}
          </div>
          <div class="zodiac-compatibility">
            ${zodiacInfo.궁합}
          </div>
        </div>
      </div>
    `;
  }

  function showFiveElementsAnalysis() {
    if (!currentBirthData) return;
    
    const section = document.getElementById("fiveElementsSection");
    const result = document.getElementById("fiveElementsResult");
    
    section.classList.remove("hidden");
    
    const birthYear = new Date(currentBirthData.birthDate).getFullYear();
    const fiveElement = getFiveElement(birthYear);
    const gender = currentBirthData.gender;
    
    result.innerHTML = `
      <div class="five-elements-card">
        <h4>🌟 당신의 오행: ${fiveElement} (${gender === 'male' ? '남성' : '여성'})</h4>
        <div class="five-elements-description">
          ${getFiveElementDescriptionByGender(fiveElement, gender)}
        </div>
      </div>
    `;
  }

  function showCalendarAnalysis() {
    if (!currentBirthData) return;
    
    const section = document.getElementById("calendarSection");
    const result = document.getElementById("calendarResult");
    
    section.classList.remove("hidden");
    
    const birthDate = new Date(currentBirthData.birthDate);
    const calendarInfo = getCalendarInfo(birthDate, currentBirthData.birthTime, currentBirthData.gender);
    
    result.innerHTML = `
      <div class="calendar-card">
        <h4>📅 만세력 정보</h4>
        <div class="calendar-info">
          ${calendarInfo}
        </div>
      </div>
    `;
  }

  function showSajuAnalysis() {
    if (!currentBirthData) return;
    
    const section = document.getElementById("sajuSection");
    const result = document.getElementById("sajuResult");
    
    section.classList.remove("hidden");
    
    result.innerHTML = `
      <div class="saju-card">
        <h4>🤖 AI 사주풀이</h4>
        <div class="loading">AI가 사주를 분석 중입니다...</div>
      </div>
    `;
    
    // AI 분석 요청
    console.log('🔍 AI 분석 요청 시작');
    console.log('🔍 freeAI 상태:', !!window.freeAI);
    console.log('🔍 simpleAITest 상태:', !!window.simpleAITest);
    
    // 🆓 무료 AI 분석기 우선 사용
    if (window.freeAI) {
      console.log('✅ 무료 AI 분석기 사용 - Vercel + Hugging Face');
      generateFreeAIAnalysis(currentBirthData);
    } else if (window.simpleAITest) {
      console.log('⚠️ 간단 AI 테스트 함수 사용');
      generateSimpleAIAnalysis(currentBirthData);
    } else {
      console.warn('❌ AI 분석기가 로드되지 않았습니다.');
      const result = document.getElementById("sajuResult");
      if (result) {
        result.innerHTML = `
          <div class="saju-card">
            <h4>🤖 AI 사주풀이</h4>
            <div class="error">AI 서비스 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.</div>
          </div>
        `;
      }
    }
  }

  // 🆓 무료 AI 분석 함수 (Vercel + Hugging Face)
  async function generateFreeAIAnalysis(birthData) {
    console.log('🆓 무료 AI 분석 시작, birthData:', birthData);
    
    const result = document.getElementById("sajuResult");
    if (!result) {
      console.error('❌ sajuResult 엘리먼트를 찾을 수 없음');
      return;
    }

    try {
      console.log('🔄 무료 AI 분석 요청 중...');
      
      // 무료 AI 분석 요청
      const analysisResult = await window.freeAI.analyzeSaju(birthData);
      
      console.log('📊 무료 AI 분석 결과 받음:', analysisResult);
      
      if (analysisResult.success && analysisResult.analysis) {
        // 성공적으로 분석 완료
        displayAIAnalysisResult(analysisResult.analysis, analysisResult.provider, analysisResult.cost, analysisResult.note);
      } else {
        throw new Error('AI 분석 결과가 없습니다.');
      }
      
    } catch (error) {
      console.error('❌ 무료 AI 분석 오류:', error);
      
      // 오류 발생시 기본 분석 표시
      result.innerHTML = `
        <div class="saju-card">
          <h4>🤖 AI 사주풀이</h4>
          <div class="error">
            AI 분석 중 오류가 발생했습니다.<br>
            잠시 후 다시 시도해주세요.
          </div>
        </div>
      `;
    }
  }

  // AI 분석 결과 표시 함수 (업데이트된 버전)
  function displayAIAnalysisResult(analysis, provider, cost, note) {
    const result = document.getElementById("sajuResult");
    if (!result) return;

    let html = `
      <div class="saju-card">
        <div class="analysis-quality">
          🤖 Gemini AI 만세력 분석
          <span class="quality-badge">AI + 만세력</span>
        </div>
        
        <div class="ai-info">
          <small>🔋 ${provider} | 💰 ${cost}</small>
          ${note ? `<br><small>ℹ️ ${note}</small>` : ''}
        </div>
    `;

    // 각 카테고리별 분석 결과 표시 (마크다운 스타일 지원)
    const categories = ['personality', 'fortune', 'career', 'love', 'wealth', 'health'];
    
    categories.forEach(category => {
      if (analysis[category]) {
        html += `
          <div class="analysis-section">
            <h5>${analysis[category].title}</h5>
            <div class="content">${formatAnalysisContent(analysis[category].content)}</div>
          </div>
        `;
      }
    });

    html += `
        <div class="ai-footer">
          <small>🤖 Gemini AI 기반 만세력 분석 결과는 참고용입니다. 실제 전문가 상담을 권장합니다.</small>
        </div>
      </div>
    `;

    result.innerHTML = html;
    console.log('✅ 고급 AI 분석 결과 표시 완료');
  }

  // 분석 내용 포맷팅 함수 (마크다운 스타일 지원)
  function formatAnalysisContent(content) {
    if (!content) return '';
    
    // 마크다운 스타일 변환
    let formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // **굵게**
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // *기울임*
      .replace(/^### (.*$)/gm, '<h4>$1</h4>') // ### 제목
      .replace(/^## (.*$)/gm, '<h3>$1</h3>') // ## 제목
      .replace(/^# (.*$)/gm, '<h2>$1</h2>') // # 제목
      .replace(/^• (.*$)/gm, '<li>$1</li>') // • 리스트
      .replace(/\n\n/g, '</p><p>') // 단락 구분
      .replace(/\n/g, '<br>'); // 줄바꿈
    
    // 리스트 태그로 감싸기
    formatted = formatted.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    
    // 단락 태그로 감싸기
    if (!formatted.startsWith('<h') && !formatted.startsWith('<ul')) {
      formatted = '<p>' + formatted + '</p>';
    }
    
    return formatted;
  }

  // 간단한 AI 분석 함수 (테스트용)
  async function generateSimpleAIAnalysis(birthData) {
    console.log('🧪 간단 AI 분석 시작, birthData:', birthData);
    
    const result = document.getElementById("sajuResult");
    if (!result) {
      console.error('❌ sajuResult 엘리먼트를 찾을 수 없음');
      return;
    }

    try {
      console.log('🔄 로딩 표시 중...');
      
      // 로딩 상태 표시
      result.innerHTML = `
        <div class="saju-card">
          <h4>🤖 AI 사주풀이</h4>
          <div class="loading">
            <div class="spinner"></div>
            AI가 사주를 분석 중입니다...
          </div>
        </div>
      `;

      console.log('🔄 간단 AI 분석 요청 중...');
      
      // 간단 AI 분석 요청
      const analysisResult = await window.simpleAITest(birthData);
      
      console.log('📊 간단 AI 분석 결과 받음:', analysisResult);
      
      // 결과 표시
      result.innerHTML = `
        <div class="saju-card">
          <h4>🤖 AI 사주풀이</h4>
          <div class="fallback-analysis">
            ${analysisResult.fallback.replace(/\n/g, '<br>')}
          </div>
        </div>
      `;
      
      console.log('✅ 간단 AI 분석 완료');
      
    } catch (error) {
      console.error('❌ 간단 AI 분석 오류:', error);
      result.innerHTML = `
        <div class="saju-card">
          <h4>🤖 AI 사주풀이</h4>
          <div class="error">
            AI 분석 중 오류가 발생했습니다.<br>
            에러: ${error.message}<br>
            잠시 후 다시 시도해주세요.
          </div>
        </div>
      `;
    }
  }

  // AI 사주 분석 함수
  async function generateSajuAnalysis(birthData) {
    console.log('🤖 generateSajuAnalysis 함수 시작');
    console.log('📊 받은 birthData:', birthData);
    
    const result = document.getElementById("sajuResult");
    if (!result) {
      console.error('❌ sajuResult 엘리먼트를 찾을 수 없음');
      return;
    }

    // birthData 유효성 검사
    if (!birthData || !birthData.year || !birthData.zodiac) {
      console.error('❌ birthData가 유효하지 않음:', birthData);
      result.innerHTML = `
        <div class="saju-card">
          <h4>🤖 AI 사주풀이</h4>
          <div class="error">
            생년월일 정보가 올바르지 않습니다.<br>
            다시 입력해주세요.
          </div>
        </div>
      `;
      return;
    }

    try {
      console.log('🤖 AI 사주 분석 시작...');
      
      // 로딩 상태 표시
      result.innerHTML = `
        <div class="saju-card">
          <h4>🤖 AI 사주풀이</h4>
          <div class="loading">
            <div class="spinner"></div>
            AI가 사주를 분석 중입니다...
          </div>
        </div>
      `;

      console.log('🔄 AI 분석 요청 중...');
      console.log('📅 분석할 데이터:', {
        year: birthData.year,
        month: birthData.month,
        day: birthData.day,
        hour: birthData.hour,
        zodiac: birthData.zodiac
      });
      
      // AI 분석 요청
      const analysisResult = await window.geminiAnalyzer.analyzeSaju(birthData);
      
      console.log('📊 AI 분석 결과 받음:', analysisResult);
      
      if (analysisResult.success) {
        console.log('✅ AI 분석 성공');
        // 성공적으로 AI 분석 완료
        result.innerHTML = `
          <div class="saju-card">
            <h4>🤖 AI 사주풀이</h4>
            <div class="ai-analysis">
              ${analysisResult.analysis.replace(/\n/g, '<br>')}
            </div>
          </div>
        `;
      } else {
        console.log('⚠️ AI 분석 실패, 대체 분석 사용');
        // AI 분석 실패 시 대체 분석 표시
        result.innerHTML = `
          <div class="saju-card">
            <h4>🤖 AI 사주풀이</h4>
            <div class="fallback-analysis">
              ${analysisResult.fallback.replace(/\n/g, '<br>')}
            </div>
          </div>
        `;
      }
      
    } catch (error) {
      console.error('❌ AI 분석 오류:', error);
      result.innerHTML = `
        <div class="saju-card">
          <h4>🤖 AI 사주풀이</h4>
          <div class="error">
            AI 분석 중 오류가 발생했습니다.<br>
            에러: ${error.message}<br>
            잠시 후 다시 시도해주세요.
          </div>
        </div>
      `;
    }
  }
});
