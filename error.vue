<template>
  <div class="custom-error">
    <p>{{ error.message }}</p>
    <button @click="handleError">home</button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

const handleError = () => clearError({ redirect: "/" });

defineProps(["error"]);
</script>

<style lang="scss">
.custom-error {
  background-color: $mainColor;
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 90px;

  p {
    color: $whiteColor;
    font-size: 3em;
  }

  button {
    border: none;
    outline: none;
    background-color: $grayDarkColor;
    color: $whiteColor;
    padding: 30px 80px;
    cursor: pointer;
    font-size: 1.3rem;
    font-weight: 700;
  }
}
</style>
