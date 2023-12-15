"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: You need to log in' });
    }
    jsonwebtoken_1.default.verify(token, 'your-secret-key', (err, decoded) => {
        if (err)
            return res.status(401).json({ message: 'Unauthorized: You need to log in' });
        next();
    });
};
exports.authenticateToken = authenticateToken;
