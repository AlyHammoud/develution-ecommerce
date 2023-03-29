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
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const { item, cat } = useRoute().query;
const config = useRuntimeConfig();

const [
  { data: product, pending: productPending },
  { data: category, pending: categoryPending },
  { data: items, pending: itemPending },
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
]);

const sizeOptions = computed(() =>
  product.value.data.size
    ? product.value.data.size.map((size, i) => {
        let x = { value: size, label: size };
        return x;
      })
    : []
);

const sizes = ref(null);

const colors = ref([]);

const addColor = (color, index) => {
  if (colors.value.includes(color)) {
    colors.value.splice(index, 1);
  } else {
    colors.value.push(color);
  }
};

const quantity = ref(0);

const makeOrder = () => {
  // if (!colors.value.length && !sizes.value && !quantity.value) {
  //   alert("aa");
  // } else {
  navigateTo(
    `https://api.whatsapp.com/send?text=${config.baseURL}/product/22?cat=3&item=9&phone=+96170695391`,
    {
      external: true,
    }
  );
  // navigateTo("https://wa.me/+96170695391?text=asasdasd", {
  //   external: true,
  // });
  // }
};

useHead({
  meta: [
    { hid: "og-type", property: "og:type", content: "website" },
    { hid: "og-title", property: "og:title", content: "My Title" },
    {
      hid: "og-desc",
      property: "og:description",
      content: "This is a sweet post",
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
  width: 90%;
  margin: 30px auto;
  padding-bottom: 50px;

  @media screen and (max-width: 880px) {
    width: 100%;
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
</style>
