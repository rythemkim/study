// =========================
// 레벨 UI
// =========================

function updateLevelUI(){

  officeLevel.textContent =
  `Lv.${currentLevel}`;

}

// =========================
// 근속일 계산
// =========================

function updateCareerDays(){

  const savedJoinDate =
  localStorage.getItem(
    "joinDate"
  );

  // 입사일 없으면 종료

  if(!savedJoinDate){
    return;
  }

  const today =
  new Date();

  const join =
  new Date(savedJoinDate);

  // 날짜 차이(ms)

  const diff =
  today - join;

  // 일수 변환

  const days =
  Math.floor(
    diff / (1000 * 60 * 60 * 24)
  ) + 1;

  officeCareer.textContent =
  `근속 ${days}일째`;

}

function updateCurrentMonthText(){

  const now =
  new Date();

  currentMonthText.textContent =
  `${now.getFullYear()}.${String(
    now.getMonth() + 1
  ).padStart(2,"0")}`;

}

// =========================
// 월 통계 출력
// =========================

function renderMonthlySummary(){

  const currentMonth =
  getCurrentMonth();

  const stats =
  monthlyStats[currentMonth];

  const evaluation =
  calculateEvaluation(stats);

  monthlySummary.innerHTML =
  `
  <div class="summary-title">

    이번 달 출석 현황

  </div>

  <div class="summary-row">
    지각 ${stats.lateCount}회
  </div>

  <div class="summary-row">
    결근 ${stats.absentCount}회
  </div>

  <div class="summary-row">
    병가 ${stats.sickCount}회
  </div>

  <div class="summary-row">
    반차 ${stats.halfCount}회
  </div>

  <div class="summary-grade">

    예상 평가 ${evaluation}

  </div>
  `;

}

// =========================
// 주간 시간 표시
// =========================

function updateWeeklyTime(){

  weeklyWorkTime.textContent =
  formatTime(weeklySeconds);

}

// =========================
// 시급 UI 표시
// =========================

function updateHourlyPayUI(){

  hourPay.textContent =
  `${getHourlyPay().toLocaleString()}원`;

}

// =========================
// A 뱃지 표시
// =========================

function updateRankBadge(){

  officeRankBadge.innerHTML = `

    <div class="rank-item">

      <i data-lucide="award"></i>

      <span>${totalGold}</span>

    </div>

    <div class="rank-item">

      <i data-lucide="medal"></i>

      <span>${totalSilver}</span>

    </div>

    <div class="rank-item">

      <i data-lucide="trophy"></i>

      <span>${totalBronze}</span>

    </div>

  `;

  lucide.createIcons();

}

// =========================
// 총 누적 표시
// =========================

function updateTotalInfo(){

  const now =
new Date();

totalWorkInfo.textContent =
`${now.getMonth() + 1}월 ${formatTime(monthlySeconds)}`;

  totalPayText.textContent =
  `${monthlyPay.toLocaleString()}원`;

storeBankMoney.textContent =
`${totalPay.toLocaleString()}원`;

officeBankMoney.textContent =
`${totalPay.toLocaleString()}원`;

wishlistCurrentMoney.textContent =
`${totalPay.toLocaleString()}원`;

}

// =========================
// 연차 표시
// =========================

function updateAnnualCount(){

  annualCount.textContent =
  annualLeave;

}

function renderAnnualSummary(){

  const currentHours =
  Math.floor(
    totalSeconds / 3600
  );

  const progressSeconds =
totalSeconds -
(lastAnnualHours * 3600);

const progressHours =
Math.floor(
  progressSeconds / 3600
);

const progressMinutes =
Math.floor(
  (progressSeconds % 3600) / 60
);

  const progressPercent =
  Math.min(
    (progressHours / 60) * 100,
    100
  );

  annualSummary.innerHTML =
`
<div class="summary-title">
  연차 관리
</div>

<div class="summary-row">
  현재 연차 ${annualLeave}개
</div>

<div class="annual-section">

  <div class="summary-row">
    다음 연차까지
  </div>

  <div class="annual-progress-text">
    ${progressHours}시간
${progressMinutes}분
/ 60시간
  </div>

  <div class="annual-progress-bar">

    <div
      class="annual-progress-fill"
      style="width:${progressPercent}%"
    ></div>

  </div>

</div>

<div class="summary-row">
  총 누적 ${formatTime(totalSeconds)}
</div>
`;

}

// =========================
// 휴가 UI 표시
// =========================

function updateLeaveUI(){

  annualCount.textContent =
  annualLeave;

  halfCount.textContent =
  halfLeave;

  sickCount.textContent =
  sickLeave;

}

// =========================
// 상태 표시 변경
// =========================

function setWorkState(state){

  // 기본값

  let text = "";
  let color = "";

  // 상태별

  switch(state){

    case "working":

      text = "근무중";
      color = "#168845";

      break;

    case "rest":

      text = "휴식중";
      color = "#b7791f";

      break;

    case "lunch":

      text = "점심중";
      color = "#dd6b20";

      break;

    case "away":

      text = "이석중";
      color = "#718096";

      break;

    case "overtime":

      text = "야근중";
      color = "#e53e3e";

      break;

    case "off":

      text = "퇴근";
      color = "#9a9a9a";

      break;

  }

  // 홈 상태

  workingBadge.textContent =
  text;

  workingBadge.style.background =
  color;

  // 오피스 상태

  officeState.innerHTML =
  `
  <span class="state-dot">
    ●
  </span>

  ${text}
  `;

  officeState.style.color =
  color;

}

