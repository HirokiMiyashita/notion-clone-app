import { Request } from "express";
import crypto from "crypto-js";
import User, { UserDocument } from "../models/user.js";
import jwt from "jsonwebtoken";
import { body } from "express-validator";

class GeneratePassword {
  static async encryptedPassword(req: Request) {
    let password: string = req.body.password;
    // パスワードの暗号化
    req.body.password = crypto.AES.encrypt(password, process.env.SECRET_KEY!);
    // ユーザーの新規作成
    const user = await User.create(req.body);
    // JWTの発行
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY!, {
      expiresIn: "24h",
    });
    return { user, token };
  }

  //   static async DescryptPassword(req: Request) {
  //     return body(req.body.username).custom(async (value: string, { req }) => {
  //       const userDocument = await User.findByUsername(req.body.username);

  //       const descryptedPassword = crypto.AES.decrypt(
  //         userDocument!.password,
  //         process.env.SECRET_KEY!
  //       );
  //       const generatedPassword = descryptedPassword.toString(crypto.enc.Utf8);
  //       if (generatedPassword !== value) {
  //         return Promise.reject("パスワードが無効です");
  //       } else {
  //         const token = jwt.sign(
  //           { id: userDocument!._id },
  //           process.env.TOKEN_SECRET_KEY!,
  //           {
  //             expiresIn: "24h",
  //           }
  //         );
  //         return { token, user: userDocument };
  //       }
  //     });

  //     // return { generatedPassword, token };
  //   }
}

export default GeneratePassword;
