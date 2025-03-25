"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = void 0;
const zod_1 = require("zod");
exports.messageSchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name cannot exceed 50 characters")
        .trim(),
    email: zod_1.z.string()
        .email("Please provide a valid email address")
        .toLowerCase()
        .trim(),
    subject: zod_1.z.string()
        .min(5, "Subject must be at least 5 characters long")
        .max(100, "Subject cannot exceed 100 characters")
        .trim(),
    message: zod_1.z.string()
        .min(10, "Message must be at least 10 characters long")
        .max(500, "Message cannot exceed 500 characters")
        .trim(),
});
