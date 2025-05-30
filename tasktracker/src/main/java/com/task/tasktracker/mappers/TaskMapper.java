package com.task.tasktracker.mappers;

import com.task.tasktracker.domain.dto.TaskDto;
import com.task.tasktracker.domain.entities.TaskEntity;

public interface TaskMapper {

    TaskEntity fromDto(TaskDto taskDto);

    TaskDto toDto(TaskEntity taskEntity);

}
