import Home from '../pages/Home.vue'
import Todo from '../pages/Todos.vue'
import {createWebHistory, createRouter} from "vue-router";

const routes = [
  {
    path: '/home', component: Home, name: 'Home'
  },
  {
    path: '/todos', component: Todo, name: 'Todos'},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
