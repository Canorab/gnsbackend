require("dotenv").config();

import "src/db";

import env from "./env";
import express, { type Request } from "express";
import path from "path";
// import { zodMiddleware } from "./middlewares/zod.middleware";
import userRouter from "./routes/user";
import { getUser } from "./controllers/user";

const app = express();
const PORT = env.PORT || 5001;
console.log(env.NODE_ENV);

// Server Config
app.use(express.json());

app.use(express.static("public"));

//Server initial content - the time no
app.get("/", (req, res) => {
  res.status(200).send({ message: "We're Live" });
});

//  Endpoints & Routes
// app.use("/users", userRouter);
app.use("/api/users", userRouter);
// app.get("/users/:id", getUser);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Catch all Errors
// app.use(zodMiddleware);

// Setup server
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
