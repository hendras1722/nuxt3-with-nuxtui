import PQueue from './use-queue'
import { createApp, h, ref, unref, shallowRef, triggerRef, nextTick } from 'vue'
let instances: any = null
let container: any = null
const queue = new PQueue()
async function createInstance(id: string, component: any) {
  if (!instances) instances = shallowRef(/* @__PURE__ */ new Map())
  if (!container) {
    const target = document.createElement('div')
    const app = createApp({
      name: 'GlobalContainer',
      render: () => {
        return [...instances.value.values()].map((item) => {
          return h(item.component, { ref: item.ref })
        })
      },
    })
    document.body.append(target)
    app.mount(target)
    target.id = 'global'
    container = app
  }
  let instance = instances.value.get(id)
  if (!instance) {
    instance = { component, ref: ref() }
    instances.value.set(id, instance)
    triggerRef(instances)
    await nextTick()
  }
  return unref(instance.ref)
}
async function removeInstance(id: string) {
  if (instances && container) {
    instances.value.delete(id)
    triggerRef(instances)
    await nextTick()
  }
}
export async function resetInstance() {
  if (instances) {
    instances.value.clear()
    triggerRef(instances)
    await nextTick()
  }
}
export async function useSingleton(component: any) {
  return await queue.add(() => createInstance(component, component))
}
export async function removeSingleton(component: any) {
  return await queue.add(() => removeInstance(component))
}
