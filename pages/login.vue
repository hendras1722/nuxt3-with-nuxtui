<template>
  <div class="p-96">
    name title
    <UInput v-model="state.password" />

    <br />
    original name:
    <UInput v-model="state.email" />

    result : {{ result }}
  </div>
  <!-- <div class="h-screen flex justify-center items-center p-5">
    <div
      class="w-96 h-80 p-8 flex justify-center items-center rounded-tl-lg rounded-bl-lg border border-gray-200"
    >
      <div class="w-full">
        <div class="text-center text-2xl font-bold">Sign In</div>
        <div>
          <UForm :schema="schema" :state="state" @submit="submit">
            <UFormGroup
              label="Email"
              name="email"
              autocomplete="false"
              required
            >
              <UInput
                icon="i-ion-person-sharp"
                v-model="state.email"
                autocomplete="false"
                class="button_custom"
              />
            </UFormGroup>

            <UFormGroup label="Password" name="password" class="mt-3" required>
              <UInput
                icon="i-ion-locked"
                v-model="state.password"
                type="password"
                autocomplete="false"
                class="button_custom"
              />
            </UFormGroup>

            <div class="flex justify-center mt-5 w-full">
              <UButton
                class="w-full ml-auto mr-auto block"
                type="submit"
                variant="solid"
                color="blue"
                size="lg"
              >
                Submit
              </UButton>
            </div>
          </UForm>
        </div>
      </div>
    </div>
    <div
      class="w-96 h-80 p-8 flex justify-center items-center rounded-tr-md rounded-br-md bg-blue-600"
    >
      <div class="w-full">
        <div class="text-center text-2xl font-bold text-white">Sign Out</div>
        <div class="mt-5 text-white">
          Create an account to start ordering today!
        </div>
        <div class="text-center mt-5">
          <UButton variant="outline" color="white">Register</UButton>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { object, string } from 'yup'
import type { InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { removeName } from 'remove-title-name-ts'

definePageMeta({
  layout: false,
})
const schema = object({
  email: string(),
  password: string(),
})

type Schema = InferType<typeof schema>

const state = ref({
  email: '',
  password: '',
})

const result = ref('')

watch(
  () => state.value.email,
  () => {
    result.value = removeName(state.value.email, state.value.password)
  }
)

async function submit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  // console.log(event.data)
}
</script>

<style lang="scss">
@import url('@/assets/scss/input_login.scss');
</style>
