"use strict";
// import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcryptjs";
// import config from "../../config";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.User = void 0;
// const UserSchema = new Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true },
//     password: { type: String, required: true, minlength: 6},
//     method:{type:String, enum: ["credentials", "github", "google" ], default:"credentials"},
//     role: {
//       type: String,
//       enum: ["customer","meal-provider", "admin"],
//       default: "customer",
//     },
//   },
//   { timestamps: true }
// );
// UserSchema.pre('save', async function () {
//     this.password = await bcrypt.hash(
//       this.password,
//       Number(config.bcrypt_salt_rounds),
//     );
//   });
// export const User = mongoose.model("User", UserSchema);
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../config"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    method: { type: String, enum: ["credentials", "github", "google"], default: "credentials" },
    role: {
        type: String,
        enum: ["customer", "meal-provider", "admin"],
        default: "customer",
    },
    phone: { type: String, required: false }, // Optional phone field
    address: { type: String, required: false }, // Optional address field
    city: { type: String, required: false }, // Optional city field
}, { timestamps: true });
// Pre-save middleware to hash password before saving the user document
UserSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            this.password = yield bcryptjs_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        }
    });
});
exports.User = mongoose_1.default.model("User", UserSchema);
