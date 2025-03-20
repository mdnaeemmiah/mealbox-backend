// import { NextFunction, Request, Response } from 'express';
// import httpStatus from 'http-status';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import AppError from '../errors/AppError';
// import config from '../app/config';
// import catchAsync from '../utils/catchAsync';
// import { ICustomerRole } from '../app/modules/custumer/custumer.interface';
// import { Customer } from '../app/modules/custumer/custumer.model';

// const auth = (...requiredRoles: ICustomerRole[]) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization;

//     // checking if the token is missing
//     if (!token) {
//       throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
//     }

//     // checking if the given token is valid
//     const decoded = jwt.verify(
//       token,
//       config.jwt_access_secret as string
//     ) as JwtPayload;

//     const { role, email, iat } = decoded;

//     // checking if the user is exist
//     const user = await Customer.findOne({ email });

//     if (!user) {
//       throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
//     }

//     if (requiredRoles && !requiredRoles.includes(role)) {
//       throw new AppError(
//         httpStatus.UNAUTHORIZED,
//         "You are not authorized  hi!"
//       );
//     }

//     req.user = user;
//     next();
//   });
// };

// export default auth;










// import { NextFunction, Request, RequestHandler, Response } from 'express';
// import httpStatus from 'http-status';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import AppError from '../errors/AppError';
// import config from '../app/config';
// import catchAsync from '../utils/catchAsync';

// import { ICustomerRole } from '../app/modules/custumer/custumer.interface';
// import { User } from '../app/modules/auth/auth.model';

// const auth = (...requiredRoles: ICustomerRole[]): RequestHandler => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization?.split(" ")[1]; // Get token after "Bearer"
//     console.log(token)
//     // Checking if the token is missing
//     if (!token) {
//       throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
//     }

//     try {
//       // Checking if the given token is valid
//       const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
//       const { role, email } = decoded;

//       console.log("Decoded JWT:", decoded); // Log the decoded JWT payload

//       // Check if user exists in the database
//       const user = await User.findOne({ email }); // Ensure you are using the correct model

//       if (!user) {
//         throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
//       }

//       if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
//         throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized to access this resource.");
//       }

//       req.user = user; // Attach user to the request object
//       next();
//     } catch (error) {
//       console.error("JWT verification error:", error);
//       throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token");
//     }
//   });
// };

// export default auth;





// import { NextFunction, Request, RequestHandler, Response } from "express";
// import httpStatus from "http-status";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import AppError from "../errors/AppError";
// import config from "../app/config";
// import catchAsync from "../utils/catchAsync";

// import { ICustomerRole } from "../app/modules/custumer/custumer.interface";
// import { User } from "../app/modules/auth/auth.model";
// import { IUserRole } from "../app/modules/auth/auth.interface";


// const auth = (...requiredRoles: IUserRole[]) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization;

//     // checking if the token is missing
//     if (!token) {
//       throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
//     }

//     // checking if the given token is valid
//     const decoded = jwt.verify(
//       token,
//       config.jwt_access_secret as string
//     ) as JwtPayload;

//     const { role, email, iat } = decoded;

//     // checking if the user is exist
//     const user = await User.findOne({ email });

//     if (!user) {
//       throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
//     }

//     if (requiredRoles && !requiredRoles.includes(role)) {
//       throw new AppError(
//         httpStatus.UNAUTHORIZED,
//         "You are not authorized  hi!"
//       );
//     }

//     req.user = user;
//     next();
//   });
// };

// export default auth;





// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import config from "../app/config";

// // interface AuthRequest extends Request {
// //   user?: any;
// // }

// export const auth = (
//   req:any,
//   res: Response,
//   next: NextFunction
// ): void => {
//   let token = req.headers.authorization;
//   if (!token) {
//     res.status(401).json({ message: "Unauthorized" });
//     return;
//   }

//   try {
//     const decoded = jwt.verify(
//       token.split(" ")[1],
//       config.jwt_access_secret as string
//     );
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid Token" });
//     return;
//   }
// };









import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { IUserRole } from '../app/modules/user/user.interface';
import config from '../app/config';
import { User } from '../app/modules/user/user.model';

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email, iat } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized  hi!"
      );
    }

    req.user = user;
    next();
  });
};

export default auth;
