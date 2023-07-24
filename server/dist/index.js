import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./src/routes/auth.js";
dotenv.config();
const app = express();
const PORT = 5050;
app.use(express.json());
// DB接続
try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB接続中");
}
catch (error) {
    console.log(error);
}
app.get("/", (req, res) => {
    res.send("Hello Expless");
});
app.use("/api", router);
app.listen(PORT, () => {
    console.log("ローカルサーバー起動中");
});
