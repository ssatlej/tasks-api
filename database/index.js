import pkg from "pg";
import chalk from "chalk";
import dotenv from "dotenv";
import { DATABASE_URL, NODE_ENV } from "../config.js";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export default pool;
