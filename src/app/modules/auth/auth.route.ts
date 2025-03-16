// import { Router } from 'express';
// import { loginUser, registerUser } from './auth.controllers';




// const authRouter = Router();

// authRouter.post('/login', loginUser)
// authRouter.post('/register', registerUser)

// export default authRouter;

import { Router } from 'express';
import { loginUser, registerUser } from './auth.controllers';

const authRouter = Router();

// Register routes
authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);

export default authRouter;