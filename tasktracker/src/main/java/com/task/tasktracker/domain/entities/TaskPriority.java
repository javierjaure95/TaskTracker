package com.task.tasktracker.domain.entities;

public enum TaskPriority {

    HIGH("Alta"),
    MEDIUM("Media"),
    LOW("Baja");

    private final String label;

    TaskPriority(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
