import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: '30d' });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};




// import jwt from "jsonwebtoken";

// export const generateToken = (userId: string) => {
//   return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
//     expiresIn: "7d",
//   });
// };
