// =========================
// 경험치 지급
// =========================

function addExp(exp){

  currentExp += exp;

  let requiredExp =
  getRequiredExp(currentLevel);

  // 레벨업 반복

  while(currentExp >= requiredExp){

    currentExp -= requiredExp;

    currentLevel++;

    alert(
      `레벨업!\nLv.${currentLevel}`
    );

    requiredExp =
    getRequiredExp(currentLevel);

  }

  // 저장

  localStorage.setItem(
    "currentLevel",
    currentLevel
  );

  localStorage.setItem(
    "currentExp",
    currentExp
  );

  // UI 갱신

  updateLevelUI();

}

// =========================
// 현재 시급 계산
// =========================

function getHourlyPay(){

  const position =
  officePosition.textContent;

  return Math.floor(
    basePay *
    getPayMultiplier(position)
  );

}

function updatePosition(){

if(isDemoted){
  return;
}

  const oldPosition =
  officePosition.textContent;

  let newPosition =
  "인턴";

  const totalMedals =
  getTotalMedals();

  // 사장
  if(
    totalMedals >= 36
    &&
    totalGold >= 12
  ){

    newPosition = "사장";

  }

  // 부사장
  else if(
    totalMedals >= 24
    &&
    totalGold >= 8
  ){

    newPosition = "부사장";

  }

  // 차장
  else if(
    totalMedals >= 15
    &&
    totalGold >= 5
  ){

    newPosition = "차장";

  }

  // 과장
  else if(
    totalMedals >= 12
    &&
    totalGold >= 4
  ){

    newPosition = "과장";

  }

  // 대리
  else if(
    totalMedals >= 8
    &&
    totalGold >= 2
  ){

    newPosition = "대리";

  }

  // 주임
  else if(
    totalMedals >= 4
    &&
    totalGold >= 1
  ){

    newPosition = "주임";

  }

  // 사원
  else if(
    totalMedals >= 2
  ){

    newPosition = "사원";

  }

  officePosition.textContent =
  newPosition;

currentPosition =
newPosition;

  localStorage.setItem(
  "currentPosition",
  newPosition
);

  // 승진 알림

  if(oldPosition !== newPosition){

  savePromotionHistory(

    lastMonthKey,

    oldPosition,

    newPosition,

    "승진"

  );

  alert(
`축하합니다!

${newPosition}(으)로 승진했습니다.

현재 시급
${getHourlyPay().toLocaleString()}원`
  );

}

  updateHourlyPayUI();

}

// =========================
// 강등 함수
// =========================

function applyDemotion(){

  const currentIndex =
  positions.indexOf(
    currentPosition
  );

  // 인턴은 강등 불가

  if(currentIndex <= 0){
    return;
  }

  // 한 단계 강등

  const newPosition =
  positions[currentIndex - 1];

  officePosition.textContent =
  newPosition;

  currentPosition =
  newPosition;

savePromotionHistory(

  lastMonthKey,

  positions[currentIndex],

  newPosition,

  "강등"

);

isDemoted = true;

localStorage.setItem(
  "isDemoted",
  true
);

  localStorage.setItem(
    "currentPosition",
    newPosition
  );

  updateHourlyPayUI();

  alert(
`이번 달 평가 F

${newPosition}(으)로 강등되었습니다.`
  );

}
