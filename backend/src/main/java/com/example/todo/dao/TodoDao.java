package com.example.todo.dao;

import com.example.todo.entity.Todo;
import org.seasar.doma.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Dao
public interface TodoDao {

    @Select
    List<Todo> selectAll();

    @Select
    Optional<Todo> selectById(Long id);

    @Select
    List<Todo> selectByDateRange(LocalDate start, LocalDate end);

    @Insert
    int insert(Todo todo);

    @Update
    int update(Todo todo);

    @Delete
    int delete(Todo todo);
}
