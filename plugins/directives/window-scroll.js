export default defineNuxtPlugin((nuxtApp) =>
  nuxtApp.vueApp.directive("disable-window-scroll", {
    created() {
      document.body.style.overflow = "hidden";
    },

    beforeUnmount() {
      document.body.style.overflow = "auto";
    },
  })
);
