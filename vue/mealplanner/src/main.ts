/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Pinia
import { createPinia } from 'pinia'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { i18n } from './i18n'

const pinia = createPinia()

const app = createApp(App)

registerPlugins(app)

app.use(pinia)
app.use(i18n)

app.mount('#app')
