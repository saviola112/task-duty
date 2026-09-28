import { useState } from "react";
import "./EditTask.css";

function EditTask({ editingTask, tasks, setTasks, setPage }) {
  const [title, setTitle] = useState(editingTask.title);
  const [description, setDescription] = useState(editingTask.description);
  const [priority, setPriority] = useState(editingTask.priority);
  const [category, setCategory] = useState(editingTask.category);
  const [dueDate, setDueDate] = useState(editingTask.dueDate);
  const [completed, setCompleted] = useState(editingTask.completed);

  function handleUpdate(event) {
    event.preventDefault();

    const updatedTask = {
      id: editingTask.id,
      title: title,
      description: description,
      priority: priority,
      category: category,
      dueDate: dueDate,
      completed: completed,
    };

    const updatedTasks = tasks.map((task) => {
      if (task.id === editingTask.id) {
        return updatedTask;
      }

      return task;
    });

    setTasks(updatedTasks);

    setPage("tasks");
  }

  return (
    <main className="edit-task" id="top">
      <div className="edit-task-container">
        <h2>Edit Task</h2>
        <form className="task-form" onSubmit={handleUpdate}>
          <label htmlFor="edit-task-title">Task Title</label>
          <input
            type="text"
            id="edit-task-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label htmlFor="edit-task-description">Description</label>
          <textarea
            id="edit-task-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          ></textarea>

          <label htmlFor="edit-task-priority">Tags</label>
          <select
            id="edit-task-priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            required
          >
            <option value="" disabled>
              Select priority
            </option>

            <option value="Urgent">Urgent</option>
            <option value="Important">Important</option>
          </select>

          <label htmlFor="edit-task-category">Category</label>
          <input
            type="text"
            id="edit-task-category"
            placeholder="Enter task category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />

          <label htmlFor="edit-task-due-date">Due Date</label>
          <input
            type="date"
            id="edit-task-due-date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />

          <div className="completed-field">
            <label htmlFor="edit-task-completed">Completed</label>
            <input
              type="checkbox"
              id="edit-task-completed"
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

export default EditTask;
