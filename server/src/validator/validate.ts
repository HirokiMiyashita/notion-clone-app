import { ValidationChain, body, validationResult } from "express-validator";
import User, { UserDocument } from "../models/user.js";
import { Request, Response, response } from "express";
import GeneratePassword from "../controller/generateEncryptedPassword.js";
import crypto from "crypto-js";
import jwt from "jsonwebtoken";

class Validator {
  static validator(
    value: string,
    lenght: number,
    errorMessage: string
  ): ValidationChain {
    return body(value).isLength({ min: lenght }).withMessage(errorMessage);
  }

  static isDuplicateUsers(value: string): ValidationChain {
    return body(value).custom(async (value: string) => {
      const userDocument = await User.findByUsername(value);
      if (userDocument) {
        return Promise.reject("このユーザーは既に使用されています");
      }
    });
  }

  static userAlreadyExists(value: string): ValidationChain {
    return body(value).custom(async (value: string, { req }) => {
      const userDocument = await User.findByUsername(value);
      if (!userDocument) {
        return Promise.reject("ユーザー名が無効です");
      }
    });
  }

  static async userAlreadyExistsPass(
    req: Request
  ): Promise<{ token: string; user: UserDocument } | string> {
    const userDocument = await User.findByUsername(req.body.username);
    console.debug(userDocument);
    if (!userDocument) {
      return "ユーザー名が無効です";
    }

    const descryptedPassword = crypto.AES.decrypt(
      userDocument.password,
      process.env.SECRET_KEY!
    );
    const generatedPassword = descryptedPassword.toString(crypto.enc.Utf8);

    if (generatedPassword !== req.body.password) {
      return "パスワードが無効です";
    } else {
      const token = jwt.sign(
        { id: userDocument._id },
        process.env.TOKEN_SECRET_KEY!,
        {
          expiresIn: "24h",
        }
      );
      return { token, user: userDocument };
    }
  }

  static validate(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.debug(errors.array());
      return false;
    }
    return true;
  }
}

export default Validator;
