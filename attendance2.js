// =========================
// 자동 결근 체크
// =========================

function checkAbsent(){

// 최초 실행이면 종료

if(!hasInitializedAttendance){

  localStorage.setItem(
    "hasInitializedAttendance",
    true
  );

  return;

}

  // 현재 시간

  const now =
  new Date();

  const currentMinutes =
  (now.getHours() * 60)
  +
  now.getMinutes();

  // 퇴근시간

  const endMinutes =
  (workEndHour * 60)
  +
  workEndMinute;

  // 아직 퇴근시간 전

  if(currentMinutes <= endMinutes){
    return;
  }

  // 오늘 날짜

  const today =
  `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;

  // 기록 불러오기

  const savedRecords =
  JSON.parse(
    localStorage.getItem(
      "attendanceRecords"
    )
  ) || [];

// 최초 실행 데이터 없으면 종료

if(savedRecords.length === 0){

  return;

}

  // 오늘 기록 존재 여부

  const alreadyExists =
  savedRecords.some(
    record => record.date === today
  );

  // 이미 기록 있음

  if(alreadyExists){
    return;
  }

  // 현재 근무중이면 제외

  if(isWorking){
    return;
  }

  // 결근 기록 생성

  const attendanceRecord = {

    date: today,

    status: "absent",

    start: "-",

    end: "-",

    totalTime: "00:00:00",

    pay: "0원"

  };

  savedRecords.push(
    attendanceRecord
  );

  localStorage.setItem(
    "attendanceRecords",
    JSON.stringify(
      savedRecords
    )
  );

  // 월 결근 증가

  const currentMonth =
  getCurrentMonth();

  monthlyStats[currentMonth]
  .absentCount++;

  localStorage.setItem(
    "monthlyStats",
    JSON.stringify(
      monthlyStats
    )
  );

  renderAttendance();

  renderMonthlySummary();

  showToast(
  "무단결근 처리되었습니다."
);

}

// =========================
// 지각 추가
// =========================

function increaseLateCount(){

  const currentMonth =
  getCurrentMonth();

  monthlyStats[currentMonth]
  .lateCount++;

  localStorage.setItem(
    "monthlyStats",
    JSON.stringify(
      monthlyStats
    )
  );

}

// =========================
// 월말 평가 계산
// =========================

function calculateEvaluation(stats){

  // F

  if(stats.absentCount >= 3){

    return "F";

  }

  // A

  if(
    stats.absentCount === 0
    &&
    stats.lateCount <= 2
  ){

    return "A";

  }

  // B

  if(
    stats.absentCount === 0
    &&
    stats.lateCount <= 5
  ){

    return "B";

  }

  // C

  if(
    stats.absentCount <= 1
    &&
    stats.lateCount <= 5
  ){

    return "C";

  }

  // D

  if(
    stats.lateCount >= 6
    ||
    stats.absentCount >= 2
  ){

    return "D";

  }

  // 기본 안전장치

  return "D";

}

function finalizeMonthlyEvaluation(){

  const previousMonth =
  savedMonth;

  // 데이터 없으면 종료

  if(
    !monthlyStats[previousMonth]
  ){
    return;
  }

  const stats =
  monthlyStats[previousMonth];

  // 평가 계산

  const evaluation =
  calculateEvaluation(stats);

  // 평가 저장

  monthlyStats[
    previousMonth
  ].evaluation =
  evaluation;

  // 메달 지급

  if(evaluation === "A"){

    totalGold++;

    localStorage.setItem(
      "totalGold",
      totalGold
    );

  }

  else if(evaluation === "B"){

    totalSilver++;

    localStorage.setItem(
      "totalSilver",
      totalSilver
    );

  }

  else if(evaluation === "C"){

    totalBronze++;

    localStorage.setItem(
      "totalBronze",
      totalBronze
    );

  }

  // 저장

  localStorage.setItem(
    "monthlyStats",
    JSON.stringify(
      monthlyStats
    )
  );

// UI 갱신

updateRankBadge();

// =========================
// F 강등 처리
// =========================

if(evaluation === "F"){

  isDemoted = true;

  localStorage.setItem(
    "isDemoted",
    JSON.stringify(isDemoted)
  );

  applyDemotion();

}

// =========================
// 정상 평가면 복귀
// =========================

else{

  isDemoted = false;

  localStorage.setItem(
    "isDemoted",
    JSON.stringify(isDemoted)
  );

  updatePosition();

}

  // 알림

  alert(
`지난달 평가 확정

평가 : ${evaluation}`
  );

}

// =========================
// 월급 지급
// =========================

function processMonthlySalary(){

  // 월급 지급

  totalPay += monthlyPay;

  localStorage.setItem(
    "totalPay",
    totalPay
  );

  // 지급액 저장

  const paidSalary =
  monthlyPay;

  // 월급 초기화

  monthlyPay = 0;

  localStorage.setItem(
    "monthlyPay",
    monthlyPay
  );

  // UI 갱신

  updateTotalInfo();

  showToast(
`지난달 월급 지급 완료

${paidSalary.toLocaleString()}원 입금되었습니다.`
  );

}

// =========================
// 월 통계 초기화
// =========================

function initMonthlyStats(){

  const currentMonth =
  getCurrentMonth();

  // 없으면 생성

  if(
    !monthlyStats[currentMonth]
  ){

    monthlyStats[currentMonth] = {

      lateCount:0,

      absentCount:0,

      sickCount:0,

      annualCount:0,

      halfCount:0,

      evaluation:"-"

    };

    localStorage.setItem(
      "monthlyStats",
      JSON.stringify(
        monthlyStats
      )
    );

  }

}

// =========================
// 월 변경 체크
// =========================

function checkMonthChange(){

  const currentMonth =
  getCurrentMonth();

  // 최초 저장

  if(savedMonth === ""){

    savedMonth =
    currentMonth;

    localStorage.setItem(
      "savedMonth",
      savedMonth
    );

    return;

  }

  // 달 변경

  if(savedMonth !== currentMonth){

finalizeMonthlyEvaluation();

processMonthlySalary();

    // 병가 초기화

    sickLeave = 2;

    localStorage.setItem(
      "sickLeave",
      sickLeave
    );

    // 월 갱신

    savedMonth =
    currentMonth;

    localStorage.setItem(
      "savedMonth",
      savedMonth
    );

    // UI 갱신

    updateLeaveUI();

    alert(
      "새로운 달이 시작되었습니다.\n병가가 초기화되었습니다."
    );

  }

}
