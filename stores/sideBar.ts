export const useSideBar = defineStore('useSideBar', () => {
  const openSidebarStore = ref(false)

  function getData() {
    openSidebarStore.value = !openSidebarStore.value
    return openSidebarStore
  }

  return {
    getData,
    openSidebarStore,
  }
})
