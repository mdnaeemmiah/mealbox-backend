// import { Router } from 'express';
// import { loginUser, registerUser } from './auth.controllers';



// const authRouter = Router();
// authRouter.post('/login', loginUser)
// authRouter.post('/register', registerUser)

// export default authRouter;



// import { Router } from 'express';
// import { AuthControllers } from './auth.controllers';

// const authRouter = Router();

// // Register routes
// authRouter.post('/login', AuthControllers.login);
// authRouter.post('/register', AuthControllers.register);
// authRouter.post( '/refresh-token',AuthControllers.refreshToken);

// export default authRouter;







// import express from "express";
// import { login, register } from "./auth.controllers";


// const authRouter = express.Router();

// authRouter.post("/register", register);
// authRouter.post("/login", login);

// export const authRoutes = authRouter;








import { Router } from "express";
import { UserValidation } from "../user/user.validation";
import { AuthControllers } from "./auth.controllers";
import { AuthValidation } from "./auth.validation";
import validateRequest from "../../../middlewares/validateRequest";


const authRouter = Router();

authRouter.post('/register', validateRequest(UserValidation.UserValidationSchema), AuthControllers.register);
authRouter.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.login);
authRouter.post(
    '/change-password',
    validateRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword,
  );
authRouter.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
  );

export default authRouter;