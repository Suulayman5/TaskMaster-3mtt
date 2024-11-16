import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log('mongodb:', process.env.MONGODB_URL);

    const conn = await mongoose.connect(process.env.MONGODB_URL, {
   
    });
    console.log(`mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
