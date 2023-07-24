import express, { Request, Response } from "express";

import Validator from "../validator/validate.js";
import ValidateRule from "../validator/validationRules.js";
import GeneratePassword from "../controller/generateEncryptedPassword.js";

const router = express.Router();

router.post(
  "/register",
  ValidateRule.getRegisterValidationRules(),

  async (req: Request, res: Response) => {
    try {
      Validator.validate(req, res);
      return res.status(200).json(GeneratePassword.encryptedPassword(req));
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
      if (!isValid) {
        return res.status(400).json({ errors: "errors.array()" });
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

export default router;
