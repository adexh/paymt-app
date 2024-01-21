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
const userbulk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter || '';
        const UserData = yield Users_1.default.find({
            $or: [{
                    firstName: {
                        $regex: filter
                    }
                },
                {
                    username: {
                        $regex: filter
                    }
                }]
        }).exec();
        if (UserData === undefined || UserData === null) {
            res.status(404).json({ message: 'User Not Found' });
            return;
        }
        res
            .status(200)
            .json({
            user: UserData.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    }
    catch (err) {
        console.log('error: ', err);
        res.status(500);
    }
});
exports.default = userbulk;
//# sourceMappingURL=userbulk.js.map