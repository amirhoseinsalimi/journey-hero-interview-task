import Home from '../pages/Home/Index.vue'
import Tasks from '../pages/Tasks/Index.vue'
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/tasks/:todoId',
    name: 'Tasks',
    component: Tasks,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
