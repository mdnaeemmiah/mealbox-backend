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
exports.customerController = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const custumer_service_1 = require("./custumer.service");
const custumer_model_1 = require("./custumer.model");
const getCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield custumer_service_1.customerService.getCustomer();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Customers retrieved successfully',
        data: result,
    });
}));
const getSingleCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.params.customerId;
    const result = yield custumer_service_1.customerService.getSingleCustomer(customerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Customer retrieved successfully',
        data: result,
    });
}));
const updateCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    const result = yield custumer_service_1.customerService.updateCustomer(id, body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Customer updated successfully',
        data: result,
    });
}));
const deleteCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid customer ID');
    }
    const deletedCustomer = yield custumer_model_1.Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Customer not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Customer deleted successfully',
        data: deletedCustomer,
    });
}));
const changeStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid customer ID');
    }
    const updatedCustomer = yield custumer_model_1.Customer.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedCustomer) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Customer not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Customer status updated successfully',
        data: updatedCustomer,
    });
}));
exports.customerController = {
    getCustomer,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
    changeStatus,
};
