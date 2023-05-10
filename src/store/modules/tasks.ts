import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useTodoStore } from './todos'

const EMPTY_TASK: Task = {
  id: '',
  title: '',
  description: '',
  priority: 'Medium' as Priority,
  dueDate: null,
  done: false,
}

export const useTasksStore = defineStore('tasks', () => {
  const todoStore = useTodoStore()

  const tasks = ref<Task[]>([])
  const currentTask = ref<Task>(EMPTY_TASK)
  const isAdding = ref(false)
  const isEditing = ref(false)
  const isDeleting = ref(false)

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

  const setIsDeleting = (deleting: boolean) => {
    isDeleting.value = deleting
  }

  const setCurrentTask = (task: Task) => {
    currentTask.value = { ...task }
  }

  const clearCurrentTask = () => {
    setCurrentTask(EMPTY_TASK)
  }

  const addTaskToTodo = (todoId: string, task: Task) => {
    todoStore.todos[todoId].tasks.push({
      ...task,
      id: uuidv4(),
      done: false,
    })
  }

  const updateTask = (taskId: string, task: Task) => {
    const index = tasks.value.findIndex((t) => t.id === taskId)

    if (index === -1) {
      throw new Error(`Task with ID: ${taskId} not found`)
    }

    tasks.value[index] = { ...task, id: taskId }
  }

  const deleteTask = (taskId: string) => {
    const index = tasks.value.findIndex((t) => t.id === taskId)

    if (index === -1) {
      throw new Error(`Task with ID: ${taskId} not found`)
    }

    tasks.value.splice(index, 1)
    setIsDeleting(false)
  }

  watch(isAdding, (value) => {
    if (value) {
      return
    }

    clearCurrentTask()
  })

  watch(isEditing, (value) => {
    if (value) {
      return
    }

    clearCurrentTask()
  })

  return {
    tasks,
    isAdding,
    isEditing,
    isDeleting,
    currentTask,
    deleteTask,
    updateTask,
    setIsAdding,
    setIsEditing,
    setIsDeleting,
    addTaskToTodo,
    getTasksOfTodo,
    setCurrentTask,
    clearCurrentTask,
  }
})
