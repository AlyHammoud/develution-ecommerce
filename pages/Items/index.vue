<template>
  <div>
    <div class="shop-by-categories">
      <p>Shop By Categories</p>
      <div class="list-categories">
        <div
          class="category"
          v-if="!pending"
          v-for="(category, index) in categories.data"
          :key="index"
        >
          <NuxtLink
            :to="'/items/' + category.id + '?page=1&cat=' + category.id"
          >
            <div class="image">
              <img :src="category.image_url" alt="" />
            </div>
            <p class="name">
              {{ category.name }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="best-seller">
      <div class="title">
        <p>Here is our <span>Best Sellers</span></p>
      </div>
      <div
        class="best-sellers-cards"
        v-if="!pendingTopProducts && topProducts.data.length"
      >
        <div
          class="product-cards"
          v-for="(product, index) in topProducts.data"
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
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  data: categories,
  pending,
  error,
} = useMyFetch(() => "category/allAvailable");

const { data: topProducts, pending: pendingTopProducts } =
  useMyFetch("mostViewedProducts");
</script>

<style lang="scss">
.shop-by-categories {
  @include flexCenterColumn;
  padding: 20px 40px;
  width: 100%;
  // background-color: setColorOpacity($mainColor, 0.1);

  & > p {
    font-size: 2rem;
    color: $mainTextColor;
    font-weight: 700;
  }

  .list-categories {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    margin-top: $sectionsTopMargin;
    gap: 50px;
    padding: 20px 40px;

    .category {
      // @include flexCenterColumn;

      width: 160px;
      height: 160px;
      cursor: pointer;

      .image {
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-shadow: 0 1px 15px $grayDarkColor;
        border-radius: 50%;
        transition: all 1s;

        &:hover {
          img {
            transform: scale(1.1);
          }
        }

        img {
          width: 100%;
          height: 100%;
          transition: all 1s;
        }
      }

      .name {
        text-align: center;
        font-size: 1rem;
        text-decoration: underline;
        color: $mainTextColor;
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
  }
}
</style>
