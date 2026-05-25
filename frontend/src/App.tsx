import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import { EventClickArg } from '@fullcalendar/core'

function App() {
  const handleDateClick = (arg: DateClickArg) => {
    console.log('date clicked:', arg.dateStr)
  }

  const handleEventClick = (arg: EventClickArg) => {
    console.log('event clicked:', arg.event.title)
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>カレンダーTODO</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={jaLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
      />
    </div>
  )
}

export default App
