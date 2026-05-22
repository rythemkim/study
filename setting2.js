// =========================
// 저장 데이터 복원
// =========================

const savedNickname =
localStorage.getItem(
  "nickname"
);

if(savedNickname){

  homeNickname.textContent =
  savedNickname;

  officeNickname.textContent =
  savedNickname;

  nicknameInput.value =
  savedNickname;

}

const savedDepartment =
localStorage.getItem(
  "department"
);

if(savedDepartment){

  homeDepartment.textContent =
  savedDepartment;

  officeDepartment.textContent =
  savedDepartment;

  departmentInput.value =
  savedDepartment;

  departmentSlash.style.display =
  "inline";

}else{

  departmentSlash.style.display =
  "none";

}

// =========================
// 입사일 복원
// =========================

if(joinDate !== ""){

  joinDateInput.value =
  joinDate;

  joinDateInput.disabled =
  true;

}

// =========================
// 프로필 패널 열기
// =========================

profileMenuBtn.addEventListener(
  "click",
  ()=>{

    profilePanel.style.display =
    "block";

  }
);

// =========================
// 프로필 패널 닫기
// =========================

profileBackBtn.addEventListener(
  "click",
  ()=>{

    profilePanel.style.display =
    "none";

  }
);

// =========================
// 프로필 저장
// =========================

saveProfileBtn.addEventListener(
  "click",
  ()=>{

    const nickname =
    nicknameInput.value;

    const department =
    departmentInput.value;

    const inputDate =
    joinDateInput.value;

    // 저장

    localStorage.setItem(
      "nickname",
      nickname
    );

    localStorage.setItem(
      "department",
      department
    );

    // 닉네임 반영

    homeNickname.textContent =
    nickname;

    officeNickname.textContent =
    nickname;

    // 부서 반영

    homeDepartment.textContent =
    department;

    officeDepartment.textContent =
    department;

    // 슬래시 처리

    if(department){

      departmentSlash.style.display =
      "inline";

    }else{

      departmentSlash.style.display =
      "none";

    }

    // 입사일 저장

    // 입사일 저장

if(inputDate !== ""){

  joinDate = inputDate;

  localStorage.setItem(
    "joinDate",
    inputDate
  );

  joinDateInput.disabled =
  true;

  updateCareerDays();

}

    showToast(
      "프로필이 저장되었습니다."
    );

    profilePanel.style.display =
    "none";

  }
);

// =========================
// 근무설정 패널 열기
// =========================

workSettingMenuBtn
.addEventListener(
  "click",
  ()=>{

    workSettingPanel.style.display =
    "block";

  }
);

// =========================
// 근무설정 패널 닫기
// =========================

workSettingBackBtn
.addEventListener(
  "click",
  ()=>{

    workSettingPanel.style.display =
    "none";

  }
);

// =========================
// 자동 변경 방지
// =========================

let isAutoChanging = false;

// =========================
// 출근시간 변경
// =========================

settingStartTime.addEventListener(
  "change",
  ()=>{

    if(isAutoChanging){
      return;
    }

    const value =
    settingStartTime.value;

    if(!value){
      return;
    }

    const [hour, minute] =
    value.split(":").map(Number);

    const endHour =
    (hour + 9) % 24;

    isAutoChanging = true;

    settingEndTime.value =
    `${String(endHour).padStart(2,"0")}:${String(minute).padStart(2,"0")}`;

    isAutoChanging = false;

  }
);

// =========================
// 퇴근시간 변경
// =========================

settingEndTime.addEventListener(
  "change",
  ()=>{

    if(isAutoChanging){
      return;
    }

    const value =
    settingEndTime.value;

    if(!value){
      return;
    }

    const [hour, minute] =
    value.split(":").map(Number);

    const startHour =
    (hour - 9 + 24) % 24;

    isAutoChanging = true;

    settingStartTime.value =
    `${String(startHour).padStart(2,"0")}:${String(minute).padStart(2,"0")}`;

    isAutoChanging = false;

  }
);

// =========================
// 근무설정 저장
// =========================

