<template>
  <div class="about-us">
    <div class="top">
      <img
        v-if="!store.getGeneralInfos.company_image"
        src="/images/empty.png"
        alt=""
      />
      <img :src="store.getGeneralInfos.company_image" v-else alt="" />
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

        <p>We are one click away..</p>
      </div>
    </div>

    <div class="bottom">
      <div class="moto">
        <h2>Please do not hesitate to contact us in case of any doubts</h2>
        <p>We will try to accommodate you request as soon as possible.</p>
      </div>
      <div class="image" @click="gotWhatsapp">
        <img src="/images/whatsapp 2.png" alt="" />
        <p>contact us</p>
      </div>
    </div>

    <div class="how-to-use">
      <div class="card">
        <p class="number">01</p>
        <p class="text">Navigate and select you item</p>
      </div>

      <div class="card">
        <p class="number">02</p>
        <p class="text">
          Share you selected item to our whatsapp by clicking on the whatsapp
          Icon next to the product
        </p>
      </div>

      <div class="card">
        <p class="number">03</p>
        <p class="text">
          Share you Name, address, and your phone number in the whatsapp chat
        </p>
      </div>

      <div class="card">
        <p class="number">04</p>
        <p class="text">Wait for you products, and Enjoy them.</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useGeneralInfoStore } from "~~/store/general_info";
const store = useGeneralInfoStore();

const gotWhatsapp = () => {
  navigateTo(
    `https://api.whatsapp.com/send?text=Welcome there!!&phone=${store.getGeneralInfos.phone_number}`,
    {
      external: true,
    }
  );
};
</script>
<style lang="scss" scoped>
.about-us {
  width: 100%;

  .top {
    width: inherit;

    img {
      width: 100%;
      height: 550px;
      margin-bottom: -10px;
    }
  }

  .bottom {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 100px auto 150px auto;

    // @media (width < 800px) {
    //   width: 95%;
    // }

    @media (width < 650px) {
      flex-direction: column;
    }

    .moto {
      h2 {
        margin-bottom: 30px;
        text-align: left !important;
      }
    }

    .image {
      width: 160px;
      height: 160px;
      position: relative;
      cursor: pointer;

      p {
        text-align: center;
      }
      img {
        width: inherit;
        height: inherit;
      }
    }
  }

  .how-to-use {
    display: flex;
    gap: 50px;
    width: 90%;
    margin: 0 auto;
    justify-content: space-around;
    flex-wrap: wrap;

    .card {
      display: flex;
      // width: min(400px, 50%);
      width: 350px !important;
      flex-direction: column;
      padding: 30px;
      background-color: $mainColor;
      color: $whiteColor;

      .number {
        padding: 20px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-weight: 900;
        border: 1px solid $whiteColor;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
