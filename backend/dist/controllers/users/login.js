"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Users_1 = __importDefault(require("../../models/Users"));
const zod_1 = __importDefault(require("zod"));
const userLoginSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string()
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userLoginSchema.safeParse(req.body)) {
            res.status(411).json({
                message: "Incorrect Inputs"
            });
            return;
        }
        const username = req.headers.username;
        const password = req.headers.password;
        if (req.body === undefined) {
            res.status(400);
            res.json({ message: 'Please Fill the Data' }); // Bad Request
            return;
        }
        const UserData = yield Users_1.default.findOne({ $or: [{ email: username }, { username }] }).exec();
        if (UserData === undefined || UserData === null) {
            res.status(404).json({ message: 'User Not Found' });
            return;
        }
        if (UserData.password === null) {
            res.status(401).json({ message: 'Invalid Credentials' });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, UserData.password); // Decrypt Password (Secutity Feature)
        const token = UserData.generateAuthToken();
        if (!isMatch) {
            console.log('Login failed');
            res.status(401).json({ message: 'Invalid Credentials' });
        }
        else {
            res
                .status(200)
                .cookie('jwt', token, {
                maxAge: 900000,
                httpOnly: true,
                sameSite: 'none',
                secure: true
            })
                .json({ firstName: UserData.firstName, lastName: UserData.lastName, username: UserData.username, email: UserData.email, id: UserData._id });
        }
    }
    catch (err) {
        console.log('error: ', err);
        res.status(500);
    }
});
exports.default = login;
//# sourceMappingURL=login.js.map