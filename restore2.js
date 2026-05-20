function restoreUI(){

  // =========================
  // 휴식 사용완료 UI 복원
  // =========================

  if(restUsed){

    restSeconds = 0;

    updateRestUI();

    restBtn.textContent =
    "사용완료";

    restBtn.disabled = true;

    restBtn.style.background =
    "#cfcfcf";

    restBtn.style.cursor =
    "default";

  }

  // =========================
  // 점심 사용완료 UI 복원
  // =========================

  if(lunchUsed){

    lunchSeconds = 0;

    updateLunchUI();

    lunchBtn.textContent =
    "사용완료";

    lunchBtn.disabled = true;

    lunchBtn.style.background =
    "#cfcfcf";

    lunchBtn.style.cursor =
    "default";

  }

// =========================
// 근무 상태 복원
// =========================

if(isResting){

  setWorkState("rest");

}
else if(isLunch){

  setWorkState("lunch");

}
else if(isAway){

  setWorkState("away");

}
else if(isWorking){

  setWorkState("working");

}
else{

  setWorkState("off");

}

// 버튼 상태

if(isWorking){

  startBtn.disabled = true;

  endBtn.disabled = false;

  startBtn.style.opacity =
  "0.45";

  endBtn.style.opacity =
  "1";

}else{

  startBtn.disabled = false;

  endBtn.disabled = true;

  startBtn.style.opacity =
  "1";

  endBtn.style.opacity =
  "0.45";

}

if(isWorking && workStartTimestamp){

  const now =
  Date.now();

  const diffSeconds =
  Math.floor(
    (now - workStartTimestamp)
    / 1000
  );

  hour =
  Math.floor(
    diffSeconds / 3600
  );

  minute =
  Math.floor(
    (diffSeconds % 3600) / 60
  );

  second =
  diffSeconds % 60;

  updateWorkUI();

}

// =========================
// 휴식 복원
// =========================

if(isResting && !restUsed){

  restBtn.textContent =
  "휴식 종료";

  restTimer = setInterval(()=>{

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
// 점심 복원
// =========================

if(isLunch){

  lunchBtn.textContent =
  "점심 종료";

  lunchTimer = setInterval(()=>{

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
// 자리비움 복원
// =========================

if(isAway){

  awayTimer = setInterval(()=>{

    awaySeconds--;

    updateAwayUI();

    saveState();

    if(awaySeconds <= 0){

      clearInterval(
        awayTimer
      );

    }

  },1000);

}

}