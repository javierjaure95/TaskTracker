package com.task.tasktracker.domain.dto;

import java.util.UUID;

import com.task.tasktracker.domain.entities.TaskPriority;
import com.task.tasktracker.domain.entities.TaskStatus;
import java.time.LocalDateTime;

public record TaskDto(
        UUID id,
        String title,
        String description,
        LocalDateTime dueDate,
        TaskPriority priority,
        TaskStatus status
) {
}
