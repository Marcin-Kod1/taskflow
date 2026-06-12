import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const response = await fetch("http://localhost:8080/tasks");
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        completed: false,
      }),
    });

    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE",
    });

    loadTasks();
  };

  const toggleTask = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}/toggle`, {
      method: "PUT",
    });

    loadTasks();
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h1>TaskFlow</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nowe zadanie"
      />

      <button onClick={addTask}>
        Dodaj
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleTask(task.id)}
            >
              {task.title}
            </span>

            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: 10 }}
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;