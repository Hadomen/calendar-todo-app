export interface Todo {
  id: number
  title: string
  description: string | null
  dueDate: string
  completed: boolean
  createdAt: string
}

export type TodoInput = {
  title: string
  description: string | null
  dueDate: string
  completed: boolean
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, options)
  if (!res.ok) throw new Error(`${options?.method ?? 'GET'} ${path} failed: ${res.status}`)
  if (res.status === 204) return undefined as T
  return res.json()
}

export const getTodos = () =>
  request<Todo[]>('/api/todos')

export const createTodo = (input: TodoInput) =>
  request<Todo>('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

export const updateTodo = (id: number, input: TodoInput) =>
  request<Todo>(`/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

export const deleteTodo = (id: number) =>
  request<void>(`/api/todos/${id}`, { method: 'DELETE' })
