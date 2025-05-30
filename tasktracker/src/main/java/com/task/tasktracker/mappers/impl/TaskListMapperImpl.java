package com.task.tasktracker.mappers.impl;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.task.tasktracker.domain.dto.TaskListDto;
import com.task.tasktracker.domain.entities.TaskEntity;
import com.task.tasktracker.domain.entities.TaskListEntity;
import com.task.tasktracker.domain.entities.TaskStatus;
import com.task.tasktracker.mappers.TaskListMapper;
import com.task.tasktracker.mappers.TaskMapper;

@Component
public class TaskListMapperImpl implements TaskListMapper {

    private final TaskMapper taskMapper;

    public TaskListMapperImpl(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskListEntity fromDto(TaskListDto taskListDto) {
        return new TaskListEntity(
                taskListDto.id(),
                taskListDto.title(),
                taskListDto.description(),
                Optional.ofNullable(taskListDto.tasks())
                        .map(tasks -> tasks.stream()
                                .map(taskMapper::fromDto)
                                .toList()
                        ).orElse(null),
                null,
                null
        );
    }

    @Override
    public TaskListDto toDto(TaskListEntity taskListEntity) {
        return new TaskListDto(
                taskListEntity.getId(),
                taskListEntity.getTitle(),
                taskListEntity.getDescription(),
                Optional.ofNullable(taskListEntity.getTasksEntity())
                        .map(List::size)
                        .orElse(0),
                calculateTaskListProgress(taskListEntity.getTasksEntity()),
                Optional.ofNullable(taskListEntity.getTasksEntity())
                        .map(tasks ->
                                tasks.stream().map(taskMapper::toDto).toList()
                        ).orElse(null)
        );
    }

    private Double calculateTaskListProgress(List<TaskEntity> tasksEntities) {
        if(null == tasksEntities) {
            return null;
        }

        long closedTaskCount = tasksEntities.stream().filter(task ->
                TaskStatus.CLOSED == task.getStatus()
        ).count();

        return (double) closedTaskCount / tasksEntities.size();
    }

}
