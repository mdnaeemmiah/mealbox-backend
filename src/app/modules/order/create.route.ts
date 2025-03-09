import  { Router } from 'express';
import { orderController } from './order.controller';

const orderRouter = Router();

// Route to get all orders
orderRouter.get('/', orderController.getOrders);

// Route to get a single order by ID
orderRouter.get('/:orderId', orderController.getSingleOrder);

// Route to create a new order
orderRouter.post('/', orderController.createOrder);

// Route to update an existing order by ID
orderRouter.put('/:orderId', orderController.updateOrder);

// Route to delete an order by ID
orderRouter.delete('/:orderId', orderController.deleteOrder);

export default orderRouter;
