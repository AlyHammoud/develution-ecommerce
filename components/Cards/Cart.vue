<template>
  <div class="cart">
    <div class="cart-wrapper">
      <div class="cart-wrapper-box"></div>
      <div class="cart-wrapper-panel">
        <ClientOnly>
          <div
            class="cart-wrapper-panel-product"
            v-if="_cartProduct.length"
            v-for="(product, index) in _cartProduct"
            :key="index"
          >
            <div class="cart-product">
              <div class="image">
                <img v-if="!product.image" src="/images/empty.png" alt="" />
                <img v-else :src="product.image" alt="" />
              </div>
              <div class="infos">
                <p class="quantity">Qty: {{ product.quantity }}</p>
                <p class="price">
                  price:
                  {{
                    new Intl.NumberFormat("en-US", {
                      maximumFractionDigits: 2,
                    }).format(product.price)
                  }}$
                </p>
              </div>
            </div>
            <div class="whatsapp">
              <Icon
                name="fa:whatsapp"
                @click="makeOrder(product.id, product.itemId, product.catId)"
              />
              <Icon name="fa:trash" @click="removeFromCart(product.id)" />
            </div>
          </div>
          <div
            class="cart-wrapper-panel-product"
            style="color: white; text-align: center; height: 100px"
            v-else
          >
            No Products in cart
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
const _cartProduct = ref([]);

onMounted(() => {
  _cartProduct.value = localStorage.getItem("cartProducts") ?? "[]";

  _cartProduct.value = JSON.parse(_cartProduct.value);
});

const removeFromCart = (prodId) => {
  let cartProducts = localStorage.getItem("cartProducts") ?? "[]";
  cartProducts = JSON.parse(cartProducts);

  if (Array.isArray(cartProducts)) {
    cartProducts = cartProducts.filter((e) => e.id != prodId);

    _cartProduct.value = cartProducts;

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }
};

const config = useRuntimeConfig();
const makeOrder = (pId, iId, cId) => {
  navigateTo(
    `https://api.whatsapp.com/send?text=${config.baseURL}product/${pId}?cat=${cId}%26item=${iId}&phone=${config.phone}`,
    {
      external: true,
    }
  );
};
</script>

<style lang="scss">
.cart {
  display: flex;
  width: 240px;
  height: max-content;
  max-height: 500px;
  background-color: $whiteColor;
  position: relative;

  &-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    max-height: inherit !important;
    overflow: auto;

    &-box {
      position: absolute;
      z-index: -11;
      top: 0;
      left: 80%;
      width: 50px;
      height: 50px;
      background-color: $mainColor;
      transform: translateX(-50%) rotate(45deg);
    }
    &-panel {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      z-index: 1;

      &-product {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        border-bottom: 1px dashed $whiteColor;
        padding: 8px;
        background-color: $mainColor;
        margin-block: 1px;

        .cart-product {
          display: flex;
          justify-content: space-between;

          .image {
            width: 100px;
            height: 100px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .infos {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-right: 10px;
            gap: 15px;
            color: $whiteColor;
          }
        }
        .whatsapp {
          width: 100%;
          @include flexCenterRow;

          .icon {
            color: $whiteColor !important;
            font-size: 2.5rem !important;
          }
        }
      }
    }
  }
}
</style>
