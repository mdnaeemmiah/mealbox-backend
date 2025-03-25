"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("./message.controller");
const messageRoute = express_1.default.Router();
// Create a new message
messageRoute.post("/create", message_controller_1.messageController.createMessage);
// Get all messages
messageRoute.get("/", message_controller_1.messageController.getAllMessages);
exports.default = messageRoute;
