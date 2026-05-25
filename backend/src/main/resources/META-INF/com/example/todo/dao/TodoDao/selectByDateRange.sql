SELECT
    id,
    title,
    description,
    due_date,
    completed,
    created_at
FROM todos
WHERE due_date BETWEEN /* start */'2000-01-01' AND /* end */'2099-12-31'
ORDER BY due_date, id
