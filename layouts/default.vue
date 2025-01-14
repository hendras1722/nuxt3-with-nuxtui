<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { loading, loadingPages } = storeToRefs(useLoading())
const loadingSkeleton = ref(false)
const navbar = ref({})
const bodyRef = ref()

nuxtApp.hook('page:start', () => {
  loading.value = true
  loadingSkeleton.value = true
})
nuxtApp.hook('page:finish', () => {
  setTimeout(() => {
    loading.value = false
    loadingSkeleton.value = false
  }, 500)
})
</script>

<template>
  <div class="flex" v-show="!loadingPages">
    <Sidebar :navbar="navbar" :bodyRef="bodyRef" />
    <div class="w-full" ref="bodyRef">
      <Navbar ref="navbar" />
      <!-- Breadcumb -->
      <Breadcumb />
      <div class="p-5">
        <div class="grid grid-cols-12 grid-rows-1 gap-4">
          <div class="col-span-12">
            <UContainer
              class="mt-4 px-3 py-5 max-w-full bg-white shadow-md rounded-lg dark:bg-gray-900 dark:text-white dark:border dark:border-white">
              <div v-show="loadingSkeleton"
                class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
                <div class="w-full">
                  <div class="h-5 bg-gray-200 rounded dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  <div class="h-5 bg-gray-200 rounded dark:bg-gray-700 mb-2.5"></div>
                  <div class="h-5 bg-gray-200 rounded dark:bg-gray-700 mb-2.5"></div>
                  <div class="h-5 bg-gray-200 rounded dark:bg-gray-700 mb-2.5"></div>
                  <div class="h-5 bg-gray-200 rounded dark:bg-gray-700 mb-2.5"></div>
                  <div class="h-5 bg-gray-200 rounded dark:bg-gray-700 mb-2.5"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div>
              <div v-show="!loadingSkeleton">
                <slot />
              </div>
            </UContainer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  @apply bg-gray-50 dark:bg-gray-900;
}
</style>
