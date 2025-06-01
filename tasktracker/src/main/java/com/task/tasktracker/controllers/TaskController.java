package com.task.tasktracker.controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.task.tasktracker.domain.dto.TaskDto;
import com.task.tasktracker.domain.entities.TaskEntity;
import com.task.tasktracker.mappers.TaskMapper;
import com.task.tasktracker.services.TaskService;

@RestController
@RequestMapping(path = "/task-lists/{task_list_id}/tasks")
public class TaskController {

    private final TaskService taskService;
    private final TaskMapper taskMapper;

    public TaskController(TaskService taskService, TaskMapper taskMapper) {
        this.taskService = taskService;
        this.taskMapper = taskMapper;
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> listTasks(@PathVariable("task_list_id") UUID taskListId) {
        List<TaskDto> tasks = taskService.listTasks(taskListId)
                .stream()
                .map(taskMapper::toDto)
                .toList();

        if (tasks.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(tasks);
        }
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(
            @PathVariable("task_list_id") UUID taskListId,
            @RequestBody TaskDto taskDto) {
        TaskEntity createdTask = taskService.createTask(
                taskListId,
                taskMapper.fromDto(taskDto));
        TaskDto result = taskMapper.toDto(createdTask);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);

    }

    @GetMapping("/{task_id}")
    public ResponseEntity<TaskDto> getTask(
            @PathVariable("task_list_id") UUID taskListId,
            @PathVariable("task_id") UUID taskId) {
        return taskService.getTask(taskListId, taskId)
                .map(taskMapper::toDto)
                .map(ResponseEntity::ok) 
                .orElseGet(() -> ResponseEntity.noContent().build()); 
    }

    @PutMapping(path = "/{task_id}")
    public TaskDto updateTask(
            @PathVariable("task_list_id") UUID taskListId,
            @PathVariable("task_id") UUID id,
            @RequestBody TaskDto taskDto) {
        TaskEntity updatedTask = taskService.updateTask(
                taskListId,
                id,
                taskMapper.fromDto(taskDto));
        return taskMapper.toDto(updatedTask);
    }

    @DeleteMapping(path = "/{task_id}")
    public void deleteTask(
            @PathVariable("task_list_id") UUID taskListId,
            @PathVariable("task_id") UUID taskId) {
        taskService.deleteTask(taskListId, taskId);
    }

}
