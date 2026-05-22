// =========================
// 출근
// =========================

function startWork(){

  if(isWorking){

    showToast(
      "이미 근무중입니다."
    );

    return;

  }

  const confirmStart =
  confirm(
    "출근하시겠습니까?"
  );

  if(!confirmStart){
    return;
  }

  isWorking = true;

isResting = false;
isLunch = false;

totalBreakSeconds = 0;

localStorage.setItem(
  "totalBreakSeconds",
  0
);

playVibration(70);

restUsed = false;

restSeconds = 1800;

updateRestUI();

restBtn.disabled = false;

restBtn.textContent =
"시작하기";

restBtn.style.background =
"#168845";

restBtn.style.cursor =
"pointer";

lunchUsed = false;

lunchSeconds = 1800;

updateLunchUI();

lunchBtn.disabled = false;

lunchBtn.textContent =
"시작하기";

lunchBtn.style.background =
"#168845";

lunchBtn.style.cursor =
"pointer";

isAway = false;

awayCount = 5;

awaySeconds =
Math.max(
  60,
  600 -
  (awayPenaltyMinutes * 60)
);

updateAwayUI();

workStartTimestamp =
Date.now();

localStorage.setItem(
  "workStartTimestamp",
  workStartTimestamp
);

localStorage.setItem(
  "isWorking",
  "true"
);

saveState();

  const now =
  new Date();

// 현재 시간

const currentMinutes =
(now.getHours() * 60)
+
now.getMinutes();

// 기본 출근시간

let lateBaseMinutes =
(workStartHour * 60)
+
workStartMinute;

// 오전반차면 +5시간

if(todayHalfType === "am"){

  lateBaseMinutes += 300;

}

// 11분 이후 지각

isLate =
currentMinutes
>
(lateBaseMinutes + 10);

if(isLate){

  increaseLateCount();

renderMonthlySummary();

}

  startWorkTime =
  `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;

  setWorkState("working");

  startBtn.disabled = true;

  endBtn.disabled = false;

  startBtn.style.opacity =
  "0.45";

  endBtn.style.opacity =
  "1";

  showToast(
  "근무를 시작합니다."
);

}

// =========================
// 퇴근
// =========================

function endWork(){

  if(!isWorking){

    showToast(
      "현재 근무중이 아닙니다."
    );

    return;

  }

  const currentPay =
  dailyPay.textContent;

  const confirmEnd =
confirm(
`일 누적 급여 ${currentPay}

정산하시겠습니까?`
);

  if(!confirmEnd){
    return;

  }

  // =========================
  // 오늘 근무시간
  // =========================

  const todaySeconds =
  getWorkedSecondsV2();

// 오후반차 최소 근무시간

if(
  todayHalfType === "pm"
  &&
  todaySeconds < 14400
){

  showToast(
    "오후반차는 4시간 이상 근무해야 합니다."
  );

  return;

}

  // =========================
  // 주간 누적
  // =========================

  weeklySeconds +=
  todaySeconds;

  localStorage.setItem(
    "weeklySeconds",
    weeklySeconds
  );

  updateWeeklyTime();

  // =========================
  // 총 누적 시간
  // =========================

  totalSeconds +=
  todaySeconds;

  localStorage.setItem(
    "totalSeconds",
    totalSeconds
  );

monthlySeconds +=
todaySeconds;

localStorage.setItem(
  "monthlySeconds",
  monthlySeconds
);

  // =========================
  // 총 누적 급여
  // =========================

  const payNumber =
  parseInt(
    currentPay.replace(
      /[^0-9]/g,
      ""
    )
  ) || 0;

  monthlyPay += payNumber;

totalPay += payNumber;

localStorage.setItem(
  "monthlyPay",
  monthlyPay
);

  localStorage.setItem(
    "totalPay",
    totalPay
  );

  updateTotalInfo();

// 경험치 계산

const exp =
Math.floor(
  todaySeconds / 360
);

// 경험치 지급

addExp(exp);

  // =========================
  // 연차 생성
  // =========================

  const currentHours =
  Math.floor(
    totalSeconds / 3600
  );

  if(
    currentHours
    >=
    lastAnnualHours + 60
  ){

    annualLeave++;

    lastAnnualHours =
    currentHours;

    localStorage.setItem(
      "annualLeave",
      annualLeave
    );

    localStorage.setItem(
      "lastAnnualHours",
      lastAnnualHours
    );

    updateAnnualCount();

renderAnnualSummary();

    showToast(
      "연차 1개 생성되었습니다."
    );

  }

 // =========================
// 근무 종료
// =========================

isWorking = false;

// 휴식 시간 제외

totalBreakSeconds = 0;

localStorage.setItem(
  "totalBreakSeconds",
  0
);

// 자리비움 초기화

awayPenaltyMinutes = 0;

localStorage.setItem(
  "awayPenaltyMinutes",
  0
);

playVibration(180);

// 저장 삭제

localStorage.removeItem(
  "workStartTimestamp"
);

localStorage.setItem(
  "isWorking",
  "false"
);

setWorkState("off");

saveState();

startBtn.disabled = false;

endBtn.disabled = true;

startBtn.style.opacity =
"1";

endBtn.style.opacity =
"0.45";

  // =========================
  // 출퇴근 기록 저장
  // =========================

  const endNow =
  new Date();

  const endWorkTime =
  `${String(endNow.getHours()).padStart(2,"0")}:${String(endNow.getMinutes()).padStart(2,"0")}`;

  const today =
  `${endNow.getFullYear()}-${String(endNow.getMonth()+1).padStart(2,"0")}-${String(endNow.getDate()).padStart(2,"0")}`;

  const attendanceRecord = {

  date: today,

  start: startWorkTime,

  end: endWorkTime,

  totalTime:
  workTime.textContent,

  pay:
  dailyPay.textContent,

  status:
todayHalfType === "am"
? "half_am"
: todayHalfType === "pm"
? "half_pm"
: isLate
? "late"
: "normal"

};

  const savedRecords =
  JSON.parse(
    localStorage.getItem(
      "attendanceRecords"
    )
  ) || [];

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
  // 완료 알림
  // =========================

  showToast(
`오늘도 고생하셨습니다.

${currentPay}
모으기 완료`
  );

  // =========================
  // 초기화
  // =========================

  workTime.textContent =
  "00:00:00";

  dailyPay.textContent =
  "+0원";

isLate = false;

// 반차 상태 초기화

todayHalfType = null;

localStorage.removeItem(
  "todayHalfType"
);

}

// =========================
// 휴식 시작
// =========================

function startRest(){

  // 근무중 아닐 때

  if(!isWorking){

    showToast(
      "근무중일 때만 가능합니다."
    );

    return;

  }

// 이미 휴식중

if(isResting){
  return;
}

// 점심중 차단

if(isLunch){

  alert(
    "점심중에는 사용할 수 없습니다."
  );

  return;

}

if(isAway){

  alert(
    "자리비움중에는 사용할 수 없습니다."
  );

  return;

}

// 이미 사용 완료

if(restUsed){

  alert(
    "휴식은 1회만 가능합니다."
  );

  return;

}

// 확인창

const confirmRest =
confirm(
  "휴식을 시작하시겠습니까?"
);

if(!confirmRest){
  return;
}

  isResting = true;

restStartTimestamp =
Date.now();

localStorage.setItem(
  "restStartTimestamp",
  restStartTimestamp
);

playVibration(60);

setWorkState("rest");

  restBtn.textContent =
  "휴식 종료";

saveState();

  // 휴식 타이머

  restTimer = setInterval(()=>{

    restSeconds--;

    updateRestUI();

saveState();

    // 종료

    if(restSeconds <= 0){

      endRest();

playVibration(100);

      showToast(
        "휴식이 종료되었습니다."
      );

    }

  },1000);

}

// =========================
// 점심 시작
// =========================

function startLunch(){

  // 근무중 아닐 때

  if(!isWorking){

    showToast(
      "근무중일 때만 가능합니다."
    );

    return;

  }

  // 이미 점심중

  if(isLunch){
    return;
  }

  // 휴식중 차단

  if(isResting){

    alert(
      "휴식중에는 사용할 수 없습니다."
    );

    return;

  }

if(isAway){

  alert(
    "자리비움중에는 사용할 수 없습니다."
  );

  return;

}

  // 이미 사용 완료

  if(lunchUsed){

    alert(
      "점심은 1회만 가능합니다."
    );

    return;

  }

  // 확인창

  const confirmLunch =
  confirm(
    "점심을 시작하시겠습니까?"
  );

  if(!confirmLunch){
    return;
  }

  // 점심 시작

  isLunch = true;

lunchStartTimestamp =
Date.now();

localStorage.setItem(
  "lunchStartTimestamp",
  lunchStartTimestamp
);

playVibration(60);

setWorkState("lunch");

saveState();

  lunchBtn.textContent =
  "점심 종료";

  // 타이머 시작

  lunchTimer =
  setInterval(()=>{

    lunchSeconds--;

    updateLunchUI();

saveState();

    // 종료

    if(lunchSeconds <= 0){

      endLunch();

playVibration(100);

      alert(
        "점심시간이 종료되었습니다."
      );

    }

  },1000);

}

// =========================
// 자리비움 시작
// =========================

function startAway(){

  // 근무중 아닐 때

  if(!isWorking){

    alert(
      "근무중일 때만 가능합니다."
    );

    return;

  }

  // 이미 자리비움중

  if(isAway){
    return;
  }

  // 휴식/점심 차단

  if(isResting || isLunch){

    alert(
      "휴식/점심중에는 사용할 수 없습니다."
    );

    return;

  }

  // 횟수 부족

  if(awayCount <= 0){

    alert(
      "남은 횟수가 없습니다."
    );

    return;

  }

  // 확인창

  const confirmAway =
  confirm(
    "자리비움을 시작하시겠습니까?"
  );

  if(!confirmAway){
    return;
  }

  // 상태 시작

  isAway = true;

awayStartTimestamp =
Date.now();

localStorage.setItem(
  "awayStartTimestamp",
  awayStartTimestamp
);

playVibration(50);

saveState();

  // 횟수 차감

  awayCount--;

  updateAwayUI();

  // 상태 표시

  setWorkState("away");

  // 타이머 시작

awayTimer =
setInterval(()=>{

  if(awaySeconds > 0){

    awaySeconds--;

    updateAwayUI();

    saveState();

  }

  // 0되면 자동 종료

  if(awaySeconds <= 0){

    clearInterval(
      awayTimer
    );

    // 자리비움 종료

    isAway = false;

    // 패널티 증가

    awayPenaltyMinutes++;

    localStorage.setItem(
      "awayPenaltyMinutes",
      awayPenaltyMinutes
    );

    // 다음 자리비움 시간 갱신

    awaySeconds =
    Math.max(
      60,
      600 -
      (awayPenaltyMinutes * 60)
    );

    updateAwayUI();

    saveState();

    // 근무 상태 복귀

    setWorkState("working");

    showToast(
`자리비움 시간이 감소했습니다.

현재 ${
  Math.max(
    1,
    10 - awayPenaltyMinutes
  )
}분`
    );

    playVibration(
      [80,40,80]
    );

  }

},1000);

}

// =========================
// 점심 종료
// =========================

function endLunch(){

  // 타이머 종료

  clearInterval(
    lunchTimer
  );

localStorage.removeItem(
  "lunchStartTimestamp"
);

  // 상태 종료

  isLunch = false;

const lunchSecondsUsed =
Math.floor(
  (
    Date.now()
    -
    lunchStartTimestamp
  ) / 1000
);

totalBreakSeconds +=
lunchSecondsUsed;

localStorage.setItem(
  "totalBreakSeconds",
  totalBreakSeconds
);

playVibration(100);

setWorkState("working");

  lunchUsed = true;

  // 00:00 유지

  lunchSeconds = 0;

saveState();

  updateLunchUI();

  // 버튼 변경

  lunchBtn.textContent =
  "사용완료";

  lunchBtn.disabled = true;

  lunchBtn.style.background =
  "#cfcfcf";

  lunchBtn.style.cursor =
  "default";

}

// =========================
// 휴식 종료
// =========================

function endRest(){

  // 타이머 종료

  clearInterval(
    restTimer
  );

localStorage.removeItem(
  "restStartTimestamp"
);

  // 상태 종료

  isResting = false;

playVibration(100);

  restUsed = true;

// 실제 휴식 시간 계산

const restSecondsUsed =
Math.floor(
  (
    Date.now()
    -
    restStartTimestamp
  ) / 1000
);

// 비근무 누적

totalBreakSeconds +=
restSecondsUsed;

localStorage.setItem(
  "totalBreakSeconds",
  totalBreakSeconds
);

  // 00:00 유지

  restSeconds = 0;

saveState();

setWorkState("working");

  updateRestUI();

  // 버튼 변경

  restBtn.textContent =
  "사용완료";

  restBtn.disabled = true;

  restBtn.style.background =
  "#cfcfcf";

  restBtn.style.cursor =
  "default";

}

// =========================
// 자리비움 종료
// =========================

function endAway(){

  // 자리비움중 아닐 때

  if(!isAway){
    return;
  }

  // 타이머 종료

  clearInterval(
    awayTimer
  );

localStorage.removeItem(
  "awayStartTimestamp"
);

  // 상태 종료

  isAway = false;

const awaySecondsUsed =
Math.floor(
  (
    Date.now()
    -
    awayStartTimestamp
  ) / 1000
);

totalBreakSeconds +=
awaySecondsUsed;

localStorage.setItem(
  "totalBreakSeconds",
  totalBreakSeconds
);

playVibration(100);

saveState();

  // 타이머 초기화

  awaySeconds =
Math.max(
  60,
  600 -
  (awayPenaltyMinutes * 60)
);

  updateAwayUI();

saveState();

  // 상태 복귀

  setWorkState("working");

}

// =========================
// 휴식 복구
// =========================

function resumeRestTimer(){

  clearInterval(
    restTimer
  );

  restTimer =
  setInterval(()=>{

    restSeconds--;

    updateRestUI();

    saveState();

    if(restSeconds <= 0){

      endRest();

      showToast(
        "휴식이 종료되었습니다."
      );

    }

  },1000);

}

// =========================
// 점심 복구
// =========================

function resumeLunchTimer(){

  clearInterval(
    lunchTimer
  );

  lunchTimer =
  setInterval(()=>{

    lunchSeconds--;

    updateLunchUI();

    saveState();

    if(lunchSeconds <= 0){

      endLunch();

      showToast(
        "점심시간이 종료되었습니다."
      );

    }

  },1000);

}

// =========================
// 자리비움 복구
// =========================

function resumeAwayTimer(){

  clearInterval(
    awayTimer
  );

  awayTimer =
setInterval(()=>{

  if(awaySeconds > 0){

    awaySeconds--;

    updateAwayUI();

    saveState();

  }

    if(awaySeconds <= 0){

      clearInterval(
        awayTimer
      );

      isAway = false;

      awayPenaltyMinutes++;

      localStorage.setItem(
        "awayPenaltyMinutes",
        awayPenaltyMinutes
      );

      awaySeconds =
      Math.max(
        60,
        600 -
        (awayPenaltyMinutes * 60)
      );

      updateAwayUI();

      saveState();

      setWorkState("working");

      showToast(
        "자리비움 시간이 감소했습니다."
      );

    }

  },1000);

}

// =========================
// 시계 업데이트
// =========================

function updateClock(){

  if(
    !isWorking
    ||
    isResting
    ||
    isLunch
    ||
    isAway
  ){
    return;
  }

  updateWorkUI();

  updateRemainingTime();

}

// =========================
// 상태 불러오기
// =========================

function loadState(){

isWorking =
localStorage.getItem(
  "isWorking"
) === "true";

weeklySeconds =
Number(
  localStorage.getItem(
    "weeklySeconds"
  )
) || 0;

monthlyPay =
Number(
  localStorage.getItem(
    "monthlyPay"
  )
) || 0;

totalPay =
Number(
  localStorage.getItem(
    "totalPay"
  )
) || 0;

monthlySeconds =
Number(
  localStorage.getItem(
    "monthlySeconds"
  )
) || 0;

totalSeconds =
Number(
  localStorage.getItem(
    "totalSeconds"
  )
) || 0;

totalBreakSeconds =
Number(
  localStorage.getItem(
    "totalBreakSeconds"
  )
) || 0;

workStartTimestamp =
Number(
  localStorage.getItem(
    "workStartTimestamp"
  )
) || null;

  isResting =
  JSON.parse(
    localStorage.getItem(
      "isResting"
    )
  ) || false;

  restUsed =
  JSON.parse(
    localStorage.getItem(
      "restUsed"
    )
  ) || false;

  restSeconds =
  Number(
    localStorage.getItem(
      "restSeconds"
    )
  ) || 1800;

restStartTimestamp =
Number(
  localStorage.getItem(
    "restStartTimestamp"
  )
) || 0;

lunchStartTimestamp =
Number(
  localStorage.getItem(
    "lunchStartTimestamp"
  )
) || 0;

awayStartTimestamp =
Number(
  localStorage.getItem(
    "awayStartTimestamp"
  )
) || 0;

  isLunch =
  JSON.parse(
    localStorage.getItem(
      "isLunch"
    )
  ) || false;

  lunchUsed =
  JSON.parse(
    localStorage.getItem(
      "lunchUsed"
    )
  ) || false;

  lunchSeconds =
  Number(
    localStorage.getItem(
      "lunchSeconds"
    )
  ) || 1800;

  isAway =
  JSON.parse(
    localStorage.getItem(
      "isAway"
    )
  ) || false;

awayPenaltyMinutes =
Number(
  localStorage.getItem(
    "awayPenaltyMinutes"
  )
) || 0;

const baseAwaySeconds =
Math.max(
  60,
  600 -
  (awayPenaltyMinutes * 60)
);

awaySeconds =
baseAwaySeconds;

  const savedAwayCount =
localStorage.getItem(
  "awayCount"
);

awayCount =
savedAwayCount !== null
? Number(savedAwayCount)
: 5;

if(isResting && restStartTimestamp){

  const elapsed =
  Math.floor(
    (
      Date.now()
      -
      restStartTimestamp
    ) / 1000
  );

  restSeconds =
  Math.max(
    1800 - elapsed,
    0
  );

  resumeRestTimer();

}

if(isLunch && lunchStartTimestamp){

  const elapsed =
  Math.floor(
    (
      Date.now()
      -
      lunchStartTimestamp
    ) / 1000
  );

  lunchSeconds =
  Math.max(
    1800 - elapsed,
    0
  );

  resumeLunchTimer();

}

if(isAway && awayStartTimestamp){

  const elapsed =
  Math.floor(
    (
      Date.now()
      -
      awayStartTimestamp
    ) / 1000
  );

  awaySeconds =
  Math.max(
    awaySeconds - elapsed,
    0
  );

  resumeAwayTimer();

}

}