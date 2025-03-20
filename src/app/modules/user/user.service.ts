// import User from "./user.model";

// //get user
// export const getAllUsers = async () => {
//   return await User.find({}, "-password");
// };

// //delete user
// export const getSingleUser = async (userId: string) => {
//   return await User.findById(userId, "-password");
// };

// //Update user
// export const updateUserProfile = async (userId: string, data: any) => {
//   try {
//     const user = await User.findByIdAndUpdate(userId, data, { new: true });
//     if (!user) throw new Error("User not found");
//     return user;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateUserRole = async (userId: string, role: string) => {
//   return await User.findByIdAndUpdate(userId, { role }, { new: true });
// };

// //delete user
// export const deleteUser = async (userId: string) => {
//   return await User.findByIdAndDelete(userId);
// };






import { IUser } from './user.interface'
import { User } from './user.model';



const getUser = async () => {
  const result = await User.find()
  return result
}

const getSingleUser = async (id: string) => {
  //   const result = await User.findOne({name:"habi jabi"})
  const result = await User.findById(id)
  return result
}

const updateUser = async (id: string, data: IUser) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
  })
  return result
}


const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id)
  return result
}


const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const userService = {
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  changeStatus,
}

