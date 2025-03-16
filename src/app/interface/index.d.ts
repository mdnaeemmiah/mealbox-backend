// import { IUser } from "../modules/auth/auth.interface";
import { ICustomer } from "../modules/custumer/custumer.interface";
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | IUser | ICustomer;
      socketAuthToken: string;
    }
  }
}