saveWorkSettingBtn
.addEventListener(
  "click",
  ()=>{

    const start =
    settingStartTime.value;

    const end =
    settingEndTime.value;

    const [
      startHour,
      startMinute
    ] = start.split(":");

    const [
      endHour,
      endMinute
    ] = end.split(":");

    // 실제 변수 반영

    workStartHour =
    Number(startHour);

    workStartMinute =
    Number(startMinute);

    workEndHour =
    Number(endHour);

    workEndMinute =
    Number(endMinute);

    // 저장

    localStorage.setItem(
      "workStartHour",
      workStartHour
    );

    localStorage.setItem(
      "workStartMinute",
      workStartMinute
    );

    localStorage.setItem(
      "workEndHour",
      workEndHour
    );

    localStorage.setItem(
      "workEndMinute",
      workEndMinute
    );

    // UI 갱신

    updateOfficeTime();

    updateRemainingTime();

    showToast(
      "근무 설정이 저장되었습니다."
    );

    workSettingPanel.style.display =
    "none";

  }
);

// =========================
// 출퇴근 기록 패널
// =========================

attendanceMenuBtn
.addEventListener(
  "click",
  ()=>{

    attendancePanel.style.display =
    "block";

    attendancePanelContent.innerHTML =
    attendanceList.innerHTML;

  }
);

attendanceBackBtn
.addEventListener(
  "click",
  ()=>{

    attendancePanel.style.display =
    "none";

  }
);

// =========================
// 커리어기록
// =========================

careerMenuBtn
.addEventListener(
  "click",
  ()=>{

    careerPanel.style.display =
    "block";

  }
);

careerBackBtn
.addEventListener(
  "click",
  ()=>{

    careerPanel.style.display =
    "none";

  }
);

monthlyMenuBtn
.addEventListener(
  "click",
  ()=>{

    monthlyPanel.style.display =
    "block";

renderMonthlyHistory();

  }
);

monthlyBackBtn
.addEventListener(
  "click",
  ()=>{

    monthlyPanel.style.display =
    "none";

  }
);

promotionMenuBtn
.addEventListener(
  "click",
  ()=>{

    promotionPanel.style.display =
    "block";

    renderPromotionHistory();

  }
);

promotionBackBtn
.addEventListener(
  "click",
  ()=>{

    promotionPanel.style.display =
    "none";

  }
);

bonusMenuBtn
.addEventListener(
  "click",
  ()=>{

    bonusPanel.style.display =
    "block";

    renderBonusHistory();

  }
);

bonusBackBtn
.addEventListener(
  "click",
  ()=>{

    bonusPanel.style.display =
    "none";

  }
);

// =========================
// 구매 목록
// =========================

achievementMenuBtn
.addEventListener(
  "click",
  ()=>{

    achievementPanel.style.display =
    "block";

    renderAchievementHistory();

  }
);

achievementBackBtn
.addEventListener(
  "click",
  ()=>{

    achievementPanel.style.display =
    "none";

  }
);

// =========================
// 직급 및 시급
// =========================

positionMenuBtn
.addEventListener(
  "click",
  ()=>{

    positionPanel.style.display =
    "block";

    renderPositionInfo();

  }
);

positionBackBtn
.addEventListener(
  "click",
  ()=>{

    positionPanel.style.display =
    "none";

  }
);

// =========================
// 목표관리 디데이
// =========================

goalSettingMenuBtn
.addEventListener(
  "click",
  ()=>{

    goalSettingPanel.style.display =
    "block";

    renderGoals();

  }
);

goalSettingBackBtn
.addEventListener(
  "click",
  ()=>{

    goalSettingPanel.style.display =
    "none";

  }
);

addGoalBtn
.addEventListener(
  "click",
  ()=>{

    const title =
    goalTitleInput.value.trim();

    const date =
    goalDateInput.value;

    if(title === ""){

      showToast(
        "목표를 입력해주세요."
      );

      return;

    }

    goals.push({

      title,
      date,
      isMain:false

    });

    localStorage.setItem(
      "goals",
      JSON.stringify(goals)
    );

    goalTitleInput.value =
    "";

    goalDateInput.value =
    "";

    renderGoals();

    updateDday();

    showToast(
      "목표가 추가되었습니다."
    );

  }
);

// =========================
// 프로필 이미지 변경
// =========================

profileImage.addEventListener(
  "click",
  ()=>{

    profileImageInput.click();

  }
);

