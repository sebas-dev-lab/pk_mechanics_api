import { Router } from "express";
import TransactionControllers from "../controllers/Transaction.controllers";

const controller = new TransactionControllers();

const router = Router();
router.post('/create' , controller.createTransactionControllers)
router.post('/' , controller.getByDataServicesControllers)
router.get('/:tid' , controller.getTransactionByIdControllers)
router.patch('/update/:tid' , controller.updateTransactionController)

export default router;
