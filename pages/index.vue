<template>
  <div>
    <UButton variant="solid" @click="getData">update Data </UButton> {{ openSidebarStore }}
  </div>
</template>

<script setup lang="ts">
const { openSidebarStore, getData } = mapStore(useSideBar, ['openSidebarStore', 'getData']);
</script>
