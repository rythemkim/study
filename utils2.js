// =========================
// 시간 포맷
// =========================

function formatTime(totalSeconds){

  const h =
  String(
    Math.floor(totalSeconds / 3600)
  ).padStart(2,"0");

  const m =
  String(
    Math.floor(
      (totalSeconds % 3600) / 60
    )
  ).padStart(2,"0");

  const s =
  String(
    totalSeconds % 60
  ).padStart(2,"0");

  return `${h}:${m}:${s}`;

}

// =========================
// 필요 경험치
// =========================

function getRequiredExp(level){

  return 100 + (level * 50);

}

// =========================
// 현재 월
// =========================

function getCurrentMonth(){

  const now =
  new Date();

  return `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2,"0")}`;

}

// =========================
// 현재 주
// =========================

function getCurrentWeekKey(){

  const now =
  new Date();

  // 현재 요일
  // 일요일=0
  // 월요일=1

  const day =
  now.getDay();

  // 월요일 기준 계산

  const diff =
  day === 0
  ? -6
  : 1 - day;

  // 이번 주 월요일

  const monday =
  new Date(now);

  monday.setDate(
    now.getDate() + diff
  );

  return `${monday.getFullYear()}-${String(
    monday.getMonth() + 1
  ).padStart(2,"0")}-${String(
    monday.getDate()
  ).padStart(2,"0")}`;

}

// =========================
// 월말평가 기록 저장
// =========================

function saveMonthlyHistory(
  month,
  grade,
  bonus
){

if(
  !isMonthlyEvaluationTarget()
){

  showToast(
    "15일 이후 입사자는 이번달 평가 대상이 아닙니다."
  );

  return;

}

  const history =
  JSON.parse(
    localStorage.getItem(
      "monthlyHistory"
    )
  ) || [];

  history.unshift({

    month,
    grade,
    bonus

  });

  localStorage.setItem(
    "monthlyHistory",
    JSON.stringify(history)
  );

}

function renderMonthlyHistory(){

  const history =
  JSON.parse(
    localStorage.getItem(
      "monthlyHistory"
    )
  ) || [];

  monthlyList.innerHTML = "";

  history.forEach((item)=>{

let gradeClass = "";

switch(item.grade){

  case "A":

    gradeClass = "gold";

    break;

  case "B":

    gradeClass = "silver";

    break;

  case "C":

    gradeClass = "bronze";

    break;

  case "F":

    gradeClass = "fail";

    break;

case "D":

  gradeClass = "normal";

  break;

}

    monthlyList.innerHTML += `

      <div class="career-item">

        <div class="career-date">
          ${item.month}
        </div>

        <div class="
  career-grade
  ${gradeClass}
">
  ${item.grade} 평가
</div>

        <div class="career-desc">
          성과금 ${item.bonus}
        </div>

      </div>

    `;

  });

}

// =========================
// 승진 기록
// =========================

function savePromotionHistory(
  month,
  before,
  after,
  type
){

  const history =
  JSON.parse(
    localStorage.getItem(
      "promotionHistory"
    )
  ) || [];

  history.unshift({

    month,
    before,
    after,
    type

  });

  localStorage.setItem(
    "promotionHistory",
    JSON.stringify(history)
  );

}

function renderPromotionHistory(){

  const history =
  JSON.parse(
    localStorage.getItem(
      "promotionHistory"
    )
  ) || [];

  promotionList.innerHTML =
  "";

  history.forEach((item)=>{

    promotionList.innerHTML += `

      <div class="career-item">

        <div class="career-date">
          ${item.month}
        </div>

        <div class="career-grade">
          ${item.before}
          →
          ${item.after}
        </div>

        <div class="career-desc">
          ${item.type}
        </div>

      </div>

    `;

  });

}

// =========================
// 구매 목록
// =========================

function savePurchaseHistory(
  name,
  price
){

  const history =
  JSON.parse(
    localStorage.getItem(
      "purchaseHistory"
    )
  ) || [];

  history.unshift({

    date:
    new Date()
    .toLocaleDateString(),

    name,
    price

  });

  localStorage.setItem(
    "purchaseHistory",
    JSON.stringify(history)
  );

}

