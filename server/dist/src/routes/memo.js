import express from "express";
import { Token } from "../handlers/tokenHandler.js";
import { create } from "../controller/memo.js";
const router = express.Router();
router.post("/memo", Token.verifyToken, create);
export default router;
