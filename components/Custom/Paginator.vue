<template>
  <vue-awesome-paginate
    :total-items="totalItems"
    :items-per-page="perPage"
    :max-pages-shown="maxPageToShow"
    v-model="currentPage"
    :on-click="onClickHandler"
    :disablePagination="disabled"
  />
</template>

<script setup>
const { totalItems, perPage, maxPageToShow } = defineProps({
  totalItems: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 5,
  },
  maxPageToShow: {
    type: Number,
    default: 5,
  },
  disabled: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["emitPage"]);

const currentPage = ref(1);

const onClickHandler = (page) => {
  emit("emitPage", page);
};
</script>

<style lang="scss">
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: setColorOpacity($mainColor, 0.8);
  border: 1px solid setColorOpacity($mainColor, 0.8);
  color: white;
}
.active-page:hover {
  background-color: $mainColor;
}
</style>
