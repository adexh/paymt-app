"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db = process.env.DB_NAME;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const host = process.env.DB_HOST;
const connect = () => {
    mongoose_1.default.connect(`mongodb://${user}:${pass}@${host}/${db}`).then(() => {
        console.log('MongoDb Connected');
    }).catch(err => {
        console.log(err);
    });
};
exports.default = connect;
//# sourceMappingURL=db.js.map