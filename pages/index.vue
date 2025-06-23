<template>
  <div>
    <h1>Selamat datang dashboard jimpitan</h1>
  </div>
</template>

<script setup lang="ts">
const { openSidebarStore, getData } = mapStore(useSideBar, ['openSidebarStore', 'getData']);
</script>
