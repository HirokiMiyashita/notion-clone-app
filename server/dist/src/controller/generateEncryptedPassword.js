import crypto from "crypto-js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
class GeneratePassword {
    static async encryptedPassword(req) {
        let password = req.body.password;
        // パスワードの暗号化
        req.body.password = crypto.AES.encrypt(password, process.env.SECRET_KEY);
        // ユーザーの新規作成
        const user = await User.create(req.body);
        // JWTの発行
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "24h",
        });
        return { user, token };
    }
}
export default GeneratePassword;
