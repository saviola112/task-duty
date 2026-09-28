import { useState } from "react";
import "./NewTask.css";

function NewTask({ tasks, setTasks, setPage }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      priority: priority,
      category: category,
      dueDate: dueDate,
      completed: completed,
    };

    setTasks([...tasks, newTask]);
    setPage("tasks");
  }

  return (
    <main className="new-task" id="top">
      <div className="new-task-container">
        <h2>New Task</h2>

        <form className="task-form" onSubmit={handleSubmit}>
          <label htmlFor="task-title">Task Title</label>
          <input
            type="text"
            id="task-title"
            placeholder="Enter task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            placeholder="Briefly describe your task..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          ></textarea>

          <label htmlFor="task-priority">Tags</label>
          <select
            id="task-priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            required
          >
            <option value="disabled">Select priority</option>
            <option value="Urgent">Urgent</option>
            <option value="Important">Important</option>
          </select>

          <label htmlFor="task-category">Category</label>
          <input
            type="text"
            id="task-category"
            placeholder="Enter task category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />

          <label htmlFor="task-due-date">Due Date</label>
          <input
            type="date"
            id="task-due-date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            min={new Date().toISOString("T")[0]}
            required
          />

          <div className="completed-field">
            <label htmlFor="task-completed">Completed</label>

            <input
              type="checkbox"
              id="task-completed"
              checked={completed}
              onChange={(event) => setCompleted(event.target.checked)}
            />
          </div>

          <button type="submit">Done</button>
        </form>

        <a href="#top" className="back-to-top">
          Back To Top
        </a>
      </div>
    </main>
  );
}

export default NewTask;
