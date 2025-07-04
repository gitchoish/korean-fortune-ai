// 띠 배열: 0~11 인덱스가 "원숭이, 닭, 개..." 순서
const zodiacAnimals = [
  "원숭이", "닭", "개", "돼지",
  "쥐", "소", "호랑이", "토끼",
  "용", "뱀", "말", "양"
];

// 생년을 기준으로 띠를 계산하는 함수
function getZodiacAnimal(year) {
  const index = year % 12;
  return zodiacAnimals[index];
}

// 띠별 특징 데이터
const zodiacDescriptions = {
  "쥐": {
    "특징": "✅ **쥐띠 특징**<br>쥐띠는 영리하고 재치 있으며 뛰어난 적응력을 가졌습니다. 빠른 상황 판단과 기민한 행동으로 기회를 포착하는 능력이 뛰어나며, 사업 감각도 좋아 경제적으로 성공할 가능성이 높습니다. 그러나 지나치게 현실적이고 계산적인 모습이 보일 수 있어 감정적인 소통이 필요합니다.",
    "궁합": "💖 잘 맞는 띠: 용띠, 원숭이띠<br>쥐띠와 용띠는 지혜와 추진력이 조화를 이루며 함께 성장할 수 있습니다. 원숭이띠와도 재치 있는 성향이 맞아 서로를 즐겁게 해 주는 궁합입니다.<br><br>❌ 궁합이 나쁜 띠: 말띠<br>계획적인 쥐띠와 즉흥적인 말띠는 성향이 정반대라 갈등이 잦습니다.",
    "이미지": "assets/images/rat.png"
  },
  "소": {
    "특징": "✅ **소띠 특징**<br>소띠는 성실하고 근면한 성격으로 꾸준한 노력을 통해 목표를 이루는 끈기를 가지고 있습니다. 그러나 보수적인 면이 강해 새로운 도전에 소극적일 수 있습니다. 감정보다는 이성을 중시하며 신뢰를 중요하게 생각하는 타입입니다.",
    "궁합": "💖 잘 맞는 띠: 뱀띠, 닭띠<br>소띠와 뱀띠는 신뢰를 바탕으로 안정적인 관계를 형성하며, 닭띠와는 현실적인 사고방식이 잘 맞아 함께하면 큰 성취를 이룰 수 있습니다.<br><br>❌ 궁합이 나쁜 띠: 양띠<br>소띠는 현실적이고 강직한 반면, 양띠는 감성적이고 변화를 추구하는 성향이 있어 맞추기 어렵습니다.",
    "이미지": "assets/images/ox.png"
  },
  "호랑이": {
    "특징": "✅ **호랑이띠 특징**<br>호랑이띠는 용맹하고 도전 정신이 강한 성격을 지니고 있습니다. 리더십이 강하고 독립적인 기질이 있으며 목표를 향해 돌진하는 타입입니다. 하지만 성급한 결정을 내리는 경우가 많아 신중함이 필요합니다.",
    "궁합": "💖 잘 맞는 띠: 말띠, 개띠<br>호랑이띠와 말띠는 도전적인 성향이 비슷해 함께 하면 시너지 효과를 낼 수 있습니다. 개띠와도 신뢰를 바탕으로 깊은 관계를 유지할 수 있습니다.<br><br>❌ 궁합이 나쁜 띠: 원숭이띠<br>직선적인 호랑이띠와 변칙적인 원숭이띠는 갈등이 발생할 가능성이 큽니다.",
    "이미지": "assets/images/tiger.png"
  },
  "토끼": {
    "특징": "✅ **토끼띠 특징**<br>토끼띠는 온순하고 부드러운 성격으로 타인과의 관계를 중시하는 사교적인 사람입니다. 감성이 풍부하고 배려심이 깊어 주변 사람들에게 인기가 많지만, 때로는 소극적이고 결단력이 부족할 수 있습니다.",
    "궁합": "💖 잘 맞는 띠: 양띠, 돼지띠<br>토끼띠와 양띠는 감성이 풍부하고 배려심이 많아 서로를 이해하고 존중하는 관계를 형성할 수 있습니다. 돼지띠와도 조화로운 성향이 잘 맞아 편안한 관계를 유지할 수 있습니다.<br><br>❌ 궁합이 나쁜 띠: 닭띠<br>토끼띠는 평화를 중요하게 여기지만, 닭띠는 논리적이고 직설적인 성향이 강하여 토끼띠가 부담감을 느낄 수 있습니다.",
    "이미지": "assets/images/rabbit.png"
  },
  "용": {
    "특징": "✅ **용띠 특징**<br>용띠는 강한 자신감과 카리스마를 가지고 있으며, 추진력이 뛰어난 리더 유형입니다. 독창성과 창의력이 뛰어나고 완벽주의적인 경향이 있어 목표를 이루기 위해 노력합니다. 하지만 독단적인 면이 있어 갈등을 유발할 가능성이 있습니다.",
    "궁합": "💖 잘 맞는 띠: 쥐띠, 원숭이띠<br>용띠와 쥐띠는 서로의 강점을 극대화하며 함께 성장할 수 있는 관계입니다. 원숭이띠와도 창의적이고 진취적인 성향이 비슷해 협력할 때 좋은 성과를 낼 수 있습니다.<br><br>❌ 궁합이 나쁜 띠: 개띠<br>용띠와 개띠는 성격 차이가 커 서로의 방식을 이해하기 어려운 경우가 많습니다.",
    "이미지": "assets/images/dragon.png"
  },
  "뱀": {
    "특징": "✅ **뱀띠 특징**<br>뱀띠는 지혜롭고 신중하며 통찰력이 뛰어난 성격을 가지고 있습니다. 논리적이고 계획적인 사고를 지니고 있으며, 기회를 잘 포착하는 능력이 우수합니다. 하지만 지나치게 신중하여 기회를 놓칠 수도 있습니다.",
    "궁합": "💖 잘 맞는 띠: 소띠, 닭띠<br>뱀띠와 소띠는 신뢰를 바탕으로 안정적인 관계를 유지하며, 닭띠와도 계획적인 성향이 잘 맞아 함께 성장하기 좋은 관계입니다.<br><br>❌ 궁합이 나쁜 띠: 돼지띠<br>뱀띠는 신중하고 분석적인 성향이 강한 반면, 돼지띠는 낙천적이고 감성적인 성향이 강해 서로 맞추기가 어렵습니다.",
    "이미지": "assets/images/snake.png"
  },
  "말": {
    "특징": "✅ **말띠 특징**<br>말띠는 활발하고 낙천적인 성격으로, 도전 정신이 강한 사람입니다. 자유로운 것을 좋아하고 대인관계가 좋은 편이지만, 즉흥적인 성향이 강해 끈기가 부족할 수 있습니다.",
    "궁합": "💖 잘 맞는 띠: 호랑이띠, 개띠<br>말띠와 호랑이띠는 서로 모험을 즐기는 성향이 비슷해 함께 있으면 시너지 효과를 발휘할 수 있습니다. 개띠와도 성향이 잘 맞아 신뢰를 바탕으로 한 깊은 관계를 유지할 수 있습니다.<br><br>❌ 궁합이 나쁜 띠: 쥐띠<br>말띠와 쥐띠는 성격과 생활 방식이 정반대라 서로를 이해하는 것이 쉽지 않습니다.",
    "이미지": "assets/images/horse.png"
  },
  "양": {
    "특징": "✅ **양띠 특징**<br>양띠는 온화하고 배려심이 깊은 성격으로 감성이 풍부하며 창의력이 뛰어납니다. 사람들과 조화를 이루는 능력이 뛰어나지만 감정 기복이 심하고 쉽게 영향을 받는 경우가 있습니다.",
    "궁합": "💖 잘 맞는 띠: 토끼띠, 돼지띠<br>양띠와 토끼띠는 감성이 풍부하고 배려심이 많아 서로를 이해하는 데 어려움이 없습니다. 돼지띠와도 성향이 비슷하여 함께하면 편안한 관계를 유지할 수 있습니다.<br><br>❌ 궁합이 나쁜 띠: 소띠<br>양띠는 감성적인 반면, 소띠는 현실적이고 논리적이어서 서로를 이해하는 데 시간이 필요할 수 있습니다.",
    "이미지": "assets/images/goat.png"
  },
  "원숭이": {
    "특징": "✅ **원숭이띠 특징**<br>원숭이띠는 재치 있고 기발한 사고를 가진 성격으로, 변화에 빠르게 적응하는 능력이 뛰어납니다. 문제 해결 능력이 뛰어나며 유머 감각도 좋지만, 변덕스러운 성향이 있어 신뢰를 얻기가 쉽지 않을 수 있습니다.",
    "궁합": "💖 잘 맞는 띠: 쥐띠, 용띠<br>원숭이띠와 쥐띠는 재치 있고 유머 감각이 뛰어나 즐거운 관계를 유지할 수 있습니다. 용띠와도 서로의 추진력을 높여주는 좋은 조합입니다.<br><br>❌ 궁합이 나쁜 띠: 호랑이띠<br>원숭이띠는 전략적인 반면, 호랑이띠는 직선적이어서 충돌할 가능성이 큽니다.",
    "이미지": "assets/images/monkey.png"
  },
  "닭": {
    "특징": "✅ **닭띠 특징**<br>닭띠는 계획적이고 체계적인 사고를 하는 성격으로, 꼼꼼한 분석력과 실행력이 뛰어납니다. 하지만 완벽주의적인 성향이 강해 스트레스를 받는 경우가 많습니다.",
    "궁합": "💖 잘 맞는 띠: 소띠, 뱀띠<br>닭띠와 소띠는 현실적이고 논리적인 성향이 잘 맞아 안정적인 관계를 형성할 수 있습니다. 뱀띠와도 계획적이고 신중한 성향이 조화를 이룹니다.<br><br>❌ 궁합이 나쁜 띠: 토끼띠<br>닭띠는 직설적인 반면, 토끼띠는 부드럽고 조용한 성격이라 성향 차이가 클 수 있습니다.",
    "이미지": "assets/images/rooster.png"
  },
  "개": {
    "특징": "✅ **개띠 특징**<br>개띠는 성실하고 정직한 성격으로 신뢰를 중요하게 생각합니다. 타인을 돕는 것을 좋아하고 의리가 강하지만, 때때로 너무 원칙적이어서 융통성이 부족할 수 있습니다.",
    "궁합": "💖 잘 맞는 띠: 호랑이띠, 말띠<br>개띠와 호랑이띠는 서로 신뢰하며 우정을 바탕으로 깊은 관계를 유지할 수 있습니다. 말띠와도 성향이 잘 맞아 함께하면 긍정적인 에너지를 발산하며 발전하는 관계가 됩니다.<br><br>❌ 궁합이 나쁜 띠: 용띠<br>개띠는 정의로움을 중요하게 여기지만, 용띠는 자기중심적인 경향이 있어 충돌할 수 있습니다.",
    "이미지": "assets/images/dog.png"
  },
  "돼지": {
    "특징": "✅ **돼지띠 특징**<br>돼지띠는 낙천적이고 온순한 성격으로 사람들과 원만한 관계를 유지합니다. 여유롭고 포용력이 크지만, 가끔 우유부단한 면이 있을 수 있습니다.",
    "궁합": "💖 잘 맞는 띠: 토끼띠, 양띠<br>돼지띠와 토끼띠는 평화롭고 온화한 성향이 잘 맞아 조화로운 관계를 형성할 수 있습니다. 양띠와도 감성이 풍부하고 배려하는 마음이 커 서로를 이해하고 존중하는 편안한 관계가 가능합니다.<br><br>❌ 궁합이 나쁜 띠: 뱀띠<br>돼지띠는 감성적이고 둥글둥글한 성격이지만, 뱀띠는 신중하고 분석적인 성향이 강하여 서로를 이해하는 데 어려움이 따를 수 있습니다.",
    "이미지": "assets/images/pig.png"
  }
};

