<template>
  <div class="product-card">
    <nuxt-link to="#">
      <div class="image">
        <img src="" alt="" />
      </div>
    </nuxt-link>
    <div class="contents">
      <img :src="images[0].image_url" alt="" />
      <div class="top">
        <p>{{ name }}</p>
        <div class="prices">
          <p class="final-price">{{ finalPrice }}</p>
          <p class="initial-price">{{ initialPrice }}</p>
        </div>
      </div>
      <div class="bottom">
        <nuxt-link :to="`/items/${category.id}?page=1&cat=${category.id}`">
          {{ category.name }}
        </nuxt-link>

        <nuxt-link to="#"> {{ item.name }} </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const { name, initialPrice, finalPrice, category, item } = defineProps({
  name: {
    type: String,
    default: "",
  },
  initialPrice: {
    type: Number,
    default: 0,
  },
  finalPrice: {
    type: Number,
    default: 0,
  },

  category: {
    type: Object,
    default: {},
  },
  item: {
    type: Object,
    default: {},
  },

  images: {
    type: Array,
    default: [],
  },
});
</script>
