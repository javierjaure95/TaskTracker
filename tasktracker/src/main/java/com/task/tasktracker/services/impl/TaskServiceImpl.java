package com.task.tasktracker.services.impl;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.task.tasktracker.domain.entities.TaskEntity;
import com.task.tasktracker.domain.entities.TaskListEntity;
import com.task.tasktracker.domain.entities.TaskPriority;
import com.task.tasktracker.domain.entities.TaskStatus;
import com.task.tasktracker.repositories.TaskListRepository;
import com.task.tasktracker.repositories.TaskRepository;
import com.task.tasktracker.services.TaskService;


@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;

    public TaskServiceImpl(TaskRepository taskRepository, TaskListRepository taskListRepository) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
    }

    @Override
    public List<TaskEntity> listTasks(UUID taskListEntityId) {
        return taskRepository.findByTaskListEntityId(taskListEntityId);
    }

    @Override
    public TaskEntity createTask(UUID taskListEntityId, TaskEntity taskEntity) {
        if(null != taskEntity.getId()) {
            throw new IllegalArgumentException("Task already has an ID!");
        }
        if(null == taskEntity.getTitle() || taskEntity.getTitle().isBlank()) {
            throw new IllegalArgumentException("Task must have a title!");
        }

        TaskPriority taskPriority = Optional.ofNullable(taskEntity.getPriority())
                .orElse(TaskPriority.MEDIUM);

        TaskStatus taskStatus = TaskStatus.OPEN;

        TaskListEntity taskListEntity = taskListRepository.findById(taskListEntityId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Task List ID provided!"));

        LocalDateTime now = LocalDateTime.now();
        TaskEntity taskToSave = new TaskEntity(
                null,
                taskEntity.getTitle(),
                taskEntity.getDescription(),
                taskEntity.getDueDate(),
                taskStatus,
                taskPriority,
                taskListEntity,
                now,
                now
        );

        return taskRepository.save(taskToSave);
    }

}
