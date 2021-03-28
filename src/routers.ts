import Home from "./pages/Index.vue";
import Monitor from "./pages/monitor/Index.vue";
import AddMonitor from "./pages/monitor/Add.vue";

const routes = [
  {path: '/', component: Home},
  {path: '/monitor', component: Monitor},
  {path: '/monitor/add', component: AddMonitor},
  {path: '/monitor/:id/edit', component: AddMonitor},
]

import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router