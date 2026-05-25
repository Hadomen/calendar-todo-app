package com.example.todo.config;

import com.example.todo.dao.TodoDao;
import com.example.todo.dao.TodoDaoImpl;
import org.seasar.doma.jdbc.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DaoConfig {

    @Bean
    public TodoDao todoDao(Config config) {
        return new TodoDaoImpl(config);
    }
}
