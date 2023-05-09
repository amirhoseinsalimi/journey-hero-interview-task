type Priority = 'High' | 'Medium' | 'Low'

type Task = {
  title: string,
  description: string,
  dueDate: number,
  priority: Priority
}

type Todo = {
  title: string,
  description: string,
  creationDate: number,
  tasks: Task[]
}