<script setup lang="ts">
const nuxtApp = useNuxtApp()
const store = useLoading(nuxtApp.$pinia)
const { loadingPages } = store

store.pendingLoadingPages()
nuxtApp.hook('app:created', () => {
  store.pendingLoadingPages()
})
nuxtApp.hook('page:finish', () => {
  store.finsihLoadingPages()
})
</script>

<template>
  <UApp>
    <Loading />
    <NuxtLayout>
      <div>
        <NuxtPage />
      </div>
    </NuxtLayout>
  </UApp>
</template>
