import express from "express";
import cors from "cors";
import "dotenv/config";
import notFound from "./middleware/notFound.js";
import { error } from "express-error-catcher";
import logger from "morgan";
import "./helpers/globals.js";
import pool from "./database/index.js"; 
import chalk from "chalk";
import createTables from "./schemas/index.js";
import indexRouter from "./routes.js";
import { PORT } from "./config.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(logger("dev"));

pool.on('connect', () => {
  console.log(chalk.green("PostgreSQL connection established"));
});

app.use("/", indexRouter);
app.use(notFound);

const startApp = () => {
    app.listen(PORT, () => {
      console.log(chalk.blueBright(`Server listening on http://localhost:${PORT}`));
    });
};

const connectAndStart = () => {
    createTables().then(() => {
      startApp();
    })
    .catch((err) => {
      console.error(chalk.red("Error connecting to PostgreSQL"), err);
      setTimeout(connectAndStart, 3000); 
    });
};

connectAndStart();  

export default app;
