//クライアントから渡されたJWTが正常か検証
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export class Token {
  static tokenDecode = (req: Request) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ")[1];
      // ヘッダーが存在する場合の処理
      try {
        const decodedToken = jwt.verify(bearer, process.env.TOKEN_SECRET_KEY!);

        return decodedToken;
      } catch (error) {
        return false;
      }
    } else {
      // ヘッダーが存在しない場合の処理
      return false;
    }
  };

  //JWT認証を検証するためのミドルウェア

  static verifyToken = async (req: any, res: Response, next: NextFunction) => {
    const tokenDecoded: any = Token.tokenDecode(req);
    if (tokenDecoded) {
      const user: any = await User.findById(tokenDecoded.id);
      if (!user) {
        return res.status(401).json("権限がありません");
      }
      req.user = user;
      next();
    } else {
      return res.status(401).json("権限がありません");
    }
  };
}