function renderAchievementHistory(){

  const history =
  JSON.parse(
    localStorage.getItem(
      "purchaseHistory"
    )
  ) || [];

  achievementList.innerHTML =
  "";

  history.forEach((item)=>{

  achievementList.innerHTML += `

      <div class="career-item">

        <div class="career-date">
          ${item.date}
        </div>

        <div class="career-grade">
          구매 완료
        </div>

        <div class="career-desc">
          ${item.name}
        </div>

        <div class="career-desc">
          -${Number(item.price)
            .toLocaleString()}원
        </div>

      </div>

    `;

  });

}

// =========================
// 직급 및 시급
// =========================

function renderPositionInfo(){

  positionContent.innerHTML = `

    <div class="career-item position-card">

      <div class="career-date">
        현재 직급
      </div>

      <div class="career-grade">
        ${currentPosition}
      </div>

    </div>

    <div class="career-item position-card">

      <div class="career-date">
        현재 시급
      </div>

      <div class="career-grade">

        ${getHourlyPay()
          .toLocaleString()}원

      </div>

    </div>

    <div class="career-item position-card">

      <div class="career-date">
        메달 현황
      </div>

      <div class="career-desc">

        🥇 ${totalGold}
        🥈 ${totalSilver}
        🥉 ${totalBronze}

      </div>

    </div>

  `;

}

// =========================
// 목표 데이터
// =========================

function renderGoals(){

const sortedGoals =
[...goals].sort(
  (a,b)=>b.isMain - a.isMain
);

  goalList.innerHTML =
  "";

  sortedGoals.forEach((goal,index)=>{

const realIndex =
goals.indexOf(goal);

    goalList.innerHTML += `

      <div class="
        career-item
position-card
${goal.isMain ? "main-goal-card" : ""}
      ">

        <div class="career-date">

          ${
            goal.date ||
            "날짜 미설정"
          }

        </div>

        <div class="career-grade">

          ${goal.title}

        </div>

        <div class="career-desc">

          ${
            goal.isMain
            ? "현재 메인 목표"
            : "일반 목표"
          }

        </div>

        <div class="goal-btn-row">

  <button
  class="
    main-goal-btn
    ${
      goal.isMain
      ? "main-remove-btn"
      : ""
    }
  "
    onclick="
      toggleMainGoal(
  ${realIndex}
)
    "
  >

    ${
      goal.isMain
      ? "메인 해제"
      : "메인 설정"
    }

  </button>

  <button
    class="delete-goal-btn"
    onclick="
      deleteGoal(
  ${realIndex}
)
    "
  >

    삭제

  </button>

</div>

      </div>

    `;

  });

}

// =========================
// 메인 목표 토글
// =========================

function toggleMainGoal(index){

  // 이미 메인 목표면 해제

  if(goals[index].isMain){

    goals[index].isMain =
    false;

  }

  // 일반 목표면 메인 설정

  else{

    goals.forEach((goal)=>{

      goal.isMain = false;

    });

    goals[index].isMain =
    true;

  }

  localStorage.setItem(
    "goals",
    JSON.stringify(goals)
  );

  renderGoals();

  updateDday();

showToast(
  "메인 목표가 변경되었습니다."
);

}

// =========================
// 메인 목표 가져오기
// =========================

function getMainGoal(){

  return goals.find(
    (goal)=>goal.isMain
  );

}

// =========================
// 목표 삭제
// =========================

function deleteGoal(index){

  const confirmDelete =
  confirm(
    "목표를 삭제하시겠습니까?"
  );

  if(!confirmDelete){
    return;
  }

  goals.splice(index,1);

  localStorage.setItem(
    "goals",
    JSON.stringify(goals)
  );

  renderGoals();

  updateDday();

  showToast(
    "목표가 삭제되었습니다."
  );

}

// =========================
// D-day 업데이트
// =========================

