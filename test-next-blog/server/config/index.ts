import dotenv from "dotenv";
dotenv.config();

export default {
  DATABASE_HOST: "localhost",
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USER: 'root',
  DATABASE_PASSWORD: "password",
  DATABASE_NAME: "blog_react_express2",
};