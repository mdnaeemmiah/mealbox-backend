"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
// const { authenticate } = require('../middlewares/authMiddleware');
const orderRouter = (0, express_1.Router)();
orderRouter.get("/verify", order_controller_1.orderController.verifyPayment);
orderRouter
    .route("/")
    .post((0, auth_1.default)('customer'), order_controller_1.orderController.createOrder)
    .get(order_controller_1.orderController.getOrders);
exports.default = orderRouter;