function updateDday(){

  const mainGoal =
  getMainGoal();

  // 메인 목표 없으면 종료

  if(!mainGoal){

  ddayGoal.textContent =
  "목표를 설정해주세요";

  ddayText.textContent =
  "D-day";

  return;

  }

  ddayGoal.textContent =
  mainGoal.title;

  // 날짜 없으면 종료

  if(!mainGoal.date){

    ddayText.textContent =
    "D-day";

    return;

  }

  const target =
  new Date(mainGoal.date);

  const today =
  new Date();

  const diff =
  Math.ceil(
    (target - today)
    / (1000 * 60 * 60 * 24)
  );

  if(diff > 0){

    ddayText.textContent =
    `D-${diff}`;

  }

  else if(diff === 0){

    ddayText.textContent =
    "D-DAY";

  }

  else{

    ddayText.textContent =
    `D+${Math.abs(diff)}`;

  }

}

// =========================
// 월평 평가 대상 여부
// =========================

function isMonthlyEvaluationTarget(){

  // 입사일 없으면 제외

  if(!joinDate){

    return false;

  }

  const join =
  new Date(joinDate);

  const today =
  new Date();

  // 입사 월

  const joinMonth =
  join.getMonth();

  // 현재 월

  const currentMonth =
  today.getMonth();

  // 입사 연도

  const joinYear =
  join.getFullYear();

  // 현재 연도

  const currentYear =
  today.getFullYear();

  // 이번달 입사자인 경우만 체크

  const isSameMonth =

    joinMonth === currentMonth
    &&

    joinYear === currentYear;

  // 이번달 입사 + 15일 이후

  if(
    isSameMonth
    &&

    join.getDate() > 15
  ){

    return false;

  }

  return true;

}

// =========================
// 정산 시스템
// =========================

function checkTimeReset(){

  const currentWeek =
  getCurrentWeekKey();

  const currentMonth =
getCurrentMonth();

  // =========================
  // 주간 초기화
  // =========================

  if(lastWeekKey !== currentWeek){

    weeklySeconds = 0;

    lastWeekKey =
    currentWeek;

    localStorage.setItem(
      "weeklySeconds",
      weeklySeconds
    );

    localStorage.setItem(
      "lastWeekKey",
      lastWeekKey
    );

  }

 if(
  !lastMonthKey
){

  lastMonthKey =
  currentMonth;

  localStorage.setItem(
    "lastMonthKey",
    currentMonth
  );

  return;

}

else if(lastMonthKey !== currentMonth){

  // 월 데이터 없으면 종료

  if(!monthlyStats[lastMonthKey]){

    lastMonthKey =
    currentMonth;

    localStorage.setItem(
      "lastMonthKey",
      lastMonthKey
    );

    return;

  }

  // 정산 금액 저장

  const settledPay =
  monthlyPay;

const stats =
monthlyStats[lastMonthKey];

const evaluation =
calculateEvaluation(stats);

switch(evaluation){

  case "A":

    totalGold++;

    break;

  case "B":

    totalSilver++;

    break;

  case "C":

    totalBronze++;

    break;

}

localStorage.setItem(
  "totalGold",
  totalGold
);

localStorage.setItem(
  "totalSilver",
  totalSilver
);

localStorage.setItem(
  "totalBronze",
  totalBronze
);

if(evaluation === "F"){

  applyDemotion();

}
else{

  isDemoted = false;

  localStorage.setItem(
    "isDemoted",
    false
  );

  updatePosition();

}

let bonus = 0;

switch(evaluation){

  case "A":

    bonus = 300000;

    break;

  case "B":

    bonus = 200000;

    break;

  case "C":

    bonus = 100000;

    break;

case "D":

  bonus = 0;

  break;

case "F":

  bonus = 0;

  break;

}

  // =========================
  // 월급 정산
  // =========================

  totalPay +=
settledPay + bonus;

  localStorage.setItem(
    "totalPay",
    totalPay
  );

  // =========================
  // 월간 초기화
  // =========================

  monthlySeconds = 0;

  monthlyPay = 0;

  lastMonthKey =
  currentMonth;

  localStorage.setItem(
    "monthlySeconds",
    monthlySeconds
  );

  localStorage.setItem(
    "monthlyPay",
    monthlyPay
  );

  localStorage.setItem(
    "lastMonthKey",
    lastMonthKey
  );

  // =========================
  // 월급 정산 알림
  // =========================

  setTimeout(()=>{

  showToast(
`이번 달 급여가 정산되었습니다.

급여
+${settledPay.toLocaleString()}원

성과급
+${bonus.toLocaleString()}원`
  );

  updateTotalInfo();

},1000);

}

}

