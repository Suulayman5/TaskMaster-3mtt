import Task from "../models/taskModel.js";

const createTask = async (req, res) => {
  const { title, description, deadline, priority } = req.body;

  if (!title || !description || !deadline || !priority) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const task = new Task({
      title,
      description,
      deadline,
      priority,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ Task });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message});
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline, priority } = req.body;

  try {
    const task = await Task.findById(id);  
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;
    task.priority = priority || task.priority;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message});
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message });
  }
};

export { createTask, getTasks, updateTask, deleteTask };
