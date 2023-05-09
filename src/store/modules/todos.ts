import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getNowInMilliseconds } from '../../helpers'
import { v4 as uuidv4 } from 'uuid'
import useStorageLocal from '../../composables/useStorageLocal'

export const useTodoStore = defineStore('todos', () => {
  const todos = useStorageLocal<Todo[]>('todos', {
    initialValue: [],
    override: false,
    deep: true,
    serialize: true,
  })
  const isAdding = ref(false)
  const isEditing = ref(false)
  const currentTodo = ref<Todo | null>(null)

  const setIsAdding = (adding: boolean) => {
    isAdding.value = adding
  }

  const setIsEditing = (editing: boolean) => {
    isEditing.value = editing
  }

  const setCurrentTodo = (todo: Todo | null) => {
    currentTodo.value = todo
  }

  const clearCurrentTodo = () => {
    setCurrentTodo(null)
  }

  const addTodo = (todo: Omit<Todo, 'creationDate'>) => {
    todos.value.push({
      ...todo,
      id: uuidv4(),
      creationDate: getNowInMilliseconds(),
      tasks: [],
    })
  }

  const getTasksOfTodo = (todoId: string) => {
    const todo = todos.value.find((todo) => todo.id === todoId)

    if (!todo) {
      throw new Error('Todo not found')
    }

    return todo.tasks
  }

  return {
    todos,
    isAdding,
    isEditing,
    currentTodo,
    addTodo,
    setIsAdding,
    setIsEditing,
    getTasksOfTodo,
    setCurrentTodo,
    clearCurrentTodo,
  }
})
