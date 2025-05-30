package com.task.tasktracker.mappers.impl;

import org.springframework.stereotype.Component;

import com.task.tasktracker.domain.dto.TaskDto;
import com.task.tasktracker.domain.entities.TaskEntity;
import com.task.tasktracker.mappers.TaskMapper;


@Component
public class TaskMapperImpl implements TaskMapper {

    @Override
    public TaskEntity fromDto(TaskDto taskDto) {
        return new TaskEntity(
                taskDto.id(),
                taskDto.title(),
                taskDto.description(),
                taskDto.dueDate(),
                taskDto.status(),
                taskDto.priority(),
                null,
                null,
                null
        );
    }

    @Override
    public TaskDto toDto(TaskEntity taskEntity) {
        return new TaskDto(
                taskEntity.getId(),
                taskEntity.getTitle(),
                taskEntity.getDescription(),
                taskEntity.getDueDate(),
                taskEntity.getPriority(),
                taskEntity.getStatus()
        );
    }

}
