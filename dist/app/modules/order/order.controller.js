"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const order_service_1 = require("./order.service");
const http_status_1 = __importDefault(require("http-status"));
// const createOrder = catchAsync(async (req, res) => {
//   const user = req.user;
//   console.log(user)
//   console.log(req.body);
//   const order = await orderService.createOrder(user, req.body, req.ip!);
//    console.log(order,'naeem')
//   sendResponse(res, {
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: "Order placed successfully",
//     data: order,
//   });
// });
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user; // Type assertion
    // const { products } = req.body;
    // console.log(req.id!)
    // console.log({products})
    if (!user || !req.body) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid request data");
    }
    const order = yield order_service_1.orderService.createOrder(user, req.body, req.ip);
    //  console.log("req.ip!", req.ip!);
    console.log(order);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order placed successfully naeem",
        data: order,
    });
}));
const getOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderService.getOrders();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order retrieved successfully",
        data: order,
    });
}));
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderService.verifyPayment(req.query.order_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order verified successfully",
        data: order,
    });
}));
exports.orderController = { createOrder, verifyPayment, getOrders };