// =========================
// 출퇴근 기록 출력
// =========================

function renderAttendance(){

  const savedRecords =
  JSON.parse(
    localStorage.getItem(
      "attendanceRecords"
    )
  ) || [];

  // 비어있을 때

  if(savedRecords.length === 0){

    attendanceList.innerHTML =
    `
    <div class="empty-record">

      아직 기록이 없습니다.

    </div>
    `;

    return;

  }

  // 최신순 정렬

  const reversedRecords =
  [...savedRecords].reverse();

  attendanceList.innerHTML = "";

  reversedRecords.forEach(record=>{

    let statusText = "";

switch(record.status){

  case "normal":

    statusText =
    "🟢 정상";

    break;

  case "late":

    statusText =
    "🟡 지각";

    break;

  case "annual":

    statusText =
    "🔵 연차";

    break;

  case "half_am":

    statusText =
    "🟣 오전반차";

    break;

  case "half_pm":

    statusText =
    "🟣 오후반차";

    break;

  case "sick":

    statusText =
    "⚪ 병가";

    break;

  case "absent":

    statusText =
    "🔴 결근";

    break;

}

    attendanceList.innerHTML +=
    `
    <div class="attendance-item">

      <div class="attendance-date">
        ${record.date}
      </div>

      <div class="attendance-row">
        출근 ${record.start}
      </div>

      <div class="attendance-row">
        퇴근 ${record.end}
      </div>

      <div class="attendance-row">
        근무 ${record.totalTime}
      </div>

      <div class="attendance-row">
        급여 ${record.pay}
      </div>

      <div class="attendance-state">
  ${statusText}
</div>

    </div>
    `;

  });

}

// =========================
// 휴식 타이머 표시
// =========================

function updateRestUI(){

  const m =
  String(
    Math.floor(restSeconds / 60)
  ).padStart(2,"0");

  const s =
  String(
    restSeconds % 60
  ).padStart(2,"0");

  restTime.textContent =
  `${m}:${s}`;

}

// =========================
// 점심 타이머 표시
// =========================

function updateLunchUI(){

  const m =
  String(
    Math.floor(
      lunchSeconds / 60
    )
  ).padStart(2,"0");

  const s =
  String(
    lunchSeconds % 60
  ).padStart(2,"0");

  lunchTime.textContent =
  `${m}:${s}`;

}

// =========================
// 자리비움 UI
// =========================

function updateAwayUI(){

  // 횟수 표시

  awayCountText.textContent =
  `${awayCount} / 5`;

  // 타이머 표시

  const m =
  String(
    Math.floor(
      awaySeconds / 60
    )
  ).padStart(2,"0");

  const s =
  String(
    awaySeconds % 60
  ).padStart(2,"0");

  awayTime.textContent =
  `${m}:${s}`;

}

// =========================
// 출퇴근 기본 시간 표시
// =========================

function updateOfficeTime(){

  const startText =
  `${String(workStartHour).padStart(2,"0")}:${String(workStartMinute).padStart(2,"0")}`;

  const endText =
  `${String(workEndHour).padStart(2,"0")}:${String(workEndMinute).padStart(2,"0")}`;

  officeStartTime.textContent =
  startText;

  officeEndTime.textContent =
  endText;

}

// =========================
// 출퇴근 남은 시간
// =========================

function updateRemainingTime(){

  // 근무중 아닐 때

  if(!isWorking){

    remainingTime.textContent =
    "00:00:00";

    return;

  }

  const now =
  new Date();

  const end =
  new Date();

  end.setHours(
    workEndHour,
    workEndMinute,
    0,
    0
  );

  // 남은 ms

  const diff =
  end - now;

  // 퇴근 전

  if(diff > 0){

    const remainSeconds =
    Math.floor(diff / 1000);

    remainingTime.textContent =
    formatTime(remainSeconds);

  }

  // 퇴근 후

  else{

    remainingTime.textContent =
    "00:00:00";

    // 10분 초과 시 야근

    const overtimeMinutes =
    Math.abs(diff) / 60000;

    if(overtimeMinutes >= 10){

      setWorkState("overtime");

    }

  }

}

// =========================
// 근무 UI 업데이트
// =========================

function updateWorkUI(){

if(!isWorking){

  workTime.textContent =
  "00:00:00";

  dailyPay.textContent =
  "0원";

  setWorkState("off");

  return;

}

  const workedSeconds =
  getWorkedSecondsV2();

  // 근무시간

  workTime.textContent =
  formatTime(workedSeconds);

  // 급여

  const earnedPay =
  calculatePay(workedSeconds);

  const currentPay =
parseInt(
  dailyPay.textContent.replace(
    /[^0-9]/g,
    ""
  )
) || 0;

animateNumber(
  dailyPay,
  currentPay,
  earnedPay
);

  // 야근 상태

  if(workedSeconds >= 33000){

    setWorkState("overtime");

    workingBadge.style.background =
    "#ff8c42";

  }

}