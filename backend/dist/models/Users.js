"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    methods: {
        generateAuthToken() {
            try {
                const token = jsonwebtoken_1.default.sign({ _id: this._id }, process.env.SECRET);
                return token;
            }
            catch (err) {
                console.log(err);
            }
        }
    }
});
exports.default = mongoose_1.default.model('users', userSchema);
//# sourceMappingURL=Users.js.map