// 띠 정보 가져오기
function getZodiacInfo(animal) {
  return zodiacDescriptions[animal] || {
    "특징": "정보를 찾을 수 없습니다.",
    "궁합": "정보를 찾을 수 없습니다.",
    "이미지": "assets/images/default.png"
  };
}

// 오행 계산
function getFiveElement(year) {
  const elements = ["금", "수", "목", "화", "토"];
  const index = Math.floor((year % 10) / 2);
  return elements[index];
}

// 오행 설명
function getFiveElementDescription(element) {
  const descriptions = {
    "금": "🌟 **금(金)의 특성**<br>금은 견고함과 정의로움을 상징합니다. 의지가 강하고 원칙을 중시하며, 책임감이 강한 성격입니다.",
    "수": "🌟 **수(水)의 특성**<br>수는 유연함과 지혜를 상징합니다. 적응력이 뛰어나고 직관력이 좋으며, 포용력이 큰 성격입니다.",
    "목": "🌟 **목(木)의 특성**<br>목은 성장과 발전을 상징합니다. 창의적이고 진취적이며, 새로운 것을 추구하는 성격입니다.",
    "화": "🌟 **화(火)의 특성**<br>화는 열정과 활력을 상징합니다. 적극적이고 사교적이며, 리더십이 강한 성격입니다.",
    "토": "🌟 **토(土)의 특성**<br>토는 안정과 신뢰를 상징합니다. 성실하고 꾸준하며, 현실적인 사고를 하는 성격입니다."
  };
  return descriptions[element] || "정보를 찾을 수 없습니다.";
}

