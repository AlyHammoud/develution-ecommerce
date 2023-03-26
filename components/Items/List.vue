<template>
  <div class="items-list">
    <p @click="$emit('hideItem', false)" class="close">X</p>
    <p class="title">
      Items for <span>{{ categoryName }}</span>
    </p>
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
const page = ref(1);

const { id } = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  categoryName: {
    type: String,
    default: "",
  },
});

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

const paginatorPage = (pageItem) => {
  page.value = pageItem;
};
</script>

<style lang="scss">
.items-list {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;

  .title {
    font-size: 1.1rem;
    font-weight: 700;

    span {
      background-color: $mainColor;
      color: $whiteColor;
      padding-inline: 3px;
    }
  }
  .items-paginator {
    // position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
  }

  .items-loader {
    // position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .close {
    position: absolute;
    top: 10px;
    right: 8px;
    @include flexCenterColumn;
    padding: 3px;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    border: 1px solid $mainColor;
    font-size: 1rem;
    color: $mainColor;
    cursor: pointer;
    @include transition;

    &:hover {
      color: $whiteColor;
      background-color: $mainColor;
    }
  }
}
</style>
