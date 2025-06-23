<template>
  <div>
    <ModalPersona v-model="open" />
  </div>
</template>

<script>
import { ref, defineComponent, shallowRef } from 'vue'
import ModalPersona from './ModalPersonForm.vue'
export default defineComponent({
  components: { ModalPersona },
  setup() {
    const open = ref(false)
    const groups = shallowRef(/* @__PURE__ */ new Map())
    async function add(options) {
      open.value = true
    }
    return {
      add,
      open,
      groups,
    }
  },
})
</script>
