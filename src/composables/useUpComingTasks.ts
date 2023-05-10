import { computed, onMounted, ref, watch } from 'vue'
import { useTodoStore } from '@/store/modules/todos'
import { isToday } from '@/helpers'

export default function useUpComingTasks() {
  const upComingTasks = ref<Task[]>([])
  const dialogIsOpen = ref(false)

  const isThereAnyUpComingTask = computed(() => upComingTasks.value.length)

  const todoStore = useTodoStore()

  const calculateUpComingTasks = () => {
    Object.keys(todoStore.todos).forEach((todoId) => {
      todoStore.todos[todoId].tasks.forEach((task) => {
        if (task.done) {
          return
        }

        if (!isToday(task.dueDate)) {
          return
        }

        upComingTasks.value.push(task)
      })
    })
  }

  watch(isThereAnyUpComingTask, (value) => (dialogIsOpen.value = !!value))

  onMounted(calculateUpComingTasks)

  return {
    dialogIsOpen,
    upComingTasks,
    isThereAnyUpComingTask,
  }
}
