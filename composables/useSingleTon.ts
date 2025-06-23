import { useSingleton, removeSingleton } from 'vue3-singleton-component'
import PComponent from '@/components/ModalPersonForm.vue'

interface inCom {
  open: Function
}
export async function useSingletonGureeeh() {
  const inCom = (await useSingleton(PComponent)) as inCom
  return toRaw(inCom)
}

export async function useSingletonGureeeh2() {
  const inCom = await removeSingleton(PComponent)
  return toRaw(inCom)
}
