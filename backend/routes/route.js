import express from "express";
import {signIn, signUp } from "../controllers/userController.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";


const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/", createTask);
router.get("/", getTasks); 
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
  
export default router;
