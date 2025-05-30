package com.task.tasktracker.domain.entities;

public enum TaskStatus {
    OPEN("Abierta"),
    CLOSED("Cerrada");

    private final String label;

    TaskStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
