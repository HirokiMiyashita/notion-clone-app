var _a;
import jwt from "jsonwebtoken";
import User from "../models/user.js";
export class Token {
}
_a = Token;
Token.tokenDecode = (req) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        const bearer = bearerHeader.split(" ")[1];
        // ヘッダーが存在する場合の処理
        try {
            const decodedToken = jwt.verify(bearer, process.env.TOKEN_SECRET_KEY);
            return decodedToken;
        }
        catch (error) {
            return false;
        }
    }
    else {
        // ヘッダーが存在しない場合の処理
        return false;
    }
};
//JWT認証を検証するためのミドルウェア
Token.verifyToken = async (req, res, next) => {
    const tokenDecoded = Token.tokenDecode(req);
    if (tokenDecoded) {
        const user = await User.findById(tokenDecoded.id);
        console.log("user:");
        console.log(user);
        if (!user) {
            return res.status(401).json("権限がありません");
        }
        req.user = user;
        next();
    }
    else {
        return res.status(401).json("権限がありません");
    }
};
