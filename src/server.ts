import express from "express";
import path from "node:path";

import config from "./config";
import bot from "./bot";
import mainRouter from "./routes/index";
import errorHandler from "./bot/handle-error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join("./public")));
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(mainRouter);

app.listen(config.port, async () => {
  bot.start();
  bot.catch(errorHandler);
  console.log("Server started on port %d", config.port);
});
