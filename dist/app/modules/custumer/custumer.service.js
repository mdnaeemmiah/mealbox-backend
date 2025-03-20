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
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerService = void 0;
const custumer_model_1 = require("./custumer.model");
exports.customerService = {
    getCustomer() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield custumer_model_1.Customer.find();
        });
    },
    getSingleCustomer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield custumer_model_1.Customer.findById(customerId);
        });
    },
    updateCustomer(customerId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield custumer_model_1.Customer.findByIdAndUpdate(customerId, updateData, { new: true });
        });
    },
    deleteCustomer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield custumer_model_1.Customer.findByIdAndDelete(customerId);
        });
    },
    changeStatus(customerId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield custumer_model_1.Customer.findByIdAndUpdate(customerId, { status }, { new: true });
        });
    },
};
