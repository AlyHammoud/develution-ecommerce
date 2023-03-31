<template>
  <div>
    <p style="text-align: center">processing</p>
  </div>
</template>

<script setup>
const productInfo = useState("setProductInfo");

if (productInfo.value) {
  useHead({
    title: () => `${productInfo.value.quantity}`,
    meta: [
      { hid: "og-type", property: "og:type", content: "website" },
      {
        hid: "og-title",
        property: "og:title",
        content: () =>
          `product: ${productInfo.value.name} | ${productInfo.value.price}$ | quantity: ${productInfo.value.quantity}`,
      },
      {
        hid: "og-desc",
        property: "og:description",
        content: () =>
          `sizes: ${productInfo.value.sizes} and ${productInfo.value.colors} `,
      },
      {
        hid: "og-image",
        property: "og:image",
        content: productInfo.value.image,
      },
    ],
  });
}

const config = useRuntimeConfig();
onMounted(() => {
  setTimeout(() => {
    navigateTo(
      `https://api.whatsapp.com/send?text=${config.baseURL}product/send`,
      {
        external: true,
      }
    );
  }, 100);
});
</script>
