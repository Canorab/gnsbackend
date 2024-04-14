import env from "@/env";
import mongoose from "mongoose";
mongoose
  .connect(env.DATABASE_URI)
  .then(() => {
    console.log("Connected to MongoDB !");
  })
  .catch((err) => {
    console.log("Could not connect:", err.message);
  });
