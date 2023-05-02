<template>
  <div class="navbar-bottom">
    <div class="navbar-bottom-wrapper">
      <div class="infos">
        <div class="location info">
          <Icon name="material-symbols:add-location" />
          <p>{{ store.getGeneralInfos.address || "Address" }}</p>
        </div>
        <div class="location info">
          <Icon name="material-symbols:phone-forwarded-rounded" />
          <p>{{ store.getGeneralInfos.phone_number }}</p>
        </div>
      </div>
      <div class="socials">
        <NuxtLink :to="store.getGeneralInfos.facebook || '#'" target="blank"
          ><Icon name="fa:facebook"
        /></NuxtLink>
        <NuxtLink :to="store.getGeneralInfos.insta || '#'" target="blank"
          ><Icon name="fa:instagram"
        /></NuxtLink>
        <!-- <NuxtLink to="#"><Icon name="fa:twitter" /></NuxtLink> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGeneralInfoStore } from "~~/store/general_info";
const store = useGeneralInfoStore();
</script>

<style lang="scss">
.navbar-bottom {
  width: 100%;
  background-color: $grayLightColor;
  padding-block: 15px;
  &-wrapper {
    display: flex;
    width: $pageMaxWidth;
    justify-content: space-around;
    align-items: center;
    width: min(100%, 1400px);
    margin: 0 auto;
    .infos {
      display: flex;
      flex-direction: column;
      row-gap: 15px;

      .info {
        display: flex;
        gap: 10px;

        .icon {
          font-size: 1.3rem;
          color: $secondaryColor;
        }
        p {
          color: $mainTextColor;
          font-weight: 700;
        }
      }
    }
    .socials {
      display: flex;
      gap: 15px;

      * {
        font-size: 1.6rem;
        color: $helperColor;
      }
    }
  }
}
</style>
