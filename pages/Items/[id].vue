<template>
  <div class="items-list">
    <div class="category-item" v-if="!catPending">
      <img :src="category.data.image_url" alt="" />
      <p class="category-item-name">
        Items for <span>{{ category.data.name }}</span>
      </p>
      <p class="category-item-description">{{ category.data.description }}</p>
    </div>
    <CustomLoader v-if="pending" class="items-loader" />
    <div v-else v-disable-window-scroll>
      <div>
        <Swiper
          :modules="[SwiperNavigation, SwiperPagination]"
          :pagination="{
            clickable: true,
          }"
          :navigation="true"
          :autoplay="false"
          :slidesPerView="3"
        >
          <SwiperSlide
            class="items-swiper-slide"
            v-for="(item, index) in items.data"
            :key="index"
          >
            <div class="swiper-ab">
              <div class="contentss">
                <p class="names">{{ item.name }}</p>
                <p class="descriptions">{{ item.description }}</p>
                <button>Show more</button>
              </div>
              <img :src="item.images[0].image_url" alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div class="items-paginator" v-if="items.meta.last_page > 1">
      <CustomPaginator
        :totalItems="items.meta.total"
        :perPage="items.meta.per_page"
        :maxPageToShow="5"
        :disabled="pending"
        @emitPage="paginatorPage"
      />
    </div>
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const { cat } = useRoute().query;

const page = ref(1);

const {
  data: items,
  pending,
  error,
} = await useFetch(
  () =>
    `https://test.onixglass.com/api/v1/items/client/${id}?page=${page.value}`,
  {
    key: `list-items:${page.value}`,
  }
);

const { data: category, pending: catPending } = useFetch(
  () => "https://test.onixglass.com/api/v1/category/client/" + cat
);

const paginatorPage = (pageItem) => {
  page.value = pageItem;
};
</script>

<style lang="scss">
.category-item {
  @include flexCenterColumn;
  width: 100%;
  height: 400px;
  background: linear-gradient(to bottom, $grayLightColor, $grayDarkColor);
  justify-content: flex-start;
  padding-top: 50px;
  padding-inline: 80px;
  text-align: center;
  border-bottom: 1px solid $grayDarkColor;

  img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    box-shadow: 0 5px 12px black;
  }

  &-name {
    margin-top: 20px;
    font-size: 1.2rem;
    font-weight: 700;

    span {
      background-color: $mainColor;
      color: $whiteColor;
      padding-inline: 4px;
    }
  }

  &-description {
    color: $grayLightColor;
  }
}
</style>
