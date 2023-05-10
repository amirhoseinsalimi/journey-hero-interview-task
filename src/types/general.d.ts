type Priority = 'High' | 'Medium' | 'Low'

type Task = {
  id: string
  title: string
  description: string
  dueDate: number | null
  done: boolean
  priority: Priority
}

type Todo = {
  id: string
  title: string
  description: string
  creationDate: number
  tasks: Task[]
}
