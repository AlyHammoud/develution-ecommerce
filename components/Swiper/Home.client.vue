<template>
  <div>
    <Swiper
      class="home-swiper"
      :height="330"
      :modules="[
        SwiperNavigation,
        SwiperPagination,
        SwiperAutoplay,
        SwiperEffectFade,
      ]"
      :loop="true"
      :pagination="{
        clickable: true,
      }"
      :breakpoints="{
        '230': {
          slidesPerView: 1,
          spaceBetween: 20,
          effect: 'fade',
        },
        '1500': {
          slidesPerView: 2,
          spaceBetween: 20,
          effect: 'slide',
        },
      }"
      :navigation="true"
      :autoplay="true"
      :grabCursor="true"
      :slidesPerView="2"
      :onTransitionStart="swipingStart"
    >
      <SwiperSlide
        class="home-swiper-slide"
        v-for="slide in categories.data"
        :key="slide"
      >
        <div class="swiper-a">
          <div class="contents">
            <p class="name">{{ slide.name }}</p>
            <p class="description">{{ slide.description }}</p>
            <button>Show more</button>
          </div>
          <img :src="slide.image_url" alt="" />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
const { categories } = defineProps({
  categories: {
    type: Object,
    default: [],
  },
});
const swipingStart = (e) => {
  let x = document.querySelectorAll(".swiper-a .contents");
  x.forEach((el) => {
    el.animate(
      [
        { opacity: 0, top: "40%", left: "50%" },
        { opacity: 0.5, top: "30%", left: "40%" },
        { opacity: 2, top: "20%", left: "30%" },
        { opacity: 1, top: "10%", left: "20%" },
        { opacity: 1, top: "30%", left: "10%" },
      ],
      { duration: 1000 },
      { "timing-function": "linear" }
    );
  });
};
</script>

<style lang="scss">
.home-swiper {
  background-color: $grayLightColor;

  .swiper-button-prev,
  .swiper-button-next {
    width: 40px;
    height: 40px;
    background-color: setColorOpacity($mainColor, 0.4);
    border-radius: 50%;
    transition: all 0.3s;
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
}
.home-swiper-slide {
  width: 400px;
  height: fit-content;
  .swiper-a {
    @include flexCenterColumn;
    width: 100%;
    height: 600px !important;
    position: relative;

    .contents {
      position: absolute;
      left: 10%;
      top: 30%;
      z-index: 9;
      display: flex;
      flex-direction: column;

      .name {
        font-size: 1.4rem;
        font-weight: 700;
        background-color: setColorOpacity($mainTextColor, 0.7);
        margin-bottom: 20px;
        width: fit-content;
        padding: 0 10px;
        color: $whiteColor;
      }

      .description {
        font-size: 1.2rem;
        background-color: setColorOpacity($mainColor, 0.7);
        color: $whiteColor;
        padding-inline: 10px;
        width: fit-content;
      }

      button {
        all: unset;
        background-color: $secondaryColor;
        width: 150px;
        color: $whiteColor;
        text-align: center;
        padding: 10px 0;
        margin: 50px auto;
      }
    }

    img {
      width: 100% !important;
      height: 100%;
      object-fit: fill;
      filter: brightness(0.7);

      @media (max-width: 520px) {
        object-fit: cover;
        object-position: 70% center;
      }
    }
  }
}
</style>
