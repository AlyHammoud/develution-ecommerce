<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useGeneralInfoStore } from "./store/general_info";
const store = useGeneralInfoStore();
store.fetchGeneralInfos();
</script>
