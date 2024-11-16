import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/route.js";
import cors from "cors"
  
dotenv.config(); 
 
connectDB();   
const app = express();   
app.use(cors())

app.use(express.json());  
  
app.use("/auth", router);
app.use("/tasks", router);

  const PORT = 4000;  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });  