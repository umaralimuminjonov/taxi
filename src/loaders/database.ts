import mongoose from "mongoose";

import DatabaseError from "../errors/database.error";
import env from "../config/environments";

const db = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log("Database connected");
  } catch (err) {
    throw new DatabaseError();
  }
};

export default db;
