import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { getNowInMilliseconds } from '@/helpers'
import { v4 as uuidv4 } from 'uuid'
import useStorageLocal from '@/composables/useStorageLocal'
import useToggle from '@/composables/useToggle'

const EMPTY_TODO: Todo = {
  id: '0',
  title: '',
  description: '',
  creationDate: 0,
  tasks: [],
}

export const useTodoStore = defineStore('todos', () => {
  const todos = useStorageLocal('todos', {
    initialValue: {},
    override: false,
    deep: true,
    serialize: true,
  })
  const currentTodo = ref<Todo>(EMPTY_TODO)

  const [isAdding, setIsAdding] = useToggle(false)
  const [isEditing, setIsEditing] = useToggle(false)
  const [isDeleting, setIsDeleting] = useToggle(false)

  const setCurrentTodo = (todoId: string) => {
    currentTodo.value = todos.value[todoId]
  }

  const clearCurrentTodo = () => {
    currentTodo.value = EMPTY_TODO
  }

  const addTodo = (todo: Omit<Todo, 'creationDate'>) => {
    const key = uuidv4()

    todos.value[key] = {
      ...todo,
      id: key,
      creationDate: getNowInMilliseconds(),
      tasks: [],
    }
  }

  const updateTodo = (todoId: string, todo: Todo) => {
    todos.value[todoId] = {
      ...todo,
      id: todoId,
    }
  }

  const deleteTodo = (todoId: string) => {
    delete todos.value[todoId]

    setIsDeleting(false)
  }

  const getTasksOfTodo = (todoId: string) => {
    const todo = todos.value[todoId]

    if (!todo) {
      throw new Error('Todo not found')
    }

    return todo.tasks
  }

  watch(isAdding, (value) => {
    if (value) {
      return
    }

    clearCurrentTodo()
  })

  watch(isEditing, (value) => {
    if (value) {
      return
    }

    clearCurrentTodo()
  })

  return {
    todos,
    isAdding,
    isEditing,
    isDeleting,
    currentTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    setIsAdding,
    setIsEditing,
    setIsDeleting,
    getTasksOfTodo,
    setCurrentTodo,
    clearCurrentTodo,
  }
})
