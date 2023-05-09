<template>
  <div>
    <VAppBar color="primary" :elevation="2">
      <VContainer>
        <VAppBarTitle>
          {{ routeName }}
        </VAppBarTitle>
      </VContainer>
    </VAppBar>

    <VContainer>
      <VRow>
        <VCol cols="12" lg="4" md="6" xl="3" v-for="todo in todos" :key="todo.title">
          <JCardTodo v-bind="todo" @edit="editList" @delete="deleteList" />
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import JCardTodo from '../components/JCard/Todo.vue'

const todos = ref<Todo[]>([])

const route = useRoute()

const editList = () => {
  console.log(editList.name)
}

const deleteList = () => {
  console.log(deleteList.name)
}

const routeName = computed(() => route.name)
</script>
