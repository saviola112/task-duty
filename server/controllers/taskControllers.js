import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category, priority } = req.body;

    if (!title || !description || !dueDate || !category || !priority) {
      return res.status(400).json({
        message: "All task fields are required",
      });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      category,
      priority,
      user: req.user.userId,
    });

    res.status(201).json({
      message: "Task created succesfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { category, completed, search } = req.query;

    const filter = {
      user: req.user.userId,
    };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

    const tasks = await Task.find(filter);

    res.status(200).json({
      message: "Task retrived successfully",
      tasks,
    });
  } catch (error) {
    res.ststus(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, category, priority, completed } =
      req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found or you are not authorized to update it",
      });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;
    task.category = category ?? task.category;
    task.priority = priority ?? task.priority;
    task.completed = completed ?? task.completed;

    const updatedTask = await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found or you are not authorized to delete",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
