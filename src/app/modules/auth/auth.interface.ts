// import { Document, Model } from "mongoose";
// import { USER_ROLE } from "./auth.constant";

// // Define the interface for the user
// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   method: "credentials" | "github" | "google";
//   role: "customer" | "meal-provider" | "admin";
//   phone?: string;
//   address?: string;
//   city?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }


// export interface UserModel extends Model<IUser> {
//   //instance methods for checking if the user exist
//   isUserExistsByCustomId(email: string): Promise<IUser>;
//   //instance methods for checking if passwords are matched
//   isPasswordMatched(
//     plainTextPassword: string,
//     hashedPassword: string,
//   ): Promise<boolean>;
//   isJWTIssuedBeforePasswordChanged(
//     passwordChangedTimestamp: Date,
//     jwtIssuedTimestamp: number,
//   ): boolean;
// }


// export type IUserRole = keyof typeof USER_ROLE;



export type TLoginUser = {
    email: string;
    password: string;
  };