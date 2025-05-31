package com.task.tasktracker.services.impl;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
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

import jakarta.transaction.Transactional;


@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;

    public TaskServiceImpl(TaskRepository taskRepository, TaskListRepository taskListRepository) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
    }

    @Override
    public List<TaskEntity> listTasks(UUID taskListId) {
        return taskRepository.findByTaskListId(taskListId);
    }

    @Override
    public TaskEntity createTask(UUID taskListId, TaskEntity task) {
        if(null != task.getId()) {
            throw new IllegalArgumentException("Task already has an ID!");
        }
        if(null == task.getTitle() || task.getTitle().isBlank()) {
            throw new IllegalArgumentException("Task must have a title!");
        }

        TaskPriority taskPriority = Optional.ofNullable(task.getPriority())
                .orElse(TaskPriority.MEDIUM);

        TaskStatus taskStatus = TaskStatus.OPEN;

        TaskListEntity taskListEntity = taskListRepository.findById(taskListId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Task List ID provided!"));

        LocalDateTime now = LocalDateTime.now();
        TaskEntity taskToSave = new TaskEntity(
                null,
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                taskStatus,
                taskPriority,
                taskListEntity,
                now,
                now
        );

        return taskRepository.save(taskToSave);
    }

    @Override
        public Optional<TaskEntity> getTask(UUID taskListId, UUID taskId) {
        return taskRepository.findByTaskListIdAndId(taskListId, taskId);
    }

    @Override
    public TaskEntity updateTask(UUID taskListId, UUID taskId, TaskEntity task) {
        if(null == task.getId()) {
        throw new IllegalArgumentException("Task must have ID!");
        }
        if(!Objects.equals(taskId, task.getId())) {
        throw new IllegalArgumentException("Task IDs do not match!");
        }
        if(null == task.getPriority()) {
        throw new IllegalArgumentException("Task must have a valid priority!");
        }
        if(null == task.getStatus()) {
        throw new IllegalArgumentException("Task must have a valid status!");
        }
        TaskEntity existingTask = taskRepository.findByTaskListIdAndId(
        taskListId, task.getId()
        ).orElseThrow(() -> new IllegalArgumentException("Task not found!"));
        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setDueDate(task.getDueDate());
        existingTask.setPriority(task.getPriority());
        existingTask.setStatus(task.getStatus());
        existingTask.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(existingTask);
    }

    @Transactional
    @Override
    public void deleteTask(UUID taskListId, UUID taskId) {
        taskRepository.deleteByTaskListIdAndId(taskListId, taskId);
    }

}
