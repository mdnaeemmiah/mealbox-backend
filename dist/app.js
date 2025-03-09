"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// express
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
// app.use(cors({origin:"https://tennis-test-deploy.vercel.app",credentials:true}));
app.use((0, cors_1.default)());
// application routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.default = app;
