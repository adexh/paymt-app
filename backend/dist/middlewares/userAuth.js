"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.SECRET;
const auth = (req, res, next) => {
    if (req.cookies.jwt === undefined) {
        res.sendStatus(401);
        return;
    }
    const token = req.cookies.jwt;
    jsonwebtoken_1.default.verify(token, SECRET, (err, decodedUser) => {
        if (err !== undefined && err !== null) {
            console.log("err : ", err, typeof err, JSON.stringify(err));
            res.sendStatus(403);
            return;
        }
        if (decodedUser !== undefined) {
            req.user = decodedUser;
            next();
        }
    });
};
exports.default = auth;
//# sourceMappingURL=userAuth.js.map