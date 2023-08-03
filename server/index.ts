import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./src/routes/auth.js";

dotenv.config();
const app = express();
const PORT = 5050;

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(express.json());

// DB接続
try {
  await mongoose.connect(process.env.DB_URL!);
  console.log("DB接続中");
} catch (error) {
  console.log(error);
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Expless");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中");
});
