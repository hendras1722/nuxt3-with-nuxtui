<script setup lang="ts">
import { object, string } from 'yup'
import type { InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
})

type Schema = InferType<typeof schema>

const state = ref({
  email: undefined,
  password: undefined,
})

async function submit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  // console.log(event.data)/
}
</script>

<template>
  <div class="grid grid-cols-12 grid-rows-1 gap-4">
    <div class="col-span-3">
      <UForm :schema="schema" :state="state" @submit="submit">
        <UFormGroup label="Email" name="email" autocomplete="false" required>
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password" class="mt-3" required>
          <UInput
            v-model="state.password"
            type="password"
            autocomplete="false"
          />
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
    </div>
  </div>
</template>
