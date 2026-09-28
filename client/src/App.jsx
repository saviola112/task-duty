import { useState, useEffect } from "react";
import Header from "./components/Header";
import NewTask from "./components/NewTask";
import MyTasks from "./components/MyTasks";
import EditTask from "./components/EditTask";
import Home from "./components/Home";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("page");

    if (
      savedPage === "home" ||
      savedPage === "tasks" ||
      savedPage === "new-task" ||
      savedPage === "edit-task"
    ) {
      return savedPage;
    }

    return "home";
  });
  const [editingTask, setEditingTask] = useState(() => {
    const savedEditingTask = localStorage.getItem("editingTask");
    return savedEditingTask ? JSON.parse(savedEditingTask) : null;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  useEffect(() => {
    if (editingTask) {
      localStorage.setItem("editingTask", JSON.stringify(editingTask));
    }
  }, [editingTask]);

  return (
    <div>
      <Header page={page} setPage={setPage} />
      {page === "home" && <Home setPage={setPage} />}
      {page === "new-task" && (
        <NewTask tasks={tasks} setTasks={setTasks} setPage={setPage} />
      )}

      {page === "tasks" && (
        <MyTasks
          tasks={tasks}
          setTasks={setTasks}
          setPage={setPage}
          setEditingTask={setEditingTask}
        />
      )}
      {page === "edit-task" && (
        <EditTask
          editingTask={editingTask}
          tasks={tasks}
          setTasks={setTasks}
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default App;
