<template>
  <div
    class="product-card"
    @mouseleave="imagesFade($event, index, '100%', 1)"
    @mouseover="imagesFade($event, index, 0, 0)"
  >
    <div class="sale" v-if="sale > 0">
      <p>{{ sale }}%</p>
    </div>
    <nuxt-link :to="`/product/${id}?cat=${category.id}&item=${item.id}`">
      <div class="images" v-if="images.length">
        <img
          class="main-image"
          :src="images[0].image_url"
          alt=""
          :id="uniqueIdName + '_main'"
        />
        <img
          class="image-thumb"
          :id="uniqueIdName + '_thumb'"
          :src="images[1].image_url"
          v-if="images.length > 1"
          alt=""
        />
      </div>

      <div class="images" v-else>
        <img class="main-image" src="/images/empty.png" alt="" />
        <img
          class="image-thumb"
          :src="images[1].image_url"
          v-if="images.length > 1"
          alt=""
        />
      </div>
    </nuxt-link>
    <div class="contents">
      <div class="top">
        <div class="name">
          <p>{{ name }}</p>
        </div>
        <div class="prices">
          <p class="final-price" v-if="sale > 0">
            {{
              new Intl.NumberFormat("en-US", {
                maximumFractionDigits: 2,
              }).format(finalPrice)
            }}$
          </p>
          <p
            class="initial-price"
            :style="{
              color: sale > 0 ? 'var(--main-color)' : 'var(--main-text-color)',
              'text-decoration': sale > 0 ? 'line-through' : 'none',
            }"
          >
            {{
              new Intl.NumberFormat("en-US", {
                maximumFractionDigits: 2,
              }).format(initialPrice)
            }}$
          </p>
        </div>
      </div>
      <div class="bottom">
        <div class="links">
          <nuxt-link :to="`/items/${category.id}?page=1&cat=${category.id}`">
            {{ category.name }}
          </nuxt-link>

          <nuxt-link :to="`/products/${item.id}?cat=${category.id}`">
            {{ item.name }}
          </nuxt-link>
        </div>
      </div>
      <div class="actions">
        <Icon class="carts" @click="addToCart" name="uil:shopping-cart"></Icon>
        <Icon class="heart" name="uil:heart"></Icon>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  id,
  name,
  initialPrice,
  finalPrice,
  category,
  item,
  images,
  sale,
  index,
  uniqueIdName,
} = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: "",
  },
  initialPrice: {
    type: Number,
    default: 0,
  },
  finalPrice: {
    type: Number,
    default: 0,
  },

  category: {
    type: Object,
    default: {},
  },
  item: {
    type: Object,
    default: {},
  },

  images: {
    type: Array,
    default: [],
  },
  index: {
    type: Number,
    default: 0,
  },
  sale: {
    type: Number,
    default: 0,
  },

  uniqueIdName: {
    type: String,
  },
});

const addToCart = () => {
  let cartProducts = localStorage.getItem("cartProducts") ?? "[]";

  let tmpProduct = {
    id: id,
    image: images[0]?.image_url || "",
    name: name,
    price: finalPrice,
    quantity: sale,
    itemId: item.id,
    catId: category.id,
  };

  cartProducts = JSON.parse(cartProducts);

  if (Array.isArray(cartProducts)) {
    if (!cartProducts.some((e) => e.id == tmpProduct.id)) {
      cartProducts.push(tmpProduct);
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }
};

const imagesFade = (ev, indexx, leftValue, opacityValue) => {
  // console.log(tmpItems.data[index].images);
  const tmpImages = toRaw(images);

  if (tmpImages.length > 1) {
    document.querySelector("#" + uniqueIdName + "_thumb").style.left =
      leftValue;

    document.querySelector("#" + uniqueIdName + "_main").style.opacity =
      opacityValue;
  }
};
</script>

<style lang="scss">
.product-card {
  @include flexCenterColumn;
  isolation: isolate;
  position: relative;
  box-shadow: -0px -0px 10px gray;
  overflow: hidden;
  border-radius: 4px;
  width: 250px;
  height: 100%;

  .sale {
    position: absolute;
    @include flexCenterColumn;
    top: 10px;
    left: -2px;
    padding: 5px;
    height: 20px;
    width: fit-content;
    background-color: $mainColor;
    color: $whiteColor;
    z-index: 11;
    transform: rotate(-20deg);

    p {
      padding: 3px;
    }
  }

  .images {
    position: relative;
    width: 250px;
    height: 250px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      max-height: 100%;
      object-fit: cover;
    }

    .image-thumb {
      position: absolute;
      top: 0;
      left: 100%;
      width: 100%;
      height: 100%;
      transition: all 0.3s ease;
    }
    .main-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin-bottom: 10px;
      transition: all 1s ease;
    }
  }

  .contents {
    background-color: $whiteColor;
    width: 100%;
    display: flex;
    flex-direction: column;

    .top {
      @include flexCenterRow;
      align-items: flex-start;
      justify-content: space-between;
      padding-inline: 8px;
      margin-top: 4px;

      .name {
        width: 80%;
        text-align: left;
        font-weight: 700;
        color: $mainTextColor;
      }

      .prices {
        font-weight: 700;
        color: $mainTextColor;

        .initial-price {
          color: $mainColor;
          text-decoration: line-through;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    @include flexCenterColumn;

    gap: 5px;
    margin-block: 10px;
    padding-inline: 5px;
    .links {
      width: 100%;
      @include flexCenterRow;
      justify-content: space-between;

      * {
        padding-inline: 4px;
        max-width: 50%;
        font-size: 0.8rem;
      }

      a:first-child {
        background-color: $mainColor;
        color: $whiteColor;
      }

      a:last-child {
        background-color: $helperColor;
        color: $whiteColor;
      }
    }
  }
  .actions {
    justify-self: flex-end;
    margin-block: 10px;
    display: flex;
    gap: 10px;
    justify-content: center;

    * {
      font-size: 1.3rem !important;
      cursor: pointer;
      @include transition;
    }

    .carts {
      color: $helperColor;
      border-radius: 50%;
    }

    .heart {
      color: $mainColor;
      border-radius: 50%;
    }
    *:hover {
      background-color: $mainColor;
      color: $whiteColor;
    }
  }
}
</style>
