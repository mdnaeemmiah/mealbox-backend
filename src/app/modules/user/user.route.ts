// import express from "express";
// import * as userController from "./user.controller";


// const router = express.Router();

// router.get("/",  userController.getUsers);
// router.get("/:id",userController.singleUser);
// // router.put("/profile/:userId",userController.updateProfile);
// router.put("/:id",  userController.updateRole);
// router.delete("/:id",  userController.removeUser);

// export const userRoutes = router;




import { Router } from 'express'
import { userController } from './user.controller'
import { UserValidation } from './user.validation'
import validateRequest from '../../../middlewares/validateRequest'




const userRouter = Router()

userRouter.get('/:userId', userController.getSingleUser)
userRouter.patch('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)
userRouter.get('/',userController.getUser)
userRouter.patch(
    '/change-status/:id',
    // auth( USER_ROLE.admin),
    validateRequest(UserValidation.changeStatusValidationSchema),
    userController.changeStatus,
  );

export default userRouter