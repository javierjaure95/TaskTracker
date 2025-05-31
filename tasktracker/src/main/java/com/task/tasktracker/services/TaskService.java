package com.task.tasktracker.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


import com.task.tasktracker.domain.entities.TaskEntity;

public interface TaskService {
    List<TaskEntity> listTasks(UUID taskListId);
    TaskEntity createTask(UUID taskListId, TaskEntity task);
    Optional<TaskEntity> getTask(UUID taskListId, UUID taskId);
    TaskEntity updateTask(UUID taskListId, UUID taskId, TaskEntity task);
    void deleteTask(UUID taskListId, UUID taskId); 
}
