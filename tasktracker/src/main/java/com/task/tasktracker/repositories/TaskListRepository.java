package com.task.tasktracker.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.task.tasktracker.domain.entities.TaskListEntity;

@Repository
public interface TaskListRepository extends JpaRepository<TaskListEntity, UUID> {
    
}
