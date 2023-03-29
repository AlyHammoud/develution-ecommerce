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

          <p>{{ product.data.description }}</p>
          <div class="actions">
            <div class="left">
              <nuxt-link to="#">
                {{ category.data.name }}
              </nuxt-link>

              <nuxt-link to="#">
                {{ items.data.name }}
              </nuxt-link>
              <p class="sale" v-if="product.data.sale > 0">
                {{ product.data.sale }}%
              </p>
              <p class="sale" v-else>No sale</p>
            </div>
            <div class="rigth">
              <div class="final-price">
                {{
                  new Intl.NumberFormat("en-US", {
                    maximumFractionDigits: 2,
                  }).format(product.data.final_price)
                }}$
              </div>

              <div class="initial-price">
                {{
                  new Intl.NumberFormat("en-US", {
                    maximumFractionDigits: 2,
                  }).format(product.data.price)
                }}$
              </div>
            </div>
          </div>

          <div class="product-selections">
            <div class="colors">
              Please select a color:
              <div
                class="color"
                v-for="(color, index) in product.data.color"
                :key="index"
                style="height: 20px; width: 20px"
                :style="{ 'background-color': color }"
              ></div>
            </div>

            <div class="sizes">
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

            <div class="quantity">
              <div v-if="product.data.quantity > 1">
                there {{ product.data.quantity > 1 ? "are" : "is" }}
                <span>{{ product.data.quantity }}</span> more
              </div>
              <div v-else>No more available</div>
              <input type="number" min="1" :max="product.data.quantity" id="" />
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

const sizes = ref(null);
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
  product.value.data.size.map((size, i) => {
    let x = { value: size, label: size };
    return x;
  })
);

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

    .product-infos {
      margin-top: 40px;
      max-width: 550px;

      // .name
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

        &::after {
          content: "";
          position: absolute;
          // inset: 9%;
          left: 12%;
          top: 25%;
          right: 12%;
          bottom: 25%;
          border: 5px solid setColorOpacity($mainColor, 0.3);
          z-index: -1;
        }

        .splide__slide.is-active.is-visible {
          border: 2px solid $mainColor;
        }
      }
    }
  }
}
</style>
