require("dotenv").config();

import "src/db";

import env from "./env";
import express, { type Request } from "express";
import path from "path";
// import { zodMiddleware } from "./middlewares/zod.middleware";
import userRouter from "./routes/user";
import { getUser } from "./controllers/user";
import domainRouter from "./routes/domain";
import authRouter from "./routes/auth";
import cors from "cors";
import corsOptions from "./config/corsOptions";
import cookieParser from "cookie-parser";
import statsRouter from "./routes/stats";

const app = express();
const PORT = env.PORT || 5001;
console.log(env.NODE_ENV);

// CORS
app.use(cors(corsOptions));
// Server Config
app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));

//Server initial content - the time no
app.get("/", (req, res) => {
  res.status(200).send({ message: "We're Live" });
});

//  Endpoints & Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/domains", domainRouter);
app.use("/api/stats", statsRouter);
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
