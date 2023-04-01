<template>
  <div class="product">
    <div class="" v-if="productPending">
      <CustomLoader />
    </div>
    <div class="product-wrapper" v-else>
      <div class="crumbs">
        <nuxt-link
          :to="`/items/${category.data.id}?page=1&cat=${category.data.id}`"
        >
          {{ category.data.name.toUpperCase() }}
        </nuxt-link>
        <span><Icon name="material-symbols:arrow-circle-right-rounded" /></span>
        <nuxt-link
          :to="`/products/${items.data.id}?page=1&cat=${category.data.id}`"
        >
          {{ items.data.name.toUpperCase() }}
        </nuxt-link>
      </div>

      <div class="product-contents">
        <div class="product-slider">
          <Splide
            ref="main"
            :options="{
              rewind: true,
              type: 'slide',
              heightRatio: 1.02,
              pagination: false,
              arrows: false,
              cover: true,
              arrows: false,
            }"
            aria-label="My Favorite Images"
            class="splider-main"
          >
            <SplideSlide
              v-for="(image, index) in product.data.images"
              :key="index"
            >
              <img :src="image.image_url" alt="Sample 1" />
            </SplideSlide>
          </Splide>

          <Splide
            class="splider-thumbs"
            ref="thumbs"
            :options="{
              type: 'slide',
              // rewind: true,
              gap: '0.1rem',
              pagination: false,
              fixedWidth: 70,
              fixedHeight: 70,
              cover: true,
              arrows: false,
              navigation: false,
              // focus: 'center',
              isNavigation: true,
              updateOnMove: true,
              perPage: 1,
              pagination: true,
            }"
            aria-label="My Favorite Images"
          >
            <SplideSlide
              v-for="(image, index) in product.data.images"
              :key="index"
            >
              <img :src="image.image_url" alt="Sample 1" />
            </SplideSlide>
          </Splide>
        </div>

        <div class="product-infos">
          <h2 class="name">
            {{ product.data.name }}
          </h2>

          <p class="description">{{ product.data.description }}</p>
          <div class="actions">
            <div class="left">
              <nuxt-link class="product-link" to="#">
                {{ category.data.name }}
              </nuxt-link>

              <nuxt-link class="item-link" to="#">
                {{ items.data.name }}
              </nuxt-link>
              <p class="sale">Sale {{ product.data.sale }}%</p>
            </div>
            <div class="rigth">
              <div class="final-price" v-if="product.data.sale > 0">
                {{
                  new Intl.NumberFormat("en-US", {
                    maximumFractionDigits: 2,
                  }).format(product.data.final_price)
                }}$
              </div>

              <div
                class="initial-price"
                :style="{
                  color: product.data.sale
                    ? 'var(--main-color)'
                    : 'var(--main-text-color)',
                  'text-decoration': product.data.sale
                    ? 'line-through'
                    : 'none',
                }"
              >
                {{
                  new Intl.NumberFormat("en-US", {
                    maximumFractionDigits: 2,
                  }).format(product.data.price)
                }}$
              </div>
            </div>
          </div>

          <div class="product-selections">
            <div class="colors-wrapper selection" v-if="product.data.color">
              <p class="title">Please select a color:</p>
              <div class="colors">
                <div
                  class="color"
                  v-for="(color, index) in product.data.color"
                  :key="index"
                  :style="{
                    'background-color': color,
                    opacity: colors.includes(color) ? 0.7 : 1,
                  }"
                  @click="addColor(color, index)"
                >
                  <div class="remove-color" v-if="colors.includes(color)">
                    x
                  </div>
                </div>
              </div>
            </div>

            <div class="sizes selection" v-if="product.data.size">
              <p class="title">Please select a size</p>
              <div v-if="!productPending">
                <multiselect
                  :mode="'tags'"
                  v-model="sizes"
                  :options="sizeOptions"
                  :searchable="true"
                  :close-on-select="false"
                ></multiselect>
              </div>
            </div>

            <div class="quantity selection">
              <div v-if="product.data.quantity > 1" class="title">
                there {{ product.data.quantity > 1 ? "are" : "is" }}
                <span>{{ product.data.quantity }}</span> more available
              </div>
              <div v-else>No more available</div>
              <input
                type="number"
                :placeholder="`Avalible ${product.data.quantity}`"
                min="1"
                :max="product.data.quantity"
                id=""
                v-model="quantity"
              />
            </div>
            <div class="whatsapp-us" @click="makeOrder">
              <img src="/images/whatsapp.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="best-seller"
      v-if="!pendingMostViewed && mostViewed.data.length"
    >
      <div class="title">
        <p>
          you may aslo like in <span> {{ category.data.name }}</span>
        </p>
      </div>
      <div class="best-sellers-cards">
        <Swiper
          :slidesPerView="5"
          :spaceBetween="0"
          :pagination="{
            clickable: true,
          }"
          :breakpoints="{
            '320': {
              slidesPerView: 1,
              // spaceBetween: 5,
            },
            '590': {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            '860': {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            '1120': {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            '1400': {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }"
          :navigation="true"
          :modules="[SwiperPagination, SwiperNavigation]"
          class="best-seller-swiper"
        >
          <swiper-slide
            class="best-seller-slide"
            v-for="(product, index) in mostViewed.data"
            :key="index"
          >
            <CardsProduct
              :id="product.id"
              :name="product.name"
              :images="product.images"
              :initial-price="product.price"
              :final-price="product.final_price"
              :category="product.item.category"
              :item="product.item"
              :index="index"
              :sale="product.sale"
              :uniqueIdName="`items-bestseller-${product.id}`"
              :key="product.id"
            />
          </swiper-slide>
        </Swiper>
      </div>
    </div>
    <Transition name="bottom">
      <div class="snackbar" v-if="showSnackBar">
        Size, Color and quantity are required
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { GetColorName } from "hex-color-to-color-name";

const showSnackBar = ref(false);

const { id } = useRoute().params;
const { item, cat } = useRoute().query;
const config = useRuntimeConfig();

const [
  { data: product, pending: productPending },
  { data: category, pending: categoryPending },
  { data: items, pending: itemPending },
  { data: mostViewed, pending: pendingMostViewed },
] = await Promise.all([
  useMyFetch(() => "product/client/" + id, {
    key: `product:${id}`,
  }),

  useMyFetch(() => "category/client/" + cat, {
    key: `category:${cat}`,
  }),

  useMyFetch(() => "item/client/" + item, {
    key: `item:${item}`,
  }),

  useMyFetch(() => "mostViewedProductsByCategory?cat=" + cat, {
    key: `newest:${cat}`,
  }),
]);

const sizeOptions = computed(() =>
  product.value.data.size
    ? product.value.data.size.map((size, i) => {
        let x = { value: size, label: size };
        return x;
      })
    : []
);

const sizes = ref([]);

// Managing colors, adding and deleting colors
const colors = ref([]);
const finalColors = ref([]);
const addColor = (color, index) => {
  if (colors.value.includes(color)) {
    let findIndex = colors.value.indexOf(color);
    colors.value.splice(findIndex, 1);

    let tmpColorName = color.substring(1);
    let tmpColorNameIndex = finalColors.value.indexOf(tmpColorName);
    finalColors.value.splice(tmpColorNameIndex, 1);
  } else {
    colors.value.push(color);

    let tmpColorName = color.substring(1);
    finalColors.value.push(GetColorName(tmpColorName));
  }
};
// Managing colors, adding and deleting colors

const quantity = ref(0);

const makeOrder = async () => {
  let tmpProduct = product.value.data;
  if (!tmpProduct.color) {
    colors.value.pop();
    colors.value.push("no colors available");
  }

  if (!tmpProduct.size) {
    sizes.value.pop();
    sizes.value.push("no sizes available");
  }

  navigateTo(
    `https://api.whatsapp.com/send?text=${config.baseURL}product/${product.id}?cat=${cat.id}%26item=${items.id}&phone=${config.phone}`,
    {
      external: true,
    }
  );

  // if (!colors.value.length || !sizes.value.length || quantity.value == 0) {
  //   showSnackBar.value = true;

  //   setTimeout(() => {
  //     showSnackBar.value = false;
  //   }, 4000);
  // } else {
  //   showSnackBar.value = false;

  // }
};

const final_price = computed(() =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(product.value.data.final_price)
);

const final_colors = computed({
  get() {
    return finalColors.value.join(", ");
  },

  set(newValue) {
    finalColors.value = newValue;
  },
});

const final_sizes = computed({
  get() {
    return sizes.value.join(", ");
  },

  set(newValue) {
    sizes.value.value = newValue;
  },
});

useHead({
  title: () => `${product.value.data.name}`,
  meta: [
    { hid: "og-type", property: "og:type", content: "website" },
    {
      hid: "og-title",
      property: "og:title",
      content: () =>
        `product: ${product.value.data.name} | ${final_price.value}$ | in store: ${product.value.data.quantity} more`,
    },
    {
      hid: "og-desc",
      property: "og:description",
      content: () =>
        `sizes available ${
          product.value.data.size ? product.value.data.size.length : 0
        } and ${
          product.value.data.color
            ? "has " + product.value.data.color.length + " available colors."
            : "no colors ara available."
        } `,
    },
    {
      hid: "og-image",
      property: "og:image",
      content: product.value.data.images[0].image_url,
    },
  ],
});

const main = ref(null);
const thumbs = ref(null);

onMounted(() => {
  const thumbsSplide = thumbs.value?.splide;
  if (thumbsSplide) {
    main.value?.sync(thumbsSplide);
  }
});
</script>

<style lang="scss">
.product {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 30px auto;
  padding-bottom: 50px;

  @media screen and (max-width: 880px) {
    width: 100%;
  }

  .snackbar {
    position: fixed;
    bottom: 0;

    left: 50%;
    transform: translateX(-50%);
    width: min(350px, 90%);
    font-size: 1em;
    background-color: $mainColor;
    color: $whiteColor;
    padding: 10px 20px;
    text-align: center;
    transition: all 8s;
    z-index: 9999;
  }

  .bottom-enter-active,
  .bottom-leave-active {
    bottom: 0px;
    transition: bottom 0.5s ease;
  }

  .bottom-enter-from,
  .bottom-leave-to {
    bottom: -100px;
  }
}
.product-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;

  .crumbs {
    display: flex;
    gap: 5px;
    align-self: center;

    a {
      border-bottom: 1px solid $mainColor;
      color: $secondaryColor;
    }

    span {
      .icon {
        font-size: 1.5rem;
        color: $mainColor;
      }
    }
  }

  .product-contents {
    display: flex;
    width: 100%;
    padding-right: 8px;

    @media screen and (max-width: 680px) {
      flex-direction: column;
    }

    .product-infos {
      margin-top: 40px;
      max-width: 650px;

      @media (max-width: 880px) {
        margin-top: 60px;
        padding-inline: 60px;
      }

      @media (max-width: 450px) {
        margin-top: 60px;
        padding-inline: 20px;
      }

      .name {
        font-size: 1.4rem;
        color: $blackColor;
      }

      .description {
        font-size: 0.9rem;
        color: $mainTextColor;
        padding-left: 9px;
      }

      .actions {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-right: 40px;
        margin-top: 30px;
        gap: 40px;

        .left {
          display: flex;
          height: fit-content;
          flex-wrap: wrap;
          column-gap: 4px;
          row-gap: 8px;

          a,
          .sale {
            font-size: 0.9rem;
            padding-inline: 5px;
            padding-block: 2px;
            border-radius: 4px;
            margin-right: 5px;
          }
          .product-link {
            background-color: $mainColor;
            color: $whiteColor;
          }

          .item-link {
            background-color: $grayDarkColor;
            color: $whiteColor;
            color: $whiteColor;
          }

          .sale {
            background-color: $helperColor;
            color: $whiteColor;
          }
        }

        .rigth {
          .final-price {
            font-weight: 700;
            color: $mainTextColor;
          }
          .initial-price {
            color: $mainColor;
            text-decoration: line-through;
          }
        }
      }

      .product-selections {
        margin-top: 30px;

        .title {
          font-size: 1.1rem;
          color: $mainTextColor;
          margin-bottom: 5px;
        }
        .selection {
          margin-top: 30px;
          max-width: 300px;
        }

        .colors-wrapper {
          width: 100%;
          .colors {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            .color {
              border: 1px solid $mainTextColor;
              cursor: pointer;
              height: 25px;
              width: 25px;
              @include flexCenterRow;

              * {
                color: $whiteColor;
              }
            }
          }
        }

        .quantity {
          span {
            color: $mainColor;
            font-weight: 700;
          }
          input {
            width: 100%;
            height: 35px;
            border: 1px solid setColorOpacity($grayDarkColor, 0.6);
            border-radius: 4px;
            padding-inline: 8px;
            outline: none;
          }
        }

        .whatsapp-us {
          img {
            width: 200px;
            height: 100px;
            object-fit: contain;
            cursor: pointer;
          }
        }
      }
    }

    .product-slider {
      width: 450px !important;
      min-width: 450px !important;
      height: 570px;

      @media (max-width: 880px) {
        width: 350px !important;
        min-width: 350px !important;
        height: 470px;
      }

      @media screen and (max-width: 680px) {
        width: 480px !important;
        min-width: 480px !important;
        height: 480px;
        margin: 0 auto;
      }

      @media screen and (max-width: 520px) {
        width: 380px !important;
        min-width: 380px !important;
        height: 400px;
        margin: 0 auto;
      }

      @media screen and (max-width: 400px) {
        width: 300px !important;
        min-width: 300px !important;
        height: 320px;
        margin: 0 auto;
      }

      .splider-main {
        height: 70%;
        width: 100%;
      }

      .splider-thumbs {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin-top: -10px;
        position: relative;

        @media (max-width: 880px) {
          margin-top: -60px;
        }

        @media (max-width: 680px) {
          margin-top: 64px;
        }

        @media (max-width: 520px) {
          margin-top: 20px;
        }
        @media (max-width: 400px) {
          margin-top: -2%;
        }

        &::after {
          content: "";
          position: absolute;
          // inset: 9%;
          left: 10%;
          top: 25%;
          right: 10%;
          bottom: 25%;
          border: 5px solid setColorOpacity($mainColor, 0.3);
          z-index: -1;

          @media (max-width: 880px) {
            left: 12%;
            right: 12%;
          }
        }

        .splide__slide.is-active.is-visible {
          border: 2px solid $mainColor;
        }
      }
    }
  }
}

.best-seller {
  margin-top: $sectionsTopMargin;
  width: 100%;
  height: fit-content;
  padding: 30px 40px;
  text-align: center;
  background-color: $bg-color;

  .title {
    margin-bottom: 50px;
    font-size: 1.3rem;
    color: $mainTextColor;

    span {
      font-weight: 900;
    }
  }

  .best-sellers-cards {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;

    .best-seller-swiper {
      width: 100%;

      // .swiper-wrapper {
      //   margin: 0 auto;
      //   width: 90%;
      // }

      .best-seller-slide {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .swiper-button-prev,
      .swiper-button-next {
        width: 40px;
        height: 40px;
        background-color: setColorOpacity($mainColor, 0.4);
        border-radius: 50%;
        transition: all 0.3s;
        // top: 0;
      }

      .swiper-button-prev {
        left: 5px;
      }
      .swiper-button-next {
        right: 5px !important;
      }

      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        background-color: setColorOpacity($mainColor, 1) !important;
      }
      .swiper-pagination-bullet {
        background-color: $secondaryColor !important;
      }
      .swiper-button-prev::after,
      .swiper-button-next::after {
        color: $whiteColor !important;
        font-size: 1.3rem !important;
        font-weight: 900;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        @include flexCenterColumn;
      }

      // * {
      //   margin: 0 auto;
      // }
    }
  }
}
</style>