// =========================
// 현재 근무 초
// =========================

function getWorkedSecondsV2(){

  return (
    (hour * 3600) +
    (minute * 60) +
    second
  );

}

// =========================
// 직급별 시급 배율
// =========================

function getPayMultiplier(position){

  switch(position){

    case "사원":
      return 1.1;

    case "주임":
      return 1.2;

    case "대리":
      return 1.3;

    case "과장":
      return 1.4;

    case "차장":
      return 1.5;

    case "부사장":
      return 1.8;

    case "사장":
      return 2;

    default:
      return 1;

  }

}

// =========================
// 총 메달 수 계산
// =========================


function getTotalMedals(){

  return (
    totalGold +
    totalSilver +
    totalBronze
  );

}

// =========================
// 승진 기록
// =========================

function saveBonusHistory(
  month,
  bonus
){

  const history =
  JSON.parse(
    localStorage.getItem(
      "bonusHistory"
    )
  ) || [];

  history.unshift({

    month,
    bonus

  });

  localStorage.setItem(
    "bonusHistory",
    JSON.stringify(history)
  );

}

function renderBonusHistory(){

  const history =
  JSON.parse(
    localStorage.getItem(
      "bonusHistory"
    )
  ) || [];

  bonusList.innerHTML =
  "";

  history.forEach((item)=>{

    bonusList.innerHTML += `

      <div class="career-item">

        <div class="career-date">
          ${item.month}
        </div>

        <div class="career-grade">
          성과금
        </div>

        <div class="career-desc">
          ${item.bonus}
        </div>

      </div>

    `;

  });

}

// =========================
// 급여 계산
// =========================

function calculatePay(seconds){

  return Math.floor(
    (getHourlyPay() / 3600)
    * seconds
  );

}

// =========================
// 월말평가 기록 저장
// =========================

saveMonthlyHistory(
  lastMonthKey,
  evaluation,
  `+${bonus.toLocaleString()}원`
);

saveBonusHistory(
  lastMonthKey,
  `+${bonus.toLocaleString()}원`
);

// =========================
// 숫자 카운트 애니메이션
// =========================

function animateNumber(
  element,
  start,
  end,
  duration = 300
){

  const startTime =
  performance.now();

  function update(currentTime){

    const elapsed =
    currentTime - startTime;

    const progress =
    Math.min(
      elapsed / duration,
      1
    );

    const current =
    Math.floor(
      start +
      ((end - start) * progress)
    );

    element.textContent =
    `+${current.toLocaleString()}원`;

    if(progress < 1){

      requestAnimationFrame(
        update
      );

    }

  }

  requestAnimationFrame(
    update
  );

}

// =========================
// 위시리스트 UI
// =========================

function updateWishlistUI(){

  // 위시 상품 없으면 종료

  if(!wishlistProduct){

    return;

  }

  wishlistTitle.textContent =
  wishlistProduct.name;

  wishlistBrand.textContent =
  wishlistProduct.brand;

  wishlistTargetMoney.textContent =
  `${wishlistProduct.price
    .toLocaleString()}원`;

  // 현재 금액

  wishlistCurrentMoney.textContent =
  `${totalPay.toLocaleString()}원`;

  // 남은 금액

  const remainMoney =
  wishlistProduct.price - totalPay;

  wishlistRemainMoney.textContent =
  `${Math.max(
    remainMoney,
    0
  ).toLocaleString()}원`;

  // 달성률

  let percent =
  Math.floor(
    (totalPay
    / wishlistProduct.price)
    * 100
  );

  if(percent > 100){
    percent = 100;
  }

if(totalPay >=
wishlistProduct.price){

  showWishlistAchievement();

}

  document.getElementById(
    "wishlistPercent"
  ).textContent =
  `${percent}%`;

  document.getElementById(
    "wishlistProgressFill"
  ).style.width =
  `${percent}%`;

}

// =========================
// 위시리스트 설정
// =========================

function setWishlist(
  name,
  brand,
  price
){

  wishlistProduct = {

    name,
    brand,
    price

  };

  localStorage.setItem(
    "wishlistProduct",
    JSON.stringify(
      wishlistProduct
    )
  );

  updateWishlistUI();

  showToast(
    "위시리스트가 변경되었습니다."
  );

}

