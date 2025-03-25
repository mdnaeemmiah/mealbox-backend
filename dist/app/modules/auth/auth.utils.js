"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (jwtPayload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(jwtPayload, secret, { expiresIn: '30d' });
};
exports.createToken = createToken;
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
// import jwt from "jsonwebtoken";
// export const generateToken = (userId: string) => {
//   return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
//     expiresIn: "7d",
//   });
// };
