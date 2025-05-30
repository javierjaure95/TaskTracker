package com.task.tasktracker.mappers;

import com.task.tasktracker.domain.dto.TaskListDto;
import com.task.tasktracker.domain.entities.TaskListEntity;

public interface TaskListMapper {

    TaskListEntity fromDto(TaskListDto taskListDto);

    TaskListDto toDto(TaskListEntity taskListEntity);
}

