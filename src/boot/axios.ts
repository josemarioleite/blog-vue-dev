import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'
import { API } from 'src/utils/services'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance,
    $API: typeof API
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$API = API
})