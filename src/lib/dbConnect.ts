import { log } from "console";
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connnection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connnection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connnection.isConnected = db.connections[0].readyState;
    console.log("Connected to database successfully.");
  } catch (error) {
    console.log("Faild to connect to the database. : ", error);

    process.exit(1);
  }
}

export default dbConnect;
