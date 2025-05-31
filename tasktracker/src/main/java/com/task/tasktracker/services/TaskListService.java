package com.task.tasktracker.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import com.task.tasktracker.domain.entities.TaskListEntity;


public interface TaskListService {
    List<TaskListEntity> listTaskLists();
    TaskListEntity createTaskList(TaskListEntity taskList);
    Optional<TaskListEntity> getTaskList(UUID id);
    TaskListEntity updateTaskList(UUID taskListId, TaskListEntity taskList);
    void deleteTaskList(UUID taskListId);
}