// 성별에 따른 오행 설명
function getFiveElementDescriptionByGender(element, gender) {
  const descriptions = {
    "금": {
      male: "🌟 **금(金)의 특성 - 남성**<br>금은 견고함과 정의로움을 상징합니다. 의지가 강하고 원칙을 중시하는 남성으로, 가정의 든든한 기둥 역할을 합니다. 책임감이 강하고 신뢰받는 성격으로, 리더십을 발휘할 때 빛을 발합니다.",
      female: "🌟 **금(金)의 특성 - 여성**<br>금은 견고함과 의지력을 상징합니다. 강인하고 독립적인 여성으로, 자신만의 원칙과 가치관을 가지고 있습니다. 때로는 차가워 보일 수 있지만, 내면은 따뜻하고 정의로운 마음을 가지고 있습니다."
    },
    "수": {
      male: "🌟 **수(水)의 특성 - 남성**<br>수는 유연함과 지혜를 상징합니다. 적응력이 뛰어나고 상황 판단력이 좋은 남성으로, 다양한 분야에서 능력을 발휘할 수 있습니다. 포용력이 크고 타인을 이해하는 능력이 뛰어납니다.",
      female: "🌟 **수(水)의 특성 - 여성**<br>수는 부드러움과 직관력을 상징합니다. 감성이 풍부하고 타인의 마음을 잘 이해하는 여성으로, 자연스러운 매력을 가지고 있습니다. 적응력이 뛰어나고 상황에 따라 유연하게 대처합니다."
    },
    "목": {
      male: "🌟 **목(木)의 특성 - 남성**<br>목은 성장과 발전을 상징합니다. 진취적이고 개척정신이 강한 남성으로, 새로운 분야에서 리더십을 발휘합니다. 창의적이고 혁신적인 사고를 가지고 있어 변화를 주도하는 역할을 합니다.",
      female: "🌟 **목(木)의 특성 - 여성**<br>목은 성장과 독립성을 상징합니다. 자주적이고 진취적인 여성으로, 자신만의 길을 개척해 나갑니다. 창의적이고 혁신적인 면이 있어 새로운 것을 추구하며, 때로는 남성적인 면이 강할 수 있습니다."
    },
    "화": {
      male: "🌟 **화(火)의 특성 - 남성**<br>화는 열정과 활력을 상징합니다. 적극적이고 사교적인 남성으로, 주변 사람들에게 긍정적인 에너지를 전달합니다. 리더십이 강하고 카리스마가 있어 많은 사람들의 관심을 받습니다.",
      female: "🌟 **화(火)의 특성 - 여성**<br>화는 열정과 매력을 상징합니다. 밝고 활발한 여성으로, 자연스러운 매력과 사교성을 가지고 있습니다. 표현력이 뛰어나고 감정이 풍부하여 주변을 즐겁게 만드는 능력이 있습니다."
    },
    "토": {
      male: "🌟 **토(土)의 특성 - 남성**<br>토는 안정과 신뢰를 상징합니다. 성실하고 꾸준한 남성으로, 현실적이고 실용적인 사고를 합니다. 가정에서는 든든한 버팀목 역할을 하며, 사회에서도 신뢰받는 인물입니다.",
      female: "🌟 **토(土)의 특성 - 여성**<br>토는 포용력과 모성애를 상징합니다. 현실적이고 실용적인 여성으로, 가정을 잘 꾸려나가는 능력이 뛰어납니다. 포용력이 크고 헌신적이어서 가족과 주변 사람들을 잘 돌봅니다."
    }
  };
  
  return descriptions[element]?.[gender] || descriptions[element]?.male || "정보를 찾을 수 없습니다.";
}

