<template>
  <div class="default">
    <NavBarTop class="default-navbar-top" />

    <div class="default-navbar-bottom">
      <NavBarBottom />
    </div>
    <slot />

    <div class="footer">
      <div class="footer-wrapper">
        <div class="top">
          <div class="logo">
            <nuxt-link v-if="!store.getGeneralInfos.logo" to="/"
              >Logo</nuxt-link
            >
            <img v-else :src="store.getGeneralInfos.logo" alt="" />
          </div>
          <div class="brief">
            <p>We are one click away...</p>
            <p>choose and share your selected product, and we will deliver.</p>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <nuxt-link to="/about">About us</nuxt-link>
            <nuxt-link to="/contact">Contact us</nuxt-link>
            <nuxt-link to="/">About us</nuxt-link>
          </div>
          <div class="rigth">
            <p>Powered by develution</p>
            <img src="/images/develution.jpeg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGeneralInfoStore } from "~~/store/general_info";
const store = useGeneralInfoStore();
const { data: visitSite, pending: visitPending } = useMyFetch(
  () => "/siteData",
  {
    ssr: false,
  }
);
</script>

<style lang="scss">
.default {
  width: 100%;

  .footer {
    width: 100%;
    margin-top: 50px;
    padding-inline: 20px;

    &-wrapper {
      width: 100%;

      .top {
        display: flex;
        gap: 40px;
        align-items: center;

        .brief {
          p {
            color: $mainTextColor;
          }
          p:first-child {
            font-size: 1.1rem;
            font-weight: 700;
          }
        }

        .logo {
          font-size: 1.3rem;
          @include flexCenterColumn;
          height: 70px;
          width: 70px;
          border-radius: 50%;
          border: 1px solid $mainColor;

          a {
            color: $mainColor;
          }

          img {
            width: 80px;
          }
        }
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 50px;
      padding-bottom: 10px;

      @media (max-width: 595px) {
        row-gap: 40px;
        justify-content: center;
      }

      .left {
        @include flexCenterRow;
        gap: 10px;
        margin-right: 30px;

        a {
          @media (max-width: 570px) {
            font-size: 1rem !important;
          }
          border-bottom: 1px solid $mainColor;
          color: $secondaryColor;
        }
      }

      .rigth {
        display: flex;
        align-items: center;
        gap: 10px;

        * {
          color: $mainTextColor;
        }

        img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }
  }
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
