package com.task.tasktracker.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.task.tasktracker.domain.entities.TaskEntity;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, UUID> {
    List<TaskEntity> findByTaskListId(UUID taskListId);
    Optional<TaskEntity> findByTaskListIdAndId(UUID taskListId, UUID id);
}