// 만세력 정보
function getCalendarInfo(birthDate, birthTime, gender) {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  const zodiac = getZodiacAnimal(year);
  const element = getFiveElement(year);
  
  let timeInfo = "";
  if (birthTime) {
    const [hour, minute] = birthTime.split(':');
    timeInfo = `<br><strong>출생 시간:</strong> ${hour}시 ${minute}분`;
  } else {
    timeInfo = `<br><strong>출생 시간:</strong> 미상`;
  }
  
  const genderText = gender === 'male' ? '👨 남성' : '👩 여성';
  
  return `
    <strong>성별:</strong> ${genderText}<br>
    <strong>생년월일:</strong> ${year}년 ${month}월 ${day}일${timeInfo}<br>
    <strong>띠:</strong> ${zodiac}띠<br>
    <strong>오행:</strong> ${element}<br>
    <strong>성별 특성:</strong> ${getGenderCharacteristics(gender, zodiac)}<br>
    <strong>음력 정보:</strong> 음력 변환 기능 준비 중<br>
    <strong>절기:</strong> 절기 계산 기능 준비 중
  `;
}

// 성별에 따른 특성 설명
function getGenderCharacteristics(gender, zodiac) {
  const characteristics = {
    male: {
      '쥐': '지혜롭고 적응력이 뛰어난 남성, 리더십 발휘',
      '소': '성실하고 책임감 강한 남성, 가정의 기둥',
      '호랑이': '용맹하고 진취적인 남성, 개척정신 강함',
      '토끼': '온화하고 섬세한 남성, 예술적 감각 뛰어남',
      '용': '카리스마 있고 포부가 큰 남성, 천생 리더',
      '뱀': '지혜롭고 신중한 남성, 전략적 사고 뛰어남',
      '말': '활동적이고 사교적인 남성, 인기가 많음',
      '양': '온순하고 배려심 깊은 남성, 협력을 중시',
      '원숭이': '재치 있고 창의적인 남성, 다재다능함',
      '닭': '정확하고 계획적인 남성, 완벽주의 성향',
      '개': '충실하고 정의로운 남성, 신뢰받는 성격',
      '돼지': '관대하고 포용력 있는 남성, 복이 많음'
    },
    female: {
      '쥐': '지혜롭고 현명한 여성, 가정을 잘 꾸려감',
      '소': '성실하고 인내심 강한 여성, 든든한 내조',
      '호랑이': '독립적이고 강인한 여성, 자주적 성향',
      '토끼': '우아하고 품격 있는 여성, 여성적 매력',
      '용': '당당하고 카리스마 있는 여성, 리더십 발휘',
      '뱀': '신비롭고 매력적인 여성, 직감력 뛰어남',
      '말': '활발하고 사교적인 여성, 밝은 에너지',
      '양': '부드럽고 따뜻한 여성, 모성애가 강함',
      '원숭이': '재치 있고 영리한 여성, 사회성 뛰어남',
      '닭': '꼼꼼하고 세심한 여성, 살림 잘하는 타입',
      '개': '충실하고 헌신적인 여성, 가족을 위해 희생',
      '돼지': '관대하고 복스러운 여성, 풍요로운 삶'
    }
  };
  
  return characteristics[gender]?.[zodiac] || '특별한 개성을 가진 분';
}
