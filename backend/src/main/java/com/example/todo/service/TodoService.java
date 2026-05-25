package com.example.todo.service;

import com.example.todo.dao.TodoDao;
import com.example.todo.entity.Todo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoService {

    private final TodoDao todoDao;

    public List<Todo> findAll() {
        return todoDao.selectAll();
    }

    public List<Todo> findByDateRange(LocalDate start, LocalDate end) {
        return todoDao.selectByDateRange(start, end);
    }

    public Todo findById(Long id) {
        return todoDao.selectById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + id));
    }

    @Transactional
    public Todo create(Todo todo) {
        todoDao.insert(todo);
        return todo;
    }

    @Transactional
    public Todo update(Long id, Todo updated) {
        Todo todo = findById(id);
        todo.setTitle(updated.getTitle());
        todo.setDescription(updated.getDescription());
        todo.setDueDate(updated.getDueDate());
        todo.setCompleted(updated.isCompleted());
        todoDao.update(todo);
        return todo;
    }

    @Transactional
    public void delete(Long id) {
        Todo todo = findById(id);
        todoDao.delete(todo);
    }
}
