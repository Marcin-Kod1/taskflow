package pl.project.taskflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.project.taskflow.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