// =========================
// 구매 완료 팝업
// =========================

function showPurchasePopup(
  productName,
  productPrice
){

  purchasePopupPrice.textContent =
  `${productPrice
    .toLocaleString()}원`;

  purchasePopupProduct.textContent =
  productName;

  purchasePopup.classList.add(
    "show"
  );

  setTimeout(()=>{

    purchasePopup.classList.remove(
      "show"
    );

  },2200);

}

// =========================
// 구매 체크승인 배너
// =========================

function showPurchaseBanner(
  productName,
  productPrice
){

  const nickname =
  nicknameInput.value ||
  "지니어스";

  const now =
  new Date();

  const dateText =
  `${now.getMonth()+1}/${
    now.getDate()
  } ${
    now.getHours()
  }:${
    String(
      now.getMinutes()
    ).padStart(2,"0")
  }`;

  purchaseBannerUser.textContent =
  `${nickname} · ${dateText}`;

  purchaseBannerInfo.textContent =
`${productPrice.toLocaleString()}원
${productName}`;

  purchaseBanner.classList.add(
    "show"
  );

  setTimeout(()=>{

    purchaseBanner.classList.remove(
      "show"
    );

  },3000);

}

// =========================
// 잔액 애니메이션
// =========================

function animateMoney(
  start,
  end
){

  const duration =
  800;

  const frameRate =
  16;

  const totalFrames =
  duration / frameRate;

  let currentFrame = 0;

  const timer =
  setInterval(()=>{

    currentFrame++;

    const progress =
    currentFrame / totalFrames;

    const currentValue =
    Math.floor(
      start +
      (end - start)
      * progress
    );

    totalPayText.textContent =
    `${currentValue
      .toLocaleString()}원`;

    officeBankMoney.textContent =
    `${currentValue
      .toLocaleString()}원`;

    storeBankMoney.textContent =
    `${currentValue
      .toLocaleString()}원`;

    wishlistCurrentMoney.textContent =
    `${currentValue
      .toLocaleString()}원`;

    if(currentFrame >= totalFrames){

      clearInterval(timer);

      totalPayText.textContent =
      `${end.toLocaleString()}원`;

      officeBankMoney.textContent =
      `${end.toLocaleString()}원`;

      storeBankMoney.textContent =
      `${end.toLocaleString()}원`;

      wishlistCurrentMoney.textContent =
      `${end.toLocaleString()}원`;

    }

  },frameRate);

}

// =========================
// 상품 카드 효과
// =========================

function playPurchaseEffect(
  id
){

  const card =
  document.getElementById(
    `productCard-${id}`
  );

  if(!card){
    return;
  }

  card.classList.add(
    "purchase-effect"
  );

  setTimeout(()=>{

    card.classList.remove(
      "purchase-effect"
    );

  },500);

}

// =========================
// 위시 달성 연출
// =========================

function showWishlistAchievement(){

playVibration(
  [80,40,80,40,180]
);

  // 위시 없으면 종료

  if(!wishlistProduct){
    return;
  }

  wishlistCompleteProduct.textContent =
  wishlistProduct.name;

  wishlistCompletePopup.classList.add(
    "show"
  );

  wishlistCard.classList.add(
    "wishlist-achieved"
  );

  setTimeout(()=>{

    wishlistCompletePopup
    .classList.remove(
      "show"
    );

    wishlistCard.classList.remove(
      "wishlist-achieved"
    );

  },3000);

}

// =========================
// 다크모드 적용
// =========================

function updateDarkMode(){

  if(isDarkMode){

    document.body.classList.add(
      "dark-mode"
    );

    darkModeText.textContent =
    "ON";

  }

  else{

    document.body.classList.remove(
      "dark-mode"
    );

    darkModeText.textContent =
    "OFF";

  }

}

// =========================
// 진동 설정 UI
// =========================

function updateVibrationUI(){

  vibrationText.textContent =
  isVibrationOn
  ? "ON"
  : "OFF";

}

// =========================
// 진동 실행
// =========================

function playVibration(
  duration = 120
){

  if(!isVibrationOn){
    return;
  }

  if(navigator.vibrate){

    navigator.vibrate(
      duration
    );

  }

}