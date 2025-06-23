<template>
  <UAccordion
    v-if="itemMenu.children && itemMenu.children?.length > 0"
    :items="[itemMenu]"
    :ui="{ wrapper: 'flex flex-col w-full text-black' }"
    :multiple="false"
    ref="accordion"
    :class="itemMenu.to"
    :defaultOpen="showOpenAccordion(itemMenu)"
  >
    <template #default="{ open, item, index }">
      <UButton
        :icon="itemMenu.icon"
        class="dark:bg-gray-800 dark:text-white text-black w-full bg-white rounded-2xl shadow-lg"
        :ui="{
          rounded: 'rounded-none',
          padding: { sm: 'p-3' },
        }"
        @click="handleAccordionChildren(item.slot)"
      >
        <span class="truncate sm:block">
          {{ itemMenu.label }}
        </span>
        <template #trailing>
          <UIcon
            name="i-heroicons-chevron-right-20-solid"
            class="w-5 h-5 ms-auto transform transition-transform duration-200"
            :class="[open && 'rotate-90']"
          />
        </template>
      </UButton>
    </template>
    <template #[itemMenu.slot]="{ item }">
      <div>
        <div
          class="flex justify-end"
          v-for="(itemChildren, i) in item.children"
          :key="i"
        >
          <NuxtLink :to="itemChildren.to" v-slot="{ href, isActive }" custom>
            <AccordionChildren
              ref="accordionChildren"
              v-if="itemChildren.children.length > 0"
              :item-menu="itemChildren"
            >
            </AccordionChildren>
            <UButton
              v-else
              color="royal-blue"
              variant="ghost"
              class="dark:bg-gray-800 dark:text-white dark:border-gray-700 text-black my-2 bg-white rounded-2xl w-full shadow-lg"
              :ui="{
                rounded: 'rounded-none',
                padding: { sm: 'p-3 ' },
              }"
              :class="[isActive && 'text-black bg-gray-200 ']"
              @click="handlePushRouter(href)"
            >
              <span class="pl-3 flex items-center">
                <UIcon
                  :name="itemChildren.icon"
                  :class="[isActive && 'text-blue-500 text-md ']"
                  class="text-md"
                />
                <span class="sm:block ml-1 whitespace-normal">
                  {{ itemChildren.label }}
                </span>
              </span>
            </UButton>
          </NuxtLink>
        </div>
      </div>
    </template>
  </UAccordion>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints, templateRef } from '@vueuse/core'
import { useBreadcumbStore } from '@/stores/breadcumb'
import type { PropType } from 'nuxt/dist/app/compat/capi'

const appConfig = useAppConfig()
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerMd = breakpoints.smaller('md')
const router = useRouter()
const route = useRoute()

const { stateLink } = storeToRefs(useBreadcumbStore())

const accordion = ref()
const accordionChildren = templateRef('acordionChildren', [])
const stateAccordion = ref<any[]>([])

const props = defineProps({
  itemMenu: {
    type: Object as PropType<any>,
    required: true,
  },
})

watch(
  () => stateLink.value,
  (newValue) => {
    if (newValue) {
      console.log(accordion.value)
      handleAccordionChildren(route.fullPath)
    }
  }
)

const handleAccordion = (href: string) => {
  handlePushRouter(href)
  if (!accordion.value) return
  // accordion.value.buttonRefs[0].close()
  // accordion.value.forEach((element:any) => {
  //   const buttonRefsElement: { buttonRefs: { close: Function }[] } = element
  //   buttonRefsElement.buttonRefs.forEach((buttonrefs) => {
  //     buttonrefs.close()
  //   })
  // })
}

const showOpenAccordion = (e: { children: { to: string }[] }) => {
  if (!e.children) return
  return e.children.filter((item) => item.to === route.fullPath).length > 0
}

const handleAccordionChildren = (e: string) => {
  stateLink.value = false
  if (!accordion.value || accordion.value.length < 1) return
  // console.log(props.itemMenu, 'iniprops.itemMenu')
  // const itemSidebar = props.itemMenu.children.filter(
  //   (item: any) => item.children && item.children.length > 0
  // )
  // const getIndexItemSidebar = itemSidebar.findIndex(
  //   (item: any) => item.slot === e
  // )
  // itemSidebar.forEach((_: any, index: number) => {
  //   if (index !== getIndexItemSidebar) {
  //     const buttonRefsVariable: any = accordion.value[index]
  //     buttonRefsVariable.buttonRefs[0].close()
  //   }
  // })
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

defineExpose({
  accordion,
})
</script>

<style lang="scss" scoped></style>
