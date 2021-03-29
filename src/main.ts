import { createApp } from 'vue'
import 'virtual:windi.css'
import "./assets/styles/global.css";

import App from './App.vue'
import Routers from "./routers";

import { createHead } from '@vueuse/head'
import VueFinalModal from 'vue-final-modal'

const head = createHead()

createApp(App)
.use(VueFinalModal())
.use(head)
.use(Routers)
.mount('#app')
