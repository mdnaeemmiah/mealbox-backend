// import mongoose, { Schema, Document } from "mongoose";
// import bcrypt from "bcryptjs";
// import { IUser } from "./user.interface";

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





import mongoose, { Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { model } from 'mongoose';
import {  UserStatus } from './user.contant';

const UserSchema = new Schema<IUser>(
  {
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
        validator: function (value: string) {
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
      enum: UserStatus,
      default: 'in-progress',
    },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);


UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

UserSchema.statics.isUserExistsByCustomId = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};


export const User = model<IUser,UserModel>('User', UserSchema);
