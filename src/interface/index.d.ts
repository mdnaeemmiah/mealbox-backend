
import { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../module/user/user.interface';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      socketAuthToken: string;
    }
  }
}
