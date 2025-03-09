import { Router } from 'express';
import authRouter from '../app/modules/auth/auth.route';
import customerRouter from '../app/modules/custumer/custumer.route';
import mealProviderRouter from '../app/modules/mealProvider/mealProvider.route';
import orderRouter from '../app/modules/order/create.route';


const router = Router();

const moduleRoutes = [
    {
    path: '/auth',
    route: authRouter,
    },
    {
      path: '/customer',  
      route: customerRouter,
    },
    {
      path: '/mealProvider',
      route: mealProviderRouter,
    },
    {
      path: '/order',
      route: orderRouter,
    },
    // {
    //   path: '/admin',
    //   route: AdminRoutes,
    // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;