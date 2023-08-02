import express from "express";
import Validator from "../validator/validate.js";
import ValidateRule from "../validator/validationRules.js";
import GeneratePassword from "../controller/generateEncryptedPassword.js";
import { Token } from "../handlers/tokenHandler.js";
const router = express.Router();
router.post("/register", ValidateRule.getRegisterValidationRules(), async (req, res) => {
    try {
        Validator.validate(req, res);
        return res.status(200).json(GeneratePassword.encryptedPassword(req));
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
router.post("/login", ValidateRule.getLoginValidationRules(), async (req, res) => {
    try {
        const isValid = Validator.validate(req, res);
        if (!isValid) {
            return res.status(401).json({ errors: "ログイン情報が無効です" });
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
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
router.post(`/verify-token`, Token.verifyToken, (req, res) => {
    console.log(typeof req);
    console.log(req);
    return res.status(201).json({ user: req.user });
});
export default router;
