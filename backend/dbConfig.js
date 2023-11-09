import mongoose from 'mongoose';

const connectDB = async()=>{
  try {
     const conn = await mongoose.connect(process.env.MONGO_URI) 
     console.log(`Connecting to: ${conn.connection.host}`)
  } catch (error) {
     console.log(`Error connecting to: ${error}`)
  }
}

export default connectDB;