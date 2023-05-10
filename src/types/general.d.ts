type Priority = 'High' | 'Medium' | 'Low'

type Task = {
  title: string
  description: string
  dueDate: number
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
