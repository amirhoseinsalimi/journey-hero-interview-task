import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useTodoStore } from './todos'

export const useTasksStore = defineStore('tasks', () => {
  const todoStore = useTodoStore()

  const isAdding = ref(false)
  const isEditing = ref(false)
  const currentTask = ref<Task | null>(null)
  const tasks = ref<Task[]>([])

  const getTasksOfTodo = (todoId: string) => {
    tasks.value = todoStore.getTasksOfTodo(todoId)

    return tasks.value
  }

  const setIsEditing = (editing: boolean) => {
    isEditing.value = editing
  }

  const setIsAdding = (adding: boolean) => {
    isAdding.value = adding
  }

  const setCurrentTodo = (task: Task | null) => {
    currentTask.value = task
  }

  const clearCurrentTask = () => {
    setCurrentTodo(null)
  }

  const addTaskToTodo = (todoId: string, task: Task) => {
    todoStore.todos[todoId].tasks.push({
      ...task,
      id: uuidv4(),
    })
  }

  return {
    tasks,
    isAdding,
    isEditing,
    setIsAdding,
    setIsEditing,
    addTaskToTodo,
    getTasksOfTodo,
    clearCurrentTask,
  }
})