profileImageInput.addEventListener(
  "change",
  (event)=>{

    const file =
    event.target.files[0];

    if(!file){
      return;
    }

    const reader =
    new FileReader();

    reader.onload = (e)=>{

      const imageData =
      e.target.result;

      profilePreview.src =
      imageData;

officeProfilePreview.src =
imageData;

officeProfilePreview.style.display =
"block";

officeDefaultProfileIcon.style.display =
"none";
      profilePreview.style.display =
      "block";

      defaultProfileIcon.style.display =
      "none";

      localStorage.setItem(
        "profileImage",
        imageData
      );

    };

    reader.readAsDataURL(file);

  }
);

// =========================
// 오늘의 목표
// =========================

goalMemoText.addEventListener(
  "click",
  ()=>{

    const newMemo =
    prompt(
      "목표 한마디를 입력하세요"
    );

    if(!newMemo){
      return;
    }

    goalMemoText.textContent =
    newMemo;

    localStorage.setItem(
      "goalMemo",
      newMemo
    );

  }
);

// =========================
// 환경설정
// =========================

appSettingMenuBtn
.addEventListener(
  "click",
  ()=>{

    appSettingPanel.style.display =
    "block";

  }
);

appSettingBackBtn
.addEventListener(
  "click",
  ()=>{

    appSettingPanel.style.display =
    "none";

  }
);

// =========================
// 다크모드 토글
// =========================

darkModeBtn
.addEventListener(
  "click",
  ()=>{

    isDarkMode =
    !isDarkMode;

    localStorage.setItem(
      "isDarkMode",
      JSON.stringify(
        isDarkMode
      )
    );

    updateDarkMode();

    showToast(

      isDarkMode
      ? "다크모드가 활성화되었습니다."
      : "다크모드가 비활성화되었습니다."

    );

  }
);

// =========================
// 진동 설정
// =========================

vibrationBtn
.addEventListener(
  "click",
  ()=>{

    isVibrationOn =
    !isVibrationOn;

    localStorage.setItem(
      "isVibrationOn",
      JSON.stringify(
        isVibrationOn
      )
    );

    updateVibrationUI();

    showToast(

      isVibrationOn
      ? "진동이 활성화되었습니다."
      : "진동이 비활성화되었습니다."

    );

  }
);

// =========================
// 데이터 관리
// =========================

dataMenuBtn
.addEventListener(
  "click",
  ()=>{

    dataPanel.style.display =
    "block";

  }
);

dataBackBtn
.addEventListener(
  "click",
  ()=>{

    dataPanel.style.display =
    "none";

  }
);

// =========================
// 테스트 머니
// =========================

if(testMoneyBtn){

  testMoneyBtn
  .addEventListener(
    "click",
    ()=>{

      totalPay += 1000000;

      localStorage.setItem(
        "totalPay",
        totalPay
      );

      updateTotalInfo();

      showToast(
        "테스트 머니 +100만원 지급"
      );

    }
  );

}

// =========================
// 구매목록 초기화
// =========================

if(resetPurchaseBtn){

  resetPurchaseBtn
  .addEventListener(
    "click",
    ()=>{

      const confirmReset =
      confirm(
        "구매목록을 초기화하시겠습니까?"
      );

      if(!confirmReset){
        return;
      }

      localStorage.removeItem(
        "purchaseHistory"
      );

      renderAchievementHistory();

      showToast(
        "구매목록이 초기화되었습니다."
      );

    }
  );

}

// =========================
// 목표 초기화
// =========================

if(resetGoalBtn){

  resetGoalBtn
  .addEventListener(
    "click",
    ()=>{

      const confirmReset =
      confirm(
        "목표 데이터를 초기화하시겠습니까?"
      );

      if(!confirmReset){
        return;
      }

      goals = [];

      localStorage.setItem(
        "goals",
        JSON.stringify(goals)
      );

      renderGoals();

      updateDday();

      showToast(
        "목표 데이터가 초기화되었습니다."
      );

    }
  );

}

// =========================
// 전체 데이터 초기화
// =========================

if(resetAllBtn){

  resetAllBtn
  .addEventListener(
    "click",
    ()=>{

      const confirmReset =
      confirm(
`전체 데이터를 초기화하시겠습니까?

모든 기록이 삭제됩니다.`
      );

      if(!confirmReset){
        return;
      }

      localStorage.clear();

      location.reload();

    }
  );

}