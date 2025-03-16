import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../../middlewares/auth";


// const { authenticate } = require('../middlewares/authMiddleware');


const orderRouter = Router();

orderRouter.get("/verify",  orderController.verifyPayment);
 
orderRouter
  .route("/")
  .post(auth('customer'), orderController.createOrder)
  .get( orderController.getOrders);

export default orderRouter;
