<template>
  <div>
    <div class="sm:block hidden min-h-screen w-52 sm:static absolute sm:z-0 z-50 duration-100 dark:bg-gray-900"
      id="sidebar">
      <div>
        <div class="flex justify-center items-center my-3 h-14 overflow-hidden">
          <div>
            <NuxtLink to="/">
              <img class="w-16" src="/msa_logo.jpeg" alt="Logo MSA" />
            </NuxtLink>
          </div>
        </div>
        <div class="overflow-auto max-h-[calc(100vh-80px)] pb-3">
          <div v-for="(itemMenu, i) in items" :key="`sidebar-${itemMenu.label} + ${i}`" class="px-3">
            <div v-if="itemMenu.title" class="pl-3 pb-3 text-sm font-bold sm:block last:mt-3">
              {{ itemMenu.title }}
            </div>
            <div v-if="itemMenu.children && itemMenu.children?.length < 1" class="p-3 rounded-xl">
              <NuxtLink :to="itemMenu.to" v-slot="{ href, isActive }" custom>
                <UButton class="dark:bg-gray-800 dark:text-white text-black w-full bg-white rounded-2xl shadow-lg"
                  :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }" @click="handleAccordion(href)"
                  :class="[isActive && 'text-black bg-gray-200 ']">
                  <UIcon :name="itemMenu.icon" :class="[isActive && 'text-blue-500 text-md']" class="text-md" />
                  <span class="sm:block">
                    {{ itemMenu.label }}
                  </span>
                </UButton>
              </NuxtLink>
            </div>
            <div v-else-if="itemMenu.children && itemMenu.children?.length > 0" class="p-3 rounded-xl">
              <AccordionTree ref="accordion" :itemMenu="itemMenu"></AccordionTree>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints, templateRef } from '@vueuse/core'
import { useBreadcumbStore } from '@/stores/breadcumb'

const appConfig = useAppConfig()
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerMd = breakpoints.smaller('md')
const router = useRouter()
const route = useRoute()

const { stateLink } = storeToRefs(useBreadcumbStore())

const items = ref()
items.value = appConfig.menu
const accordion = ref()

watch(
  () => route.fullPath,
  (newValue) => {
    const itemData = accordion.value
      .map((item: any) => {
        return item.accordion
      })
      .findIndex((item: any) => item && !item.class.includes(newValue))
    accordion.value[itemData].accordion.buttonRefs[0].close()
  }
)

watch(
  () => stateLink.value,
  (newValue) => {
    if (newValue) {
      handleAccordionChildren(route.fullPath)
    }
  }
)

const handleAccordion = (href: string) => {
  handlePushRouter(href)
  if (!accordion.value || accordion.value.length < 1) return
  accordion.value.forEach((element: any) => {
    const buttonRefsElement: any = toRaw(element)
    if (toRaw(buttonRefsElement).accordion) {
      toRaw(buttonRefsElement).accordion.buttonRefs[0].close()
    }
  })
}

const showOpenAccordion = (e: { children: { to: string }[] }) => {
  if (!e.children) return
  return e.children.filter((item) => item.to === route.fullPath).length > 0
}

const handleAccordionChildren = (e: string) => {
  stateLink.value = false
  console.log(accordion.value)
  if (!accordion.value || accordion.value.length < 1) return
  const itemSidebar = items.value.filter(
    (item) => item.children && item.children.length > 0
  )
  const getIndexItemSidebar = itemSidebar.findIndex((item) => item.slot === e)
  itemSidebar.forEach((_, index) => {
    if (index !== getIndexItemSidebar) {
      const buttonRefsVariable: any = accordion.value[index]
      buttonRefsVariable.buttonRefs[0].close()
    }
  })
}

function handleSidebar() {
  const body = document.getElementById('sidebar')
  const body2 = document.getElementById('sidebar2')
  if (body2 && smallerMd.value) {
    if (!body2.style.transform || body2.style.transform === 'translateX(0%)') {
      body2.style.transform = 'translateX(-100%)'
      body2.classList.remove('w-52')
      body2.classList.add('w-0')
      return
    }
    body2.style.transform = 'translateX(0%)'
    body2.classList.add('w-52')
    body2.classList.remove('w-0')
    return
  }
  if (body) {
    if (!body.style.transform || body.style.transform === 'translateX(0%)') {
      body.style.transform = 'translateX(-100%)'
      body.classList.remove('w-52')
      body.classList.add('w-0')
      return
    }
    body.style.transform = 'translateX(0%)'
    body.classList.add('w-52')
    body.classList.remove('w-0')
  }
}

const handlePushRouter = (href: string) => {
  const body = document.getElementById('sidebar')
  const body2 = document.getElementById('sidebar2')
  router.push(href)
  if (smallerMd.value) {
    setTimeout(() => {
      if (body2 && smallerMd.value) {
        if (
          !body2.style.transform ||
          body2.style.transform === 'translateX(0%)'
        ) {
          body2.style.transform = 'translateX(-100%)'
          body2.classList.remove('w-52')
          body2.classList.add('w-0')
          return
        }
        body2.style.transform = 'translateX(0%)'
        body2.classList.add('w-52')
        body2.classList.remove('w-0')
        return
      }
      if (body) {
        if (
          !body.style.transform ||
          body.style.transform === 'translateX(0%)'
        ) {
          body.style.transform = 'translateX(-100%)'
          body.classList.remove('w-52')
          body.classList.add('w-0')
          return
        }
        body.style.transform = 'translateX(0%)'
        body.classList.add('w-52')
        body.classList.remove('w-0')
      }
    }, 300)
  }
}
</script>
