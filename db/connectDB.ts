import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGO_URI;
console.log("This is Run");
console.log(DATABASE_URL);

if (!DATABASE_URL) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    if (DATABASE_URL) {
      cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
        console.log("connected");
        return mongoose;
      });
    } else {
      console.error("DATABASE_URL must be defined");
    }
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
