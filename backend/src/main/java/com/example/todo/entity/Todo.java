package com.example.todo.entity;

import org.seasar.doma.*;
import org.seasar.doma.jdbc.entity.NamingType;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(naming = NamingType.SNAKE_LOWER_CASE)
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;

    String description;

    LocalDate dueDate;

    boolean completed;

    @Column(insertable = false, updatable = false)
    LocalDateTime createdAt;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public LocalDate getDueDate() { return dueDate; }
    public boolean isCompleted() { return completed; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}
