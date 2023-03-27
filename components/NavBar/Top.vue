<template>
  <div class="navbar-top">
    <div class="logo">
      <a href="#">Logo</a>
    </div>
    <div
      class="navbar-items"
      :class="[mobileMenuOpened ? 'show-navbar-items' : '']"
    >
      <NuxtLink to="/" active-class="navbar-active">Home</NuxtLink>
      <NuxtLink to="/about" active-class="navbar-active">About</NuxtLink>
      <NuxtLink to="/contact" active-class="navbar-active">Contact</NuxtLink>
    </div>
    <div
      class="hamburger"
      :class="[mobileMenuOpened ? 'x' : '']"
      @click="toggleMenu"
      v-click-outside="{
        handler: () => (mobileMenuOpened = false),
        excludeByClassNameWithChilds: ['hamburger'],
        excludeByClassNamesOnlyParents: ['navbar-items'],
      }"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="navbar-actions">
      <div class="separator"></div>
      <Icon name="material-symbols:add-shopping-cart" />
      <Icon name="material-symbols:ecg-heart" />
      <Icon name="mdi:user" />
      <Icon name="material-symbols:search" />
    </div>
  </div>
</template>

<script setup>
const mobileMenuOpened = ref(false);

onMounted(() => {
  window.addEventListener("resize", () => {
    mobileMenuOpened.value = false;
  });

  window.document.addEventListener("scroll", () => {
    let navBarTop = document.querySelector(".navbar-top");

    if (window.scrollY > 200) {
      navBarTop.style.position = "sticky";
      navBarTop.style.top = "0";
      navBarTop.style.boxShadow = "0 1px 17px gray";
    } else {
      navBarTop.style.top = "-72px";
      navBarTop.style.transition = "top 1s";
      navBarTop.style.boxShadow = "none";
    }
  });
});

const toggleMenu = () => {
  var x = window.matchMedia("(max-width: 700px)");

  if (x.matches) {
    mobileMenuOpened.value = !mobileMenuOpened.value;
  } else {
    mobileMenuOpened.value = true;
  }
};
</script>
<style lang="scss">
.navbar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: min(100%, 1600px);
  height: 72px;
  margin: 0 auto;
  padding-inline: 30px;
  background-color: $whiteColor;
  position: sticky;
  width: 100%;
  top: -72px;
  left: 0;
  justify-self: center !important;
  transition: top 1s;
  z-index: 999;

  @media (max-width: 700px) {
    width: 100%;
    padding-inline: 5px;
  }

  .logo {
    * {
      color: $mainColor;
      font-size: 1.7rem;
      font-weight: 900;
    }
  }

  .navbar-items {
    display: flex;
    align-items: center;
    column-gap: 15px;
    height: 100%;

    @media (max-width: 700px) {
      position: absolute;
      flex-direction: column;
      align-items: flex-start;
      top: 100%;
      left: 50%;
      background-color: $whiteColor;
      box-shadow: 2px 3px 5px $mainColor;

      height: fit-content;
      transform: scaleY(0) translateX(-70%);
      transform-origin: top;
      padding: 10px 17px;
      overflow: auto;
      visibility: visible;
      transition: transform 0.3s;

      a {
        width: 100%;
        margin-bottom: 2px;
      }
    }
    a {
      color: $mainColor;
      padding: 5px 8px;
      position: relative;
      isolation: isolate;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: $mainColor;
        z-index: -1;
        @include transition;
      }

      &:hover {
        color: $whiteColor;
        &::before {
          width: 100%;
        }
      }
    }
  }

  .navbar-active {
    background-color: $mainColor;
    color: $whiteColor !important;
  }

  .show-navbar-items {
    visibility: visible;
    transform: scaleY(1) translateX(-70%);
    transition: all 0.3s;
  }

  .hamburger {
    display: none;

    @media (max-width: 700px) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 25px;
      height: 15px;
      cursor: pointer;

      span {
        width: 100%;
        height: 2px;
        background-color: $mainColor;
        transition: transform 0.3s ease, opacity 0.1s ease;
      }
    }
  }

  .hamburger.x {
    span:nth-child(2) {
      opacity: 0;
    }

    span:nth-child(1) {
      transition: transform 0.3s ease;
      transform: rotate(45deg) translateY(10px);
    }

    span:nth-child(3) {
      transform: rotate(-48deg) translateY(-10px);
      transition: transform 0.3s ease;
    }
  }
  .navbar-actions {
    display: flex;
    gap: 20px;
    border-bottom: 1px solid $secondaryColor;

    .separator {
      width: 2px;
      height: 15x;
      background-color: $secondaryColor;
      transform: skewX(-15deg);
    }

    @media (max-width: 700px) {
      gap: 10px;
    }

    .icon {
      cursor: pointer;
      font-size: 1.8rem;
      color: $mainColor;
      @include transition;
      border: 1px solid $mainColor;
      border-radius: 50%;
      padding: 4px;

      @media (max-width: 700px) {
        font-size: 1.3rem;
        padding: 2px;
      }

      &:hover {
        transform: rotateY(30deg);
        color: $whiteColor;
        background-color: $mainColor;
      }
    }
  }
}
</style>
