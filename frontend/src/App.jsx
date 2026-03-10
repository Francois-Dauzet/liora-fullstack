import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/tasks/";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);

      setTasks([
        { id: 1, title: "Learn Pytest fundamentals", completed: true },
        { id: 2, title: "Configure Django with Pytest", completed: false },
        { id: 3, title: "Master pytest fixtures", completed: false },
        { id: 4, title: "Refactor unittest to pytest", completed: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const response = await axios.post(API_URL, {
        title: newTaskTitle,
        completed: false,
      });
      setTasks([response.data, ...tasks]);
      setNewTaskTitle("");
    } catch (error) {
      console.error("Error creating task:", error);

      const newTask = { id: Date.now(), title: newTaskTitle, completed: false };
      setTasks([newTask, ...tasks]);
      setNewTaskTitle("");
    }
  };

  const handleToggleComplete = async (task) => {
    const updatedStatus = !task.completed;
    try {
      await axios.patch(`${API_URL}${task.id}/`, { completed: updatedStatus });
      setTasks(
        tasks.map((t) =>
          t.id === task.id ? { ...t, completed: updatedStatus } : t,
        ),
      );
    } catch (error) {
      console.error("Error updating task:", error);
      setTasks(
        tasks.map((t) =>
          t.id === task.id ? { ...t, completed: updatedStatus } : t,
        ),
      );
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Task Master</h1>
        <p>Your elegant daily progress tracker</p>
        <button
          onClick={() => {
            throw new Error("Test Sentry Error from React");
          }}
          className="btn btn-delete"
          style={{
            marginTop: "1rem",
            color: "var(--danger-color)",
            borderColor: "var(--danger-color)",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
        >
          Vérifier Sentry (Générer Erreur)
        </button>
      </header>

      <form className="task-form" onSubmit={handleCreateTask}>
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">No tasks yet. Enjoy your day!</div>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              <div className="task-content">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                />
                <span className="task-text">{task.title}</span>
              </div>
              <button
                className="btn btn-delete"
                onClick={() => handleDeleteTask(task.id)}
                aria-label="Delete task"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
