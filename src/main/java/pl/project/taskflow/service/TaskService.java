package pl.project.taskflow.service;

import java.util.List;

import org.springframework.stereotype.Service;

import pl.project.taskflow.model.Task;
import pl.project.taskflow.repository.TaskRepository;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    public Task createTask(Task task) {
        return repository.save(task);
    }

    public void deleteTask(Long id) {
        repository.deleteById(id);
    }

    public Task toggleTask(Long id) {
        Task task = repository.findById(id)
                .orElseThrow();

        task.setCompleted(!task.isCompleted());

        return repository.save(task);
    }
}
