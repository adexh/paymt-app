"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuth_1 = __importDefault(require("../middlewares/userAuth"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const Route = express_1.default.Router();
Route.post('/user', userRoutes_1.default);
Route.get('/auth', userAuth_1.default, (res) => {
    res.sendStatus(200);
});
exports.default = Route;
//# sourceMappingURL=index.js.map