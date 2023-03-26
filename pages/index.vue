<template>
  <div class="home-page">
    <div class="hero-swiper">
      <div class="swiper-home-loading" v-if="pending">
        <CustomLoader />
      </div>
      <SwiperHome v-else :categories="categories" />
    </div>

    <div class="curve">
      <svg
        id="wave"
        style="transform: rotate(180deg); transition: 0.3s"
        viewBox="0 0 1440 160"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stop-color="rgba(243, 106, 62, 1)" offset="0%"></stop>
            <stop stop-color="rgba(255, 179, 11, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          style="transform: translate(0, 0px); opacity: 1"
          fill="var(--main-color-opacity)"
          d="M0,64L80,53.3C160,43,320,21,480,29.3C640,37,800,75,960,77.3C1120,80,1280,48,1440,42.7C1600,37,1760,59,1920,66.7C2080,75,2240,69,2400,72C2560,75,2720,85,2880,90.7C3040,96,3200,96,3360,82.7C3520,69,3680,43,3840,40C4000,37,4160,59,4320,61.3C4480,64,4640,48,4800,37.3C4960,27,5120,21,5280,18.7C5440,16,5600,16,5760,26.7C5920,37,6080,59,6240,64C6400,69,6560,59,6720,48C6880,37,7040,27,7200,24C7360,21,7520,27,7680,26.7C7840,27,8000,21,8160,26.7C8320,32,8480,48,8640,58.7C8800,69,8960,75,9120,82.7C9280,91,9440,101,9600,101.3C9760,101,9920,91,10080,88C10240,85,10400,91,10560,82.7C10720,75,10880,53,11040,45.3C11200,37,11360,43,11440,45.3L11520,48L11520,160L11440,160C11360,160,11200,160,11040,160C10880,160,10720,160,10560,160C10400,160,10240,160,10080,160C9920,160,9760,160,9600,160C9440,160,9280,160,9120,160C8960,160,8800,160,8640,160C8480,160,8320,160,8160,160C8000,160,7840,160,7680,160C7520,160,7360,160,7200,160C7040,160,6880,160,6720,160C6560,160,6400,160,6240,160C6080,160,5920,160,5760,160C5600,160,5440,160,5280,160C5120,160,4960,160,4800,160C4640,160,4480,160,4320,160C4160,160,4000,160,3840,160C3680,160,3520,160,3360,160C3200,160,3040,160,2880,160C2720,160,2560,160,2400,160C2240,160,2080,160,1920,160C1760,160,1600,160,1440,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
        ></path>
      </svg>

      <p>Our best collection is one click away</p>
    </div>

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
    <!-- <Transition name="scale">
    <div class="list-items" v-if="showItem">
      <ItemsList
        :id="categoryId"
        :categoryName="categoryName"
        @hideItem="() => (showItem = false)"
      />
    </div>
  </Transition> -->
  </div>
</template>
<script setup>
const x = computed(() => Math.random() * 134340);

const {
  data: categories,
  pending,
  error,
} = useFetch(() => "https://test.onixglass.com/api/v1/category/allAvailable");
</script>

<style lang="scss">
.hero-swiper {
  height: 600px;
  width: 100;
  position: relative;

  .swiper-home-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.list-items {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: setColorOpacity($grayLightColor, 0.9);
  backdrop-filter: blur(12px);
  z-index: 9999;
  @include transition;
}

.scale-enter-active,
.scale-leave-active {
  opacity: 1;
  transform: scale(1);
  transition: all 0.3s;
}
.scale-enter-from {
  opacity: 0.4;
  transform: scale(0.5);
}
.scale-leave-to {
  opacity: 0.4;
  transform: scale(0.5);
}
.home-page {
  transform: perspective(200px);
  perspective: 200px;
}
.curve {
  position: relative;
  svg {
    @media (max-width: 600px) {
      display: none;
    }
  }

  p {
    position: absolute;
    top: 20%;
    left: 0;
    transform: translateY(-50%);
    color: $mainTextColor;
    font-size: 1.2rem;
    font-weight: 700;
    padding-left: 20px;

    @media (max-width: 600px) {
      width: 100%;
      min-height: 70px;
      background-color: setColorOpacity($mainColor, 0.4);
      @include flexCenterColumn;
      position: static;
      transform: none;
      font-size: 1rem;
      border-bottom-left-radius: 70%;
      border-bottom-right-radius: 20%;
    }
  }
}

.shop-by-categories {
  @include flexCenterColumn;
  padding: 20px 40px;
  width: 100%;
  background-color: setColorOpacity($mainColor, 0.1);

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
</style>
