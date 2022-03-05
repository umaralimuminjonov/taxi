import dotenv from "dotenv";
dotenv.config();

const environments = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};

export default environments;
