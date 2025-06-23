import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(setupCalendar, {})

  // Use the components
  nuxtApp.vueApp.component('VCalendar', Calendar)
  nuxtApp.vueApp.component('VDatePicker', DatePicker)
})
