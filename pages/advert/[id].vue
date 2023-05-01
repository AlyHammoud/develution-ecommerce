<template>
  <div class="adverti">
    <div class="adverti-info">
      <div class="adverti-info-wrapper" v-if="!advertPending">
        <div class="image">
          <img :src="advert.image" alt="" />
          <p>{{ advert.description }}</p>
        </div>
      </div>
    </div>
    <div class="adverti-products-wrapper">
      <div
        class="single-advert"
        v-if="!productsPending"
        v-for="(product, index) in products.data"
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
          :uniqueIdName="`single-advert-${product.id}`"
          :key="product.id"
        />
      </div>
    </div>

    <div class="items-paginator" v-if="!products.pending">
      <div class="items-paginator-wrapper" v-if="products.meta.last_page > 1">
        <CustomPaginator
          :totalItems="products.meta.total"
          :perPage="products.meta.per_page"
          :maxPageToShow="5"
          :disabled="productsPending"
          @emitPage="paginatorPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { id } = useRoute().params;

const productPage = ref(1);
const {
  data: products,
  pending: productsPending,
  error: productsError,
} = await useMyFetch(() => "get-ad/" + id + "?page=" + productPage.value);

const {
  data: advert,
  pending: advertPending,
  error: advertError,
} = await useMyFetch("get-ad/" + id + "?full=no");

if (productsError.value || advertError.value) {
  throw createError({
    statusCode: 404,
    message: "Error getting your data, please trye again!",
    fatal: true,
  });
}

const paginatorPage = (pageItem) => {
  productPage.value = pageItem;
};
</script>

<style lang="scss">
.adverti {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  &-info {
    width: 100%;
    margin-bottom: 30px;

    &-wrapper {
      .image {
        width: 100%;
        position: relative;

        img {
          width: 100%;
          height: 450px;
          object-fit: fill;

          @media (width < 700px) {
            height: 250px;
          }
        }

        p {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 5px;
          color: #333;
          font-family: sans-serif;
          line-height: 1.5;
          max-width: 50%;
          padding: 1rem 2rem;
        }
        @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
          p {
            -webkit-backdrop-filter: blur(4px);
            backdrop-filter: blur(4px);
            background-color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
  }

  &-products-wrapper {
    width: 100%;
    display: flex;
    gap: 20px;
    margin-bottom: 50px;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 10px;
  }
}
</style>
