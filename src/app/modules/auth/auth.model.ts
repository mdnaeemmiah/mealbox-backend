// import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcryptjs";
// import config from "../../config";



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

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import config from "../../config";
import { IUser } from "./auth.interface";

const UserSchema = new Schema<IUser>(
  {
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
  },
  { timestamps: true }
);

// Pre-save middleware to hash password before saving the user document
UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
  }
});
 
export const User = mongoose.model<IUser>("User", UserSchema);