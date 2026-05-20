// =========================
// 반차 생성
// =========================

function createHalfLeave(){

  // 연차 부족

  if(annualLeave <= 0){

    showToast(
      "연차가 부족합니다."
    );

    return;

  }

  // 확인창

  const confirmHalf =
  confirm(
    "연차 1개를 사용해 반차 2개를 생성하시겠습니까?"
  );

  if(!confirmHalf){
    return;
  }

  // 연차 차감

  annualLeave--;

  // 반차 2개 생성

  halfLeave += 2;

  // 저장

  localStorage.setItem(
    "annualLeave",
    annualLeave
  );

  localStorage.setItem(
    "halfLeave",
    halfLeave
  );

  // UI 갱신

  updateLeaveUI();

  showToast(
    "반차 2개가 생성되었습니다."
  );

}

// =========================
// 연차 사용
// =========================

function useAnnualLeave(){

  // 연차 부족

  if(annualLeave <= 0){

    showToast(
      "연차가 부족합니다."
    );

    return;

  }

  // 오늘 날짜

  const now =
  new Date();

  const today =
  `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;

  // 기존 기록 확인

  const savedRecords =
  JSON.parse(
    localStorage.getItem(
      "attendanceRecords"
    )
  ) || [];

  const alreadyExists =
  savedRecords.some(
    record => record.date === today
  );

  if(alreadyExists){

    showToast(
      "오늘은 이미 기록이 존재합니다."
    );

    return;

  }

  // 확인창

  const confirmAnnual =
  confirm(
    "연차를 사용하시겠습니까?"
  );

  if(!confirmAnnual){
    return;
  }

  // 연차 차감

  annualLeave--;

  localStorage.setItem(
    "annualLeave",
    annualLeave
  );

  // 기록 생성

  const attendanceRecord = {

    date: today,

    status: "annual",

    start: "-",

    end: "-",

    totalTime: "08:00:00",

    pay: "연차"

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

  updateLeaveUI();

  renderAttendance();

  showToast(
    "연차가 등록되었습니다."
  );

}

// =========================
// 반차 사용
// =========================

function useHalfLeave(){

  // 반차 부족

  if(halfLeave <= 0){

    showToast(
      "반차가 부족합니다."
    );

    return;

  }

  // 오늘 날짜

  const now =
  new Date();

  const today =
  `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;

  // 기존 기록 확인

  const savedRecords =
  JSON.parse(
    localStorage.getItem(
      "attendanceRecords"
    )
  ) || [];

  const alreadyExists =
  savedRecords.some(
    record => record.date === today
  );

  if(alreadyExists){

    showToast(
      "오늘은 이미 기록이 존재합니다."
    );

    return;

  }

  // 오전/오후 선택

  const halfType =
  prompt(
    "오전반차(am) / 오후반차(pm)"
  );

  // 잘못 입력

  if(
    halfType !== "am"
    &&
    halfType !== "pm"
  ){

    alert(
      "am 또는 pm만 입력 가능합니다."
    );

    return;

  }

  // 반차 차감

  halfLeave--;

  localStorage.setItem(
    "halfLeave",
    halfLeave
  );

  // 오늘 반차 상태 저장

  todayHalfType =
  halfType;

  localStorage.setItem(
    "todayHalfType",
    halfType
  );

  updateLeaveUI();

  // 상태별 기록

  const status =
  halfType === "am"
  ? "half_am"
  : "half_pm";

  // 기록 생성

  const attendanceRecord = {

    date: today,

    status: status,

    start: "-",

    end: "-",

    totalTime: "04:00:00",

    pay: "반차"

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

  renderAttendance();

  alert(
    halfType === "am"
    ? "오전반차가 등록되었습니다."
    : "오후반차가 등록되었습니다."
  );

}

// =========================
// 병가 사용
// =========================

function useSickLeave(){

  // 병가 부족

  if(sickLeave <= 0){

    alert(
      "병가가 부족합니다."
    );

    return;

  }

  // 오늘 날짜

  const now =
  new Date();

  const today =
  `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;

  // 기존 기록 확인

  const savedRecords =
  JSON.parse(
    localStorage.getItem(
      "attendanceRecords"
    )
  ) || [];

  const alreadyExists =
  savedRecords.some(
    record => record.date === today
  );

  if(alreadyExists && !isWorking){

  alert(
    "오늘은 이미 기록이 존재합니다."
  );

  return;

}

  // 확인창

  const confirmSick =
  confirm(
    "병가를 사용하시겠습니까?"
  );

  if(!confirmSick){
    return;
  }

  // 병가 차감

  sickLeave--;

  localStorage.setItem(
    "sickLeave",
    sickLeave
  );

  // 사용 회차

  const usedCount =
  2 - sickLeave;

  // 현재 근무시간

  const workedSeconds =
  getWorkedSeconds();

  // 기본 하루 급여

  const fullDayPay =
getHourlyPay() * 8;

  // 지급 급여

  let sickPay = 0;

  // =========================
  // 근무중 병가
  // =========================

  if(isWorking){

    // 1회차

    if(usedCount === 1){

      sickPay =
      fullDayPay;

    }

    // 2회차

    else{

      // 4시간 이하

      if(workedSeconds <= 14400){

        sickPay =
        Math.floor(
          fullDayPay * 0.5
        );

      }

      // 4시간 초과

      else{

        sickPay =
        calculatePay(
          workedSeconds
        );

      }

    }

    // 휴식 종료

    if(isResting){

      clearInterval(
        restTimer
      );

      isResting = false;

    }

    // 점심 종료

    if(isLunch){

      clearInterval(
        lunchTimer
      );

      isLunch = false;

    }

    // 자리비움 종료

    if(isAway){

      clearInterval(
        awayTimer
      );

      isAway = false;

    }

    // 누적 시간 반영

    weeklySeconds +=
    workedSeconds;

    totalSeconds +=
    workedSeconds;

    localStorage.setItem(
      "weeklySeconds",
      weeklySeconds
    );

    localStorage.setItem(
      "totalSeconds",
      totalSeconds
    );

    updateWeeklyTime();

    // 근무 종료 처리

    isWorking = false;

    localStorage.removeItem(
      "isWorking"
    );

    localStorage.removeItem(
      "workStartTimestamp"
    );

    setWorkState("off");

    startBtn.disabled = false;

    endBtn.disabled = true;

  }

  // =========================
  // 출근 전 병가
  // =========================

  else{

    // 1회차

    if(usedCount === 1){

      sickPay =
      fullDayPay;

    }

    // 2회차

    else{

      sickPay =
      Math.floor(
        fullDayPay * 0.5
      );

    }

  }

// =========================
// 월급 적립
// =========================

monthlyPay += sickPay;

localStorage.setItem(
  "monthlyPay",
  monthlyPay
);

  updateLeaveUI();

  // =========================
  // 기록 저장
  // =========================

  const attendanceRecord = {

    date: today,

    status: "sick",

    start:
    isWorking
    ? startWorkTime
    : "-",

    end: "-",

    totalTime:
    formatTime(workedSeconds),

    pay:
    `${sickPay.toLocaleString()}원`

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

  renderAttendance();

  // =========================
  // UI 초기화
  // =========================

  hour = 0;
  minute = 0;
  second = 0;

  workTime.textContent =
  "00:00:00";

  dailyPay.textContent =
  "+0원";

  alert(
    "병가가 등록되었습니다."
  );

}

// =========================
// 상태 저장
// =========================

function saveState(){

  localStorage.setItem(
    "isWorking",
    JSON.stringify(isWorking)
  );

  localStorage.setItem(
    "isResting",
    JSON.stringify(isResting)
  );

  localStorage.setItem(
    "restUsed",
    JSON.stringify(restUsed)
  );

  localStorage.setItem(
    "restSeconds",
    restSeconds
  );

  localStorage.setItem(
    "isLunch",
    JSON.stringify(isLunch)
  );

  localStorage.setItem(
    "lunchUsed",
    JSON.stringify(lunchUsed)
  );

  localStorage.setItem(
    "lunchSeconds",
    lunchSeconds
  );

  localStorage.setItem(
    "isAway",
    JSON.stringify(isAway)
  );

  localStorage.setItem(
    "awayCount",
    awayCount
  );

  localStorage.setItem(
    "awaySeconds",
    awaySeconds
  );

}
