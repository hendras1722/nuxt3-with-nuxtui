<template>
  <UModal v-model="isOpen">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <!-- Content -->
      <UForm :state="state" @submit="handleSubmit">
        <UFormGroup
          label="First Name"
          name="firstName"
          autocomplete="false"
          required
        >
          <Input
            parsing="number"
            v-model="state.firstName"
            autocomplete="false"
          />
        </UFormGroup>

        <UFormGroup label="Last Name" name="lastName" class="mt-3" required>
          <Input v-model="state.lastName" autocomplete="false" />
        </UFormGroup>

        <UFormGroup label="age" name="lastName" class="mt-3" required>
          <Input parsing="text" v-model="state.age" autocomplete="false" />
        </UFormGroup>

        <div class="flex justify-center mt-5 w-full">
          <UButton
            class="w-full ml-auto mr-auto block"
            type="submit"
            variant="solid"
            color="blue"
          >
            Submit
          </UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
// const props = defineProps({
//   modelValue: {
//     type: Boolean,
//     default: false,
//   },
// })

const state = ref({
  firstName: '',
  lastName: '',
  age: '',
})

const isOpenRef = ref(false)

const isOpen = computed({
  get() {
    return isOpenRef.value
  },
  set(e) {
    isOpenRef.value = e
  },
})
function open() {
  isOpenRef.value = true
}
async function handleSubmit() {
  // const useSingloeTown = await useSingletonGureeeh2()
  // console.log(useSingloeTown)
  isOpenRef.value = false
}
defineExpose({
  open,
})
</script>

<style lang="scss" scoped></style>
