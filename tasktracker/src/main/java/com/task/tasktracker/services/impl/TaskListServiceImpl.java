package com.task.tasktracker.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.task.tasktracker.repositories.TaskListRepository;
import com.task.tasktracker.services.TaskListService;
import com.task.tasktracker.domain.entities.TaskListEntity;

@Service
public class TaskListServiceImpl implements TaskListService {

    private final TaskListRepository taskListRepository;

    public TaskListServiceImpl(TaskListRepository taskListRepository) {
        this.taskListRepository = taskListRepository;
    }

    @Override
    public List<TaskListEntity> listTaskLists() {
        return taskListRepository.findAll();
    }

    
    @Override
    public TaskListEntity createTaskList(TaskListEntity taskList) {
        if(null != taskList.getId()) {
            throw new IllegalArgumentException("Task list already has an ID!");
        }
        if(null == taskList.getTitle() || taskList.getTitle().isBlank()) {
            throw new IllegalArgumentException("Task list title must be present!");
        }

        LocalDateTime now = LocalDateTime.now();
        return taskListRepository.save(new TaskListEntity(
                null,
                taskList.getTitle(),
                taskList.getDescription(),
                null,
                now,
                now
        ));
    }
    @Override
    public Optional<TaskListEntity> getTaskList(UUID id) {
        return taskListRepository.findById(id);
    }

    @Override
    public TaskListEntity updateTaskList(UUID taskListId, TaskListEntity taskList) {
        if(null == taskList.getId()) {
            throw new IllegalArgumentException("Task list must have an ID");
        }

        if(!Objects.equals(taskList.getId(), taskListId)) {
            throw new IllegalArgumentException("Attempting to change task list ID, this is not permitted!");
        }

        TaskListEntity existingTaskList = taskListRepository.findById(taskListId).orElseThrow(() ->
                new IllegalArgumentException("Task list not found!"));

        existingTaskList.setTitle(taskList.getTitle());
        existingTaskList.setDescription(taskList.getDescription());
        existingTaskList.setUpdatedAt(LocalDateTime.now());
        return taskListRepository.save(existingTaskList);
    }

    @Override
    public void deleteTaskList(UUID taskListId) {
        taskListRepository.deleteById(taskListId);
    }

}
