// =========================
// 상태
// =========================

let isWorking = false;

let isResting = false;

let restUsed = false;

let isLunch = false;

let lunchUsed = false;

let isLate = false;

// =========================
// 오늘 반차 상태
// =========================

let todayHalfType =
localStorage.getItem(
  "todayHalfType"
) || null;

// =========================
// 출근 기록
// =========================

let startWorkTime = "";

let timer = null;

// =========================
// 휴식
// =========================

let restSeconds = 1800;

let restTimer = null;

// =========================
// 점심
// =========================

let lunchSeconds = 1800;

let lunchTimer = null;

// =========================
// 자리비움
// =========================

let isAway = false;

let awayCount = 5;

let awaySeconds = 600;

let awayTimer = null;

// =========================
// 근무 시작 timestamp
// =========================

let workStartTimestamp =
Number(
  localStorage.getItem(
    "workStartTimestamp"
  )
) || null;

// =========================
// 시간
// =========================

let hour = 0;
let minute = 0;
let second = 0;

// =========================
// 기본 시급
// =========================

const basePay = 10320;

// =========================
// 직급 시스템
// =========================

const positions = [

  "인턴",
  "사원",
  "주임",
  "대리",
  "과장",
  "차장",
  "부사장",
  "사장"

];

// =========================
// 현재 직급
// =========================

let currentPosition =
localStorage.getItem(
  "currentPosition"
) || "인턴";

// =========================
// 근무 기본 설정
// =========================

let workStartHour =
Number(
  localStorage.getItem(
    "workStartHour"
  )
) || 9;

let workStartMinute =
Number(
  localStorage.getItem(
    "workStartMinute"
  )
) || 0;

let workEndHour =
Number(
  localStorage.getItem(
    "workEndHour"
  )
) || 18;

let workEndMinute =
Number(
  localStorage.getItem(
    "workEndMinute"
  )
) || 0;

let hasInitializedAttendance =
JSON.parse(
  localStorage.getItem(
    "hasInitializedAttendance"
  )
) || false;

// =========================
// 저장 데이터
// =========================

let weeklySeconds =
Number(
  localStorage.getItem(
    "weeklySeconds"
  )
) || 0;

let totalSeconds =
Number(
  localStorage.getItem(
    "totalSeconds"
  )
) || 0;

let monthlySeconds =
Number(
  localStorage.getItem(
    "monthlySeconds"
  )
) || 0;

let lastWeekKey =
localStorage.getItem(
  "lastWeekKey"
) || "";

let lastMonthKey =
localStorage.getItem(
  "lastMonthKey"
) || "";

let totalPay = Number(
localStorage.getItem("totalPay")
) || 0;

let annualLeave =
Number(
  localStorage.getItem(
    "annualLeave"
  )
) || 0;

let halfLeave =
Number(
  localStorage.getItem(
    "halfLeave"
  )
) || 0;

let sickLeave =
Number(
  localStorage.getItem(
    "sickLeave"
  )
) || 2;

let monthlyPay =
Number(
  localStorage.getItem(
    "monthlyPay"
  )
) || 0;

// =========================
// 평가 누적
// =========================

let totalGold =
Number(
  localStorage.getItem(
    "totalGold"
  )
) || 0;

let totalSilver =
Number(
  localStorage.getItem(
    "totalSilver"
  )
) || 0;

let totalBronze =
Number(
  localStorage.getItem(
    "totalBronze"
  )
) || 0;

// =========================
// 레벨 데이터
// =========================

let currentLevel =
Number(
  localStorage.getItem(
    "currentLevel"
  )
) || 0;

let currentExp =
Number(
  localStorage.getItem(
    "currentExp"
  )
) || 0;

// =========================
// 입사일
// =========================

var joinDate =
localStorage.getItem(
  "joinDate"
) || "";

let lastAnnualHours =
Number(
  localStorage.getItem(
    "lastAnnualHours"
  )
) || 0;



// =========================
// D-day
// =========================

// =========================
// 목표 리스트
// =========================

let goals =
JSON.parse(
  localStorage.getItem(
    "goals"
  )
) || [

  {

    title:"공무원 시험",

    date:"",

    isMain:true

  }

];

// =========================
// 월 통계
// =========================

let monthlyStats =
JSON.parse(
  localStorage.getItem(
    "monthlyStats"
  )
) || {};

// =========================
// 저장된 월
// =========================

let savedMonth =
localStorage.getItem(
  "savedMonth"
) || "";

// =========================
// 강등 상태
// =========================

let isDemoted =
JSON.parse(
  localStorage.getItem(
    "isDemoted"
  )
) || false;

// =========================
// 스토어 위시리스트
// =========================

let wishlistTitleValue =
localStorage.getItem(
  "wishlistTitle"
) || "아이패드 프로 11";

let wishlistBrandValue =
localStorage.getItem(
  "wishlistBrand"
) || "APPLE";

let wishlistPrice =
Number(
  localStorage.getItem(
    "wishlistPrice"
  )
) || 1599000;

// 위시리스트 상품

let wishlistProduct =
JSON.parse(
  localStorage.getItem(
    "wishlistProduct"
  )
) || null;

// 현재 선택 카테고리

let selectedCategory =
"전체";

// =========================
// 다크모드 상태
// =========================

let isDarkMode =
JSON.parse(
  localStorage.getItem(
    "isDarkMode"
  )
) || false;

// =========================
// 진동 설정
// =========================

let isVibrationOn =
JSON.parse(
  localStorage.getItem(
    "isVibrationOn"
  )
);

if(isVibrationOn === null){

  isVibrationOn = true;

}