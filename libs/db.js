import mongoose from "mongoose";

if (!global.mongoose) global.mongoose = { conn: null, promise: null };

export async function dbConnect() {
  if (global.mongoose.conn) return global.mongoose.conn;

  if (!global.mongoose.promise) {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");

    global.mongoose.promise = mongoose.connect(process.env.MONGO_URI);
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}
