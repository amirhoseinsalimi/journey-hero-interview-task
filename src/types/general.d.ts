type Priority = 'High' | 'Medium' | 'Low'

type Task = {
  title: string,
  description: string,
  dueDate: number,
  priority: Priority
}

type Todo = {
  id: string,
  title: string,
  description: string,
  creationDate: number,
  tasks: Task[]
}