import { useState } from "react";
import "./MyTasks.css";
import deleteIcon from "../assets/Delete-button.png";
import editIcon from "../assets/Edit-button.png";

function MyTasks({ tasks, setTasks, setPage, setEditingTask }) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState("");
  const [apiTasks, setApiTasks] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function searchBackend() {
    if (!token.trim()) {
      setSearchError("Please paste your login token first.");
      return;
    }

    try {
      setSearchError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks?search=${encodeURIComponent(searchTerm)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Search request failed");
      }

      setApiTasks(data.tasks || []);
      setHasSearched(true);
    } catch (error) {
      setSearchError(error.message);
    }
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      categoryFilter === "all" || task.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed === true) ||
      (statusFilter === "incomplete" && task.completed === false);

    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <main className="my-tasks" id="top">
      <div className="my-tasks-container">
        <div className="my-tasks-header">
          <h2>My Tasks</h2>

          <button
            className="add-task-button"
            onClick={() => setPage("new-task")}
          >
            <span>+</span> Add New Task
          </button>
        </div>

        <div className="task-search">
          <input
            type="password"
            placeholder="Paste your login token here"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            aria-label="Authentication token"
          />
        </div>

        <div className="task-search">
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                searchBackend();
              }
            }}
            aria-label="Search tasks by title or description"
          />
          <button
            type="button"
            className="search-button"
            onClick={searchBackend}
          >
            Search
          </button>
        </div>

        <div className="task-filters">
          <label htmlFor="category-filter">Category:</label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>

          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        {hasSearched ? (
          <div className="backend-search-results">
            <h3>Backend Search Results</h3>

            {apiTasks.length > 0 ? (
              apiTasks.map((task) => (
                <div className="task-card" key={task._id}>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Category: {task.category}</p>
                  <p>Priority: {task.priority}</p>
                  <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
                </div>
              ))
            ) : (
              <p>No matching tasks found in the backend.</p>
            )}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div className="task-card" key={task.id}>
              <div className="task-card-top">
                <span
                  className={`task-priority ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>

                <div className="task-actions">
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditingTask(task);
                      setPage("edit-task");
                    }}
                  >
                    <img src={editIcon} alt="" />
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task.id)}
                  >
                    <img src={deleteIcon} alt="" />
                    Delete
                  </button>
                </div>
              </div>
              <div className="task-card-divider"></div>

              <h3>{task.title}</h3>

              <p>{task.description}</p>
            </div>
          ))
        )}

        <a href="#top" className="back-to-top">
          Back To Top
        </a>
      </div>
    </main>
  );
}

export default MyTasks;
