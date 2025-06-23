import { type StoreGeneric } from 'pinia'
import { storeToRefs } from 'pinia'

type StoreMapper<S> = (keyof S)[] | Record<string, keyof S>

export function mapStore<S extends StoreGeneric>(
  useStore: () => S,
  mappers: StoreMapper<S>
) {
  const store = useStore()
  const storeRefs = storeToRefs(store)

  const result: Record<string, any> = {}

  // Handle array format
  const mappersObj = Array.isArray(mappers)
    ? mappers.reduce((acc, key) => {
        acc[key as string] = key
        return acc
      }, {} as Record<string, keyof S>)
    : mappers

  // Process each property
  for (const alias in mappersObj) {
    const key = mappersObj[alias]
    const keyStr = String(key)

    // Special $ properties or functions need special handling
    if (keyStr.startsWith('$') || typeof store[key] === 'function') {
      // For methods, return a function that calls the original method
      if (typeof store[key] === 'function') {
        result[alias] = (...args: any[]) => (store[key] as Function)(...args)
      }
      // For objects like $state, return a ref that points to the original
      else {
        const customRef = {
          get value() {
            return store[key]
          },
          set value(newValue) {
            if (key === '$state') {
              store.$state = newValue
            }
          },
        }
        result[alias] = customRef
      }
    } else {
      // Regular state properties come from storeToRefs
      result[alias] = storeRefs[keyStr]
    }
  }

  return result
}
