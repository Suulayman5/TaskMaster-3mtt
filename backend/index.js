import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/route.js";
import cors from "cors"
  
dotenv.config(); 
 
connectDB();   
const app = express();   
const corsOptions = {
  origin: "http://127.0.0.1:5500", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
};
app.use(cors(corsOptions));


app.use(express.json());  
  
app.use("/auth", router);
app.use("/tasks", router);

  const PORT = 4000;  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });  