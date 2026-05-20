// =========================
// 홈 탭
// =========================

homeTab.addEventListener(
  "click",
  ()=>{

    homeScreen.style.display =
    "block";

    officeScreen.style.display =
    "none";

    storeScreen.style.display =
    "none";

myScreen.style.display =
"none";

    navItems.forEach(item=>{

      item.classList.remove(
        "active"
      );

    });

    homeTab.classList.add(
      "active"
    );

  }
);

// =========================
// 오피스 탭
// =========================

officeTab.addEventListener(
  "click",
  ()=>{

    homeScreen.style.display =
    "none";

    officeScreen.style.display =
    "block";

    storeScreen.style.display =
    "none";

myScreen.style.display =
"none";

    navItems.forEach(item=>{

      item.classList.remove(
        "active"
      );

    });

    officeTab.classList.add(
      "active"
    );

  }
);

// =========================
// 스토어 탭
// =========================

storeTab.addEventListener(
  "click",
  ()=>{

    homeScreen.style.display =
    "none";

    officeScreen.style.display =
    "none";

    storeScreen.style.display =
    "block";

myScreen.style.display =
"none";

    navItems.forEach(item=>{

      item.classList.remove(
        "active"
      );

    });

    storeTab.classList.add(
      "active"
    );

  }
);

// =========================
// 마이 탭
// =========================

settingTab.addEventListener(
  "click",
  ()=>{

    // 모든 화면 숨기기

    homeScreen.style.display =
    "none";

    officeScreen.style.display =
    "none";

    storeScreen.style.display =
    "none";

    myScreen.style.display =
    "block";

    // active 처리

    document
    .querySelectorAll(".nav-item")
    .forEach(item=>{

      item.classList.remove(
        "active"
      );

    });

    settingTab.classList.add(
      "active"
    );

  }
);