
import { Router } from 'express';
import { customerController } from './customer.controller';

const customerRouter = Router();

customerRouter.get('/', customerController.getCustomer);
customerRouter.get('/:customerId', customerController.getSingleCustomer);
customerRouter.put('/:id', customerController.updateCustomer);
customerRouter.delete('/:id', customerController.deleteCustomer);
customerRouter.patch('/:id/status', customerController.changeStatus);

export default customerRouter;
