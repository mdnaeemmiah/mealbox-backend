
// import { Model } from "mongoose";
// import { CUSTOMER_ROLE } from "./custumer.constant";


// import { Document } from "mongoose";

// export interface IUser extends Document {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   role: string;
//   method?: "credentials" | "github" | "google" | undefined; // Allow undefined
//   needsPasswordChange: boolean;
//   passwordChangedAt?: Date;
//   status: string;
//   isBlocked: boolean;
// }

// export interface ICustomer extends IUser {
//   phone?: string;
//   address?: string;
//   city?: string;
//   method?: "credentials" | "github" | "google"; // Explicitly define method
// }

  

  
// export interface CustomerModel extends Model<ICustomer> {
//   //instance methods for checking if the user exist
//   isUserExistsByCustomId(email: string): Promise<ICustomer>;
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


//   export type ICustomerRole = keyof typeof CUSTOMER_ROLE;

