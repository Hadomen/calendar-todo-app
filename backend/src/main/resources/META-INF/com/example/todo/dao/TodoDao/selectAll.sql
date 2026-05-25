SELECT
    id,
    title,
    description,
    due_date,
    completed,
    created_at
FROM todos
ORDER BY due_date, id
