import { body, validationResult } from "express-validator";
import User from "../models/user.js";
import crypto from "crypto-js";
import jwt from "jsonwebtoken";
class Validator {
    static validator(value, lenght, errorMessage) {
        return body(value).isLength({ min: lenght }).withMessage(errorMessage);
    }
    static isDuplicateUsers(value) {
        return body(value).custom(async (value) => {
            const userDocument = await User.findByUsername(value);
            if (userDocument) {
                return Promise.reject("このユーザーは既に使用されています");
            }
        });
    }
    static userAlreadyExists(value) {
        return body(value).custom(async (value, { req }) => {
            const userDocument = await User.findByUsername(value);
            if (!userDocument) {
                return Promise.reject("ユーザー名が無効です");
            }
        });
    }
    static async userAlreadyExistsPass(req) {
        const userDocument = await User.findByUsername(req.body.username);
        console.debug(userDocument);
        if (!userDocument) {
            return "ユーザー名が無効です";
        }
        const descryptedPassword = crypto.AES.decrypt(userDocument.password, process.env.SECRET_KEY);
        const generatedPassword = descryptedPassword.toString(crypto.enc.Utf8);
        if (generatedPassword !== req.body.password) {
            return "パスワードが無効です";
        }
        else {
            const token = jwt.sign({ id: userDocument._id }, process.env.TOKEN_SECRET_KEY, {
                expiresIn: "24h",
            });
            return { token, user: userDocument };
        }
    }
    static validate(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.debug(errors.array());
            return false;
        }
        return true;
    }
}
export default Validator;
