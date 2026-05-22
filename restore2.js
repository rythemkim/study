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

}

// =========================
// 프로필 이미지
// =========================

const savedProfileImage =
localStorage.getItem(
  "profileImage"
);

if(savedProfileImage){

  profilePreview.src =
  savedProfileImage;

  profilePreview.style.display =
  "block";

  defaultProfileIcon.style.display =
  "none";

}

if(savedProfileImage){

  // 홈

  profilePreview.src =
  savedProfileImage;

  profilePreview.style.display =
  "block";

  defaultProfileIcon.style.display =
  "none";

  // 오피스

  officeProfilePreview.src =
  savedProfileImage;

  officeProfilePreview.style.display =
  "block";

  officeDefaultProfileIcon.style.display =
  "none";

}

// =========================
// 오늘의 목표
// =========================

const savedGoalMemo =
localStorage.getItem(
  "goalMemo"
);

if(savedGoalMemo){

  goalMemoText.textContent =
  savedGoalMemo;

}