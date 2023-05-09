<template>
  <div>
      <VRow>
        <VCol v-for="todo in todos" :key="todo.title" cols="12" lg="4" md="6" xl="3">
          <JCardTodo v-bind="todo" @delete="deleteList" @edit="editList" />
        </VCol>
      </VRow>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import JCardTodo from '../components/JCard/Todo.vue'

const todos = ref<Todo[]>([])

const router = useRouter()

const editList = () => {
  console.log(editList.name)
}

const deleteList = () => {
  console.log(deleteList.name)
}

const routeName = computed(() => route.name)
</script>
