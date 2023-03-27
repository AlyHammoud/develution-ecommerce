<template>
  <div class="category-item">
    <img :src="image" alt="" />
    <p class="category-item-name">
      Items for <span>{{ name }}</span>
    </p>
    <p class="category-item-description">{{ description }}</p>
  </div>
</template>

<script setup>
const { name, image, description } = defineProps({
  name: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
.category-item {
  @include flexCenterColumn;
  width: 100%;
  height: 400px;
  background: linear-gradient(to bottom, $grayLightColor, $grayDarkColor);
  justify-content: flex-start;
  padding-top: 50px;
  padding-inline: 80px;
  text-align: center;
  border-bottom: 1px solid $grayDarkColor;

  img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    box-shadow: 0 5px 12px black;
  }

  &-name {
    margin-top: 20px;
    font-size: 1.2rem;
    font-weight: 700;

    span {
      background-color: $mainColor;
      color: $whiteColor;
      padding-inline: 4px;
    }
  }

  &-description {
    color: $grayLightColor;
  }
}
</style>
