import { Router } from "express";
import ownerRoutes from './owner.routes';
import carsRoutes from './car.routes';
import policyRoutes from './policy.routes';
import servicesRoutes from './services.routes';
import transactionRoutes from './transaction.routes';
import ValidateMiddlewares from "../middlewares/validateRequest.middleware";


const validation = new ValidateMiddlewares();


const router = Router();

router.use('/owners',validation.validateKeysMiddleware ,ownerRoutes);
router.use('/cars',validation.validateKeysMiddleware , carsRoutes);
router.use('/policies',validation.validateKeysMiddleware , policyRoutes);
router.use('/services',validation.validateKeysMiddleware , servicesRoutes);
router.use('/transactions',validation.validateKeysMiddleware , transactionRoutes);


export default router;
