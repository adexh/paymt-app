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
const Users_1 = __importDefault(require("../../models/Users"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = __importDefault(require("zod"));
const userUpdateSchema = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    userName: zod_1.default.string(),
    email: zod_1.default.string(),
    password: zod_1.default.string()
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userUpdateSchema.safeParse(req.body)) {
            res.status(411).json({
                message: "Incorrect inputs!"
            });
            return;
        }
        const { firstName, lastName, email, password, username } = req.body; // input from user
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = bcryptjs_1.default.hashSync(password, salt); // created hashed Password for security
        {
            const Createduser = yield Users_1.default.updateOne({
                firstName,
                lastName,
                email,
                username,
                password: hashedPassword
            });
            if (Createduser !== undefined && Createduser !== null) {
                res.status(201)
                    .json({ message: "Updated Successfully!" });
            }
            else {
                res.status(500).json({ msg: 'Internal Server Error' });
            }
        }
    }
    catch (err) {
        console.log('Error in Update route:', err.message);
        res.status(500);
    }
});
exports.default = update;
//# sourceMappingURL=update.js.map