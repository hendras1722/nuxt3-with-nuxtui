export const useLoading = defineStore('loading', () => {
  const loading = ref<boolean>(false)
  const loadingPages = ref(false)

  function pendingLoadingPages() {
    loadingPages.value = true
  }
  function finsihLoadingPages() {
    loadingPages.value = false
  }

  function pending() {
    loading.value = true
  }
  function finish() {
    loading.value = false
  }
  return {
    finsihLoadingPages,
    pendingLoadingPages,
    loadingPages,
    loading,
    pending,
    finish,
  }
})
