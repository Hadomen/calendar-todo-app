import { useState, useEffect, useCallback } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import type { EventClickArg, EventInput } from '@fullcalendar/core'
import { getTodos, createTodo, updateTodo, deleteTodo } from './api'
import type { Todo, TodoInput } from './api'
import TodoModal from './TodoModal'
import './App.css'

type ModalState =
  | { open: false }
  | { open: true; date: string; todo?: Todo }

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [modal, setModal] = useState<ModalState>({ open: false })

  const loadTodos = useCallback(async () => {
    try {
      setTodos(await getTodos())
    } catch (e) {
      console.error('TODOの取得に失敗しました', e)
    }
  }, [])

  useEffect(() => { loadTodos() }, [loadTodos])

  const events: EventInput[] = todos.map(t => ({
    id: String(t.id),
    title: t.completed ? `✓ ${t.title}` : t.title,
    start: t.dueDate,
    backgroundColor: t.completed ? '#94a3b8' : '#2563eb',
    borderColor: t.completed ? '#64748b' : '#1d4ed8',
    extendedProps: { todo: t },
  }))

  const handleDateClick = (arg: DateClickArg) => {
    setModal({ open: true, date: arg.dateStr })
  }

  const handleEventClick = (arg: EventClickArg) => {
    const todo = arg.event.extendedProps.todo as Todo
    setModal({ open: true, date: todo.dueDate, todo })
  }

  const handleSave = async (input: TodoInput) => {
    if (modal.open && modal.todo?.id) {
      await updateTodo(modal.todo.id, input)
    } else {
      await createTodo(input)
    }
    setModal({ open: false })
    loadTodos()
  }

  const handleDelete = async (id: number) => {
    await deleteTodo(id)
    setModal({ open: false })
    loadTodos()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📅 カレンダーTODO</h1>
        <span className="hint">日付をクリックして追加・TODOをクリックして編集</span>
      </header>
      <main className="app-main">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={jaLocale}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek',
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
          eventDisplay="block"
        />
      </main>
      {modal.open && (
        <TodoModal
          date={modal.date}
          todo={modal.todo}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setModal({ open: false })}
        />
      )}
    </div>
  )
}
