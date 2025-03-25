"use strict";
// import mongoose, { Schema, Document } from "mongoose";
// import bcrypt from "bcryptjs";
// import { IUser } from "./user.interface";
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
// export interface IUserModel extends IUser, Document {
//   _id: mongoose.Types.ObjectId;
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }
// const UserSchema = new Schema<IUserModel>(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String, unique: true, sparse: true },
//     image: { type: String, sparse: true, default: "https://static.vecteezy.com/system/resources/previews/002/318/271/large_2x/user-profile-icon-free-vector.jpg" },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["customer", "mealProvider"], default: "customer" },
//   },
//   { timestamps: true }
// );
// // Hash password before saving
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
// // Compare passwords
// UserSchema.methods.comparePassword = async function (
//   candidatePassword: string
// ) {
//   return bcrypt.compare(candidatePassword, this.password);
// };
// const User = mongoose.model<IUserModel>("User", UserSchema);
// export default User;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_2 = require("mongoose");
const user_contant_1 = require("./user.contant");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
            },
            message: '{VALUE} is not a valid email',
        },
        immutable: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    passwordChangedAt: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['customer', 'mealProvider'], // Only 'user' or 'admin' roles are allowed
        default: 'customer', // Default to 'user'
    },
    phone: { type: String, default: "N/A" },
    address: { type: String, default: "N/A" },
    city: { type: String, default: "N/A" },
    status: {
        type: String,
        enum: user_contant_1.UserStatus,
        default: 'in-progress',
    },
    isBlocked: { type: Boolean, default: false },
}, { timestamps: true });
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this; // doc
        // hashing password and save into DB
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// set '' after saving password
UserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
UserSchema.statics.isUserExistsByCustomId = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email }).select('+password');
    });
};
UserSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (passwordChangedTimestamp, jwtIssuedTimestamp) {
    const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};
exports.User = (0, mongoose_2.model)('User', UserSchema);
