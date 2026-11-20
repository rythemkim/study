// =========================
// 상품 렌더링
// =========================

function renderProducts(){

  storeProductList.innerHTML =
  "";

  const filteredProducts =

  selectedCategory === "전체"

  ? products

  : products.filter(
      (product)=>

      product.category ===
      selectedCategory
    );

  filteredProducts.forEach(
    (product)=>{

      storeProductList.innerHTML += `

        <div
          class="store-product-card"
          id="
            productCard-${product.id}
          "
        >

          <!-- 이미지 -->

          <div
            class="store-product-image"
          >

            <img
              src="${product.image}"
              alt="${product.name}"
            >

          </div>

          <!-- 상품명 -->

          <div
            class="store-product-name"
          >

            ${product.name}

          </div>

          <!-- 가격 -->

          <div
            class="store-product-price"
          >

            ${product.price
              .toLocaleString()}원

          </div>

<!-- 카테고리 -->

          <div
            class="store-product-tag"
          >

            ${product.category}

          </div>

          <!-- 버튼 -->

          <div
            class="
              store-product-buttons
            "
          >

            <button
              class="wishlist-btn"

              onclick="
                setWishlist(
                  '${product.name}',
                  '${product.brand}',
                  ${product.price}
                )
              "
            >

              위시

            </button>

            <button
              class="buy-btn"

              onclick="
                buyProduct(
                  '${product.name}',
                  ${product.price},
                  ${product.id}
                )
              "
            >

              구매

            </button>

          </div>

        </div>

      `;

    }
  );

}

// =========================
// 구매 함수
// =========================

function buyProduct(
  name,
  price,
  id
){

  // 잔액 부족

  if(totalPay < price){

playVibration(
  [40,30,40]
);

    showToast(
      "잔액이 부족합니다."
    );

    return;

  }

  // 확인창

  const confirmBuy =
  confirm(
`${name}

${price.toLocaleString()}원

구매하시겠습니까?`
  );

  if(!confirmBuy){
    return;
  }

  // 구매기록 저장

  savePurchaseHistory(
    name,
    price
  );

const beforePay =
totalPay;

  // 차감

  totalPay -= price;

  localStorage.setItem(
    "totalPay",
    totalPay
  );

  // UI 갱신

  animateMoney(
  beforePay,
  totalPay
);

updateWishlistUI();

  // 완료

  showToast(
`${name}

구매 완료`
  );

showPurchasePopup(
  name,
  price
);

playVibration(120);

playPurchaseEffect(id);

setTimeout(()=>{

  showPurchaseBanner(
    name,
    price
  );

},5000);

}

// =========================
// 카테고리 필터
// =========================

categoryButtons.forEach((button)=>{

  button.addEventListener(
    "click",
    ()=>{

      selectedCategory =
      button.dataset.category;

      categoryButtons.forEach((btn)=>{

        btn.classList.remove(
          "active"
        );

      });

      button.classList.add(
        "active"
      );

      renderProducts();

    }
  );

});