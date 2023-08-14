import express, { Request, Response } from "express";

import Validator from "../validator/validate.js";
import ValidateRule from "../validator/validationRules.js";
import GeneratePassword from "../controller/generateEncryptedPassword.js";
import { Token } from "../handlers/tokenHandler.js";
import {
  create,
  deleteMemo,
  getMemoAll,
  getMemoOne,
  update,
} from "../controller/memo.js";

const router = express.Router();

router.post(
  "/register",
  ValidateRule.getRegisterValidationRules(),

  async (req: Request, res: Response) => {
    try {
      const isValid = Validator.validate(req, res);

      if (isValid.length != 0) {
        return res.status(401).json({ errors: isValid });
      }
      const test = await GeneratePassword.encryptedPassword(req);

      return res.status(200).json(test);
    } catch (error: unknown) {
      return res.status(500).json(error);
    }
  }
);

router.post(
  "/login",
  ValidateRule.getLoginValidationRules(),

  async (req: Request, res: Response) => {
    try {
      const isValid = Validator.validate(req, res);
      if (isValid.length != 0) {
        return res.status(401).json({ errors: isValid });
      }
      // 認証が成功した場合、バリデーションルールから返ってきた結果を取得
      const validationRes = await Validator.userAlreadyExistsPass(req);

      // バリデーションが失敗した場合の処理
      if (typeof validationRes === "string") {
        return res.status(400).json({ error: validationRes });
      }

      // 認証が成功した場合の処理をここに記述する
      return res.status(200).json({
        message: "OK",
        token: validationRes.token,
        user: validationRes.user,
      });
    } catch (error: unknown) {
      return res.status(500).json(error);
    }
  }
);

router.post(`/verify-token`, Token.verifyToken, (req: any, res: Response) => {
  return res.status(201).json({ user: req.user });
});

router.post(`/memo`, Token.verifyToken, async (req: any, res: Response) => {
  try {
    console.log(req.user);
    const memo = await create(req);
    res.status(201).json(memo);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get(
  `/getMemoAll`,
  Token.verifyToken,
  async (req: any, res: Response) => {
    try {
      console.log(req.user);
      const memo = await getMemoAll(req);
      res.status(201).json(memo);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

router.get(
  `/getMemoOne/:memoId`,
  Token.verifyToken,
  async (req: any, res: Response) => {
    try {
      console.log(req.user);
      const memo = await getMemoOne(req);
      if (!memo) return res.status(401).json("指定のメモが存在しません");
      res.status(201).json(memo);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

router.put(
  `/update/:memoId`,
  Token.verifyToken,
  async (req: any, res: Response) => {
    try {
      console.log(req.user);
      const memo = await update(req);
      if (!memo) return res.status(401).json("指定のメモが存在しません");
      res.status(201).json(memo);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

router.put(
  `/delete/:memoId`,
  Token.verifyToken,
  async (req: any, res: Response) => {
    try {
      console.log(req.user);
      const memo = await deleteMemo(req);
      res.status(201).json(memo);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

export default router;
