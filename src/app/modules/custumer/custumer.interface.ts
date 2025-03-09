
import { Model } from "mongoose";
import { CUSTOMER_ROLE } from "./custumer.constant";


export interface ICustomer {
    name: string;
    email: string;
    password: string;
    role: 'mealProvider' | 'customer' | 'admin';
    phone?: string;
    address?: string;
    city?: string;
    needsPasswordChange: boolean;
    passwordChangedAt?: Date;
    status: 'in-progress' | 'blocked';
    isBlocked: boolean;           
  }
  

  
export interface CustomerModel extends Model<ICustomer> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(email: string): Promise<ICustomer>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}


  export type ICustomerRole = keyof typeof CUSTOMER_ROLE;

