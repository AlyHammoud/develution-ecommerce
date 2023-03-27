<template>
  <div class="items-list">
    <div class="page-hero">
      <div v-if="!catPending">
        <PageHero
          :name="category.data.name"
          :description="category.data.description"
          :image="category.data.image_url"
        />
      </div>
      <div class="loader" v-else>
        <CustomLoader />
      </div>
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

      <p>Dig deeper into our amazing collection</p>
    </div>
    <div class="items-wrapper">
      <div class="loader" v-if="itemsPending">
        <CustomLoader />
      </div>
      <div class="items-contents" v-else>
        <div class="item" v-for="(item, index) in items.data" :key="index">
          <nuxt-link class="link" to="#">
            <div
              class="images"
              @mouseleave="imagesFade($event, index, '200px', 1)"
              @mouseover="imagesFade($event, index, 0, 0)"
            >
              <img class="main-image" :src="item.images[0].image_url" alt="" />
              <img
                :src="item.images[1].image_url"
                class="image-thumb"
                v-if="item.images.length > 1"
                alt=""
              />
            </div>

            <p>{{ item.name }}</p>
          </nuxt-link>
        </div>
        <!-- <Swiper
          :modules="[SwiperNavigation, SwiperPagination]"
          :pagination="{
            clickable: true,
          }"
          :navigation="true"
          :autoplay="false"
          :slidesPerView="3"
          :width="808"
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
        </Swiper> -->
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

const { data: category, pending: catPending } = useFetch(
  () => "https://test.onixglass.com/api/v1/category/client/" + cat
);

const {
  data: items,
  pending: itemsPending,
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

const imagesFade = (ev, index, leftValue, opacityValue) => {
  const tmpItems = toRaw(items.value);
  // console.log(tmpItems.data[index].images);
  if (tmpItems.data[index].images.length > 1) {
    document.querySelectorAll(".link .images .image-thumb")[index].style.left =
      leftValue;

    document.querySelectorAll(".link .images .main-image")[
      index
    ].style.opacity = opacityValue;
  }
};
</script>

<style lang="scss">
.items-list {
  min-height: fit-content;

  .page-hero {
    height: 400px;
    width: 100%;
    position: relative;

    .loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .items-wrapper {
    min-height: 100px;
    width: 100%;
    .loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .items-contents {
      width: 100%;
      @include flexCenterRow;
      flex-wrap: wrap;
      margin-top: $sectionsTopMargin;
      gap: 10px;

      .item {
        padding: 5px;
        .link {
          @include flexCenterColumn;
          width: 150px;
          height: 200px;

          .images {
            position: relative;
            width: 100%;
            height: 150px;
            overflow: hidden;
            box-shadow: 0px 3px 12px black;
            border-radius: 50%;
            margin-bottom: 5px;

            // &:hover {
            //   .image-thumb {
            //     left: 0;
            //   }
            //   .main-image {
            //     opacity: 0;
            //   }
            // }

            .image-thumb {
              position: absolute;
              top: 0;
              left: 200px;
              width: 100%;
              height: 100%;
              transition: all 0.3s ease;
            }
            .main-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
              margin-bottom: 10px;
              transition: all 0.3s ease;
            }
          }
          p {
            color: $mainTextColor;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
