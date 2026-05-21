// =========================
// Lucide SVG 아이콘 생성
// =========================

lucide.createIcons();

// =========================
// 타이머 시작
// =========================

timer = setInterval(
  updateClock,
  1000
);

// =========================
// 버튼 이벤트
// =========================

startBtn.addEventListener(
  "click",
  startWork
);

endBtn.addEventListener(
  "click",
  endWork
);

halfCreateBtn.addEventListener(
  "click",
  useHalfLeave
);

annualLeaveBtn.addEventListener(
  "click",
  useAnnualLeave
);

sickLeaveBtn.addEventListener(
  "click",
  useSickLeave
);

// =========================
// 휴식 버튼
// =========================

restBtn.addEventListener(
  "click",
  ()=>{

    if(isResting){

      endRest();

    }else{

      startRest();

    }

  }
);

// =========================
// 점심 버튼
// =========================

lunchBtn.addEventListener(
  "click",
  ()=>{

    if(isLunch){

      endLunch();

    }else{

      startLunch();

    }

  }
);

// =========================
// 자리비움 시작 버튼
// =========================

awayStartBtn.addEventListener(
  "click",
  startAway
);

// =========================
// 자리비움 종료 버튼
// =========================

awayEndBtn.addEventListener(
  "click",
  endAway
);

// =========================
// 상세 패널 열기
// =========================

if(detailBtn){

  detailBtn.addEventListener(
    "click",
    ()=>{

      detailPanel.classList.toggle(
        "active"
      );

    }
  );

}

// =========================
// 최초 실행
// =========================

loadState();

restoreUI();

checkTimeReset();

checkMonthChange();

initMonthlyStats();

updateWeeklyTime();

updateCurrentMonthText();

updateTotalInfo();

updateLeaveUI();

updateAwayUI();

updateOfficeTime();

officePosition.textContent =
currentPosition;

updateHourlyPayUI();

updateRankBadge();

updateLevelUI();

updateCareerDays();

renderAttendance();

updateDday();

renderMonthlySummary();

renderAnnualSummary();

checkAbsent();

updateWorkUI();

updateRemainingTime();

renderProducts();

updateWishlistUI();

// =========================
// 위시리스트 복원
// =========================

const savedWishlist =
localStorage.getItem(
  "wishlistProduct"
);

if(savedWishlist){

  wishlistProduct =
  JSON.parse(savedWishlist);

  const wishlistTitleValue =
  wishlistProduct.name;

  const wishlistBrandValue =
  wishlistProduct.brand;

  const wishlistPrice =
  wishlistProduct.price;

  wishlistTitle.textContent =
  wishlistTitleValue;

  wishlistBrand.textContent =
  wishlistBrandValue;

  wishlistTargetMoney.textContent =
  `${wishlistPrice.toLocaleString()}원`;

  const remain =
  Math.max(
    0,
    wishlistPrice - totalPay
  );

  wishlistRemainMoney.textContent =
  `${remain.toLocaleString()}원`;

  const percent =
  Math.min(
    100,
    Math.floor(
      (totalPay / wishlistPrice)
      * 100
    )
  );

  wishlistPercent.textContent =
  `${percent}%`;

  wishlistProgressFill.style.width =
  `${percent}%`;

}

updateDarkMode();

updateVibrationUI();