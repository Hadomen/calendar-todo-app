import { useState } from 'react'
import type { Todo, TodoInput } from './api'

interface Props {
  date: string
  todo?: Todo
  onSave: (input: TodoInput) => Promise<void>
  onDelete: (id: number) => Promise<void>
  onClose: () => void
}

export default function TodoModal({ date, todo, onSave, onDelete, onClose }: Props) {
  const [title, setTitle] = useState(todo?.title ?? '')
  const [description, setDescription] = useState(todo?.description ?? '')
  const [completed, setCompleted] = useState(todo?.completed ?? false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!title.trim()) { setError('タイトルを入力してください'); return }
    setLoading(true)
    try {
      await onSave({
        title: title.trim(),
        description: description.trim() || null,
        dueDate: date,
        completed,
      })
    } catch {
      setError('保存に失敗しました')
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!todo?.id || !confirm('このTODOを削除しますか？')) return
    setLoading(true)
    try {
      await onDelete(todo.id)
    } catch {
      setError('削除に失敗しました')
      setLoading(false)
    }
  }

  const displayDate = date.replace(/-/g, '/')

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{todo ? 'TODOを編集' : 'TODOを追加'}</h2>
            <span className="modal-date">{displayDate}</span>
          </div>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {error && <p className="error-msg">{error}</p>}

          <label className="field">
            タイトル <span className="required">*</span>
            <input
              type="text"
              value={title}
              onChange={e => { setTitle(e.target.value); setError('') }}
              placeholder="例：資料を作成する"
              autoFocus
            />
          </label>

          <label className="field">
            メモ
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="詳細メモ（任意）"
              rows={3}
            />
          </label>

          <label className="field-row">
            <input
              type="checkbox"
              checked={completed}
              onChange={e => setCompleted(e.target.checked)}
            />
            完了済みにする
          </label>
        </div>

        <div className="modal-footer">
          {todo && (
            <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
              削除
            </button>
          )}
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={onClose} disabled={loading}>
              キャンセル
            </button>
            <button className="btn btn-primary" onClick={handleSave} disabled={loading || !title.trim()}>
              {loading ? '保存中…' : '保存'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
