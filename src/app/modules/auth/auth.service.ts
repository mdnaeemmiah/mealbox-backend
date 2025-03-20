// // // import { StatusCodes } from "http-status-codes";
// // // import AppError from "../../../errors/AppError";
// // // import { createToken, verifyToken } from "./auth.utils";
// // // import config from "../../config";
// // // import { User } from "./auth.model";

// // // const refreshToken = async (token: string) => {
// // //     // checking if the given token is valid
// // //     const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  
  
// // //     const { email, iat } = decoded;
  
// // //     // checking if the user is exist
// // //     const user = await User.isUserExistsByCustomId(email);
// // //     // console.log(decoded);
  
// // //     if (!user) {
// // //       throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
// // //     }
   
// // //     // // checking if the user is blocked
// // //     // const userStatus = user?.status;
  
// // //     // if (userStatus === 'blocked') {
// // //     //   throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
// // //     // }
  
// // //     // if (
      
// // //     //   User.isJWTIssuedBeforePasswordChanged(iat as number)
// // //     // ) {
// // //     //   throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !');
// // //     // }
  
// // //     const jwtPayload = {
// // //       email: user.email,
// // //       role: user.role,
// // //     };
  
// // //     const accessToken = createToken(
// // //       jwtPayload,
// // //       config.jwt_access_secret as string,
// // //       config.jwt_access_expires_in as string,
// // //     );
  
// // //     return {
// // //       accessToken,
// // //     };
// // //   };
  

// // //   export const AuthService = {
// // //     // register,
// // //     // login,
// // //     // changePassword,
// // //     refreshToken
// // //   }










// import bcrypt from 'bcrypt'
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from '../../config'
// import { IUser} from './auth.interface'
// import { StatusCodes } from 'http-status-codes'
// import { createToken, verifyToken } from './auth.utils'
// import { User } from './auth.model';
// import AppError from '../../../errors/AppError';

// const register = async (payload: IUser) => {
//   const user = new User(payload);
//   console.log(user);
  
//   const jwtPayload = {
//     role: user.role,  
//     email: user.email,  // Assuming email is unique and used as the user identifier
//   };

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   );

//   const refreshToken = createToken(
//     jwtPayload,
//     config.jwt_refresh_secret as string,
//     config.jwt_refresh_expires_in as string,
//   );

//   return {
//     accessToken,
//     refreshToken,
//     // needsPasswordChange: user?.needsPasswordChange,
//   };
// }

// const login = async (payload:any) => {
//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(payload.email);

//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
//   }
 
//   // checking if the user is blocked

// //   const userStatus = user?.status;

// //   if (userStatus === 'blocked') {
// //     throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
// //   }

//   // checking if the password is correct

//   // if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    
//   //   throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
//   //   console.log(payload?.password);
//   //   console.log(user?.password)
//   // create token and sent to the  client

//   const jwtPayload = {
//     role: user.role,  
//     email: user.email,  // Assuming email is unique and used as the user identifier
//   };

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   );

//   const refreshToken = createToken(
//     jwtPayload,
//     config.jwt_refresh_secret as string,
//     config.jwt_refresh_expires_in as string,
//   );

//   return {
//     accessToken,
//     refreshToken,
//     // needsPasswordChange: user?.needsPasswordChange,
//   };
// };

// const changePassword = async (
//   userData: JwtPayload,
//   payload: { oldPassword: string; newPassword: string },
// ) => {
//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(userData.userId);

//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
//   }

//   // checking if the user is blocked

// //   const userStatus = user?.status;

// //   if (userStatus === 'blocked') {
// //     throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
// //   }

//   //checking if the password is correct

//   if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
//     throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

//   //hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds),
//   );

//   await User.findOneAndUpdate(
//     {
//       id: userData.userId,
//       role: userData.role,
//     },
//     {
//       password: newHashedPassword,
//       needsPasswordChange: false,
//       passwordChangedAt: new Date(),
//     },
//   );

//   return null;
// };

// const refreshToken = async (token: string) => {
//   // checking if the given token is valid
//   const decoded = verifyToken(token, config.jwt_refresh_secret as string);


//   const { email, iat } = decoded;

//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(email);
//   // console.log(decoded);

//   if (!user) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
//   }
 
// //   // checking if the user is blocked
// //   const userStatus = user?.status;

// //   if (userStatus === 'blocked') {
// //     throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
// //   }

// //   if (
// //     user.passwordChangedAt &&
// //     User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
// //   ) {
// //     throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !');
// //   }

//   const jwtPayload = {
//     email: user.email,
//     role: user.role,
//   };

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   );

//   return {
//     accessToken,
//   };
// };

// export const AuthService = {
//   register,
//   login,
//   changePassword,
//   refreshToken
// }









// // import bcrypt from "bcryptjs";
// // import User from "../user/user.model";
// // import { IUser } from "../user/user.interface";
// // import { generateToken } from "./auth.utils";


// // //Registration
// // export const registerUser = async (userData: IUser) => {
// //   const existingUser = await User.findOne({ email: userData.email });
// //   if (existingUser) throw new Error("User already exists");

// //   const newUser = await User.create(userData);
// //   return newUser.toObject();
// // };

// // //Login
// // export const loginUser = async (email: string, password: string) => {
// //   const user = await User.findOne({ email });
// //   if (!user) throw new Error("Invalid credentials");

// //   const isMatch = await bcrypt.compare(password, user.password);
// //   if (!isMatch) throw new Error("Invalid credentials");

// //   return { ...user.toObject(), token: generateToken(user._id.toString()) };
// // };













import { IUser } from '../user/user.interface'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model'
import config from '../../config'
import { TLoginUser } from './auth.interface'
import { StatusCodes } from 'http-status-codes'
import { createToken, verifyToken } from './auth.utils'
import AppError from '../../../errors/AppError';

const register = async (payload: IUser) => {
  const user = new User(payload);
  console.log(user);
  
  const jwtPayload = {
    role: user.role,  
    email: user.email,  // Assuming email is unique and used as the user identifier
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
}

const login = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload.email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
 
  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  // checking if the password is correct

  // if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    
  //   throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
  //   console.log(payload?.password);
  //   console.log(user?.password)
  // create token and sent to the  client

  const jwtPayload = {
    role: user.role,  
    email: user.email,  // Assuming email is unique and used as the user identifier
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userData.userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);


  const { email, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(email);
  // console.log(decoded);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
 
  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  register,
  login,
  changePassword,
  refreshToken
}