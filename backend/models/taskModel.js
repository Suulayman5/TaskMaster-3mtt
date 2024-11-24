import mongoose from "mongoose";
import User from "./userModel";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  }
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
