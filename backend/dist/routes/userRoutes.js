"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuth_1 = __importDefault(require("../middlewares/userAuth"));
const register_1 = __importDefault(require("../controllers/users/register"));
const login_1 = __importDefault(require("../controllers/users/login"));
const logout_1 = __importDefault(require("../controllers/users/logout"));
const update_1 = __importDefault(require("../controllers/users/update"));
const userbulk_1 = __importDefault(require("../controllers/users/userbulk"));
const Route = express_1.default.Router();
Route.post('/signup', register_1.default);
Route.get('/signin', login_1.default);
Route.get('/logout', logout_1.default);
Route.put('/update', userAuth_1.default, update_1.default);
Route.get('/bulk', userAuth_1.default, userbulk_1.default);
Route.get('/auth', userAuth_1.default, (res) => {
    res.sendStatus(200);
});
exports.default = Route;
//# sourceMappingURL=userRoutes.js.map