import Home from '../pages/Home.vue'
import Todo from '../pages/Todos.vue'
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/todos/:id',
    name: 'Todos',
    component: Todo,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
