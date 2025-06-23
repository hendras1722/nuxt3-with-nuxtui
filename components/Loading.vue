<template>
  <div
    v-if="loadingPages"
    class="relative flex justify-center items-center h-screen"
  >
    <img src="/msa_logo.jpeg" class="h-32 rounded-lg absolute" />
    <div class="custom-loader"></div>
  </div>
  <div v-show="loading" class="loading-overlay">
    <div class="loading-container">
      <img class="loading-item" src="/msa_logo.jpeg" alt="Icon MSA" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { loadingPages, loading } = storeToRefs(useLoading())
</script>

<style lang="scss" scoped>
.custom-loader {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 8px solid;
  border-color: #e4e4ed;
  border-right-color: #766df4;
  animation: s2 1s infinite linear;
}
@keyframes s2 {
  to {
    transform: rotate(1turn);
  }
}
</style>
