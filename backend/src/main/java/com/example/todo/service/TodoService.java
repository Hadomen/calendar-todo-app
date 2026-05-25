package com.example.todo.service;

import com.example.todo.entity.Todo;
import com.example.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoService {

    private final TodoRepository todoRepository;

    public List<Todo> findAll() {
        return todoRepository.findAll();
    }

    public List<Todo> findByDateRange(LocalDate start, LocalDate end) {
        return todoRepository.findByDueDateBetween(start, end);
    }

    public Todo findById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + id));
    }

    @Transactional
    public Todo create(Todo todo) {
        return todoRepository.save(todo);
    }

    @Transactional
    public Todo update(Long id, Todo updated) {
        Todo todo = findById(id);
        todo.setTitle(updated.getTitle());
        todo.setDescription(updated.getDescription());
        todo.setDueDate(updated.getDueDate());
        todo.setCompleted(updated.isCompleted());
        return todoRepository.save(todo);
    }

    @Transactional
    public void delete(Long id) {
        todoRepository.deleteById(id);
    }
}
