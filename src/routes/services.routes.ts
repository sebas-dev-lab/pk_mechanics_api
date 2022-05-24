import { Router } from "express";
import ServicesControllers from "../controllers/Services.controllers";

const controller = new ServicesControllers();

const router = Router();
router.post('/create' , controller.createServicesController)
router.get('/' , controller.getAllPoliciesController)
router.get('/:sid' , controller.getServicesByIdController)
router.patch('/update/:sid' , controller.patchServicesController)
router.patch('/update/policy/:sid' , controller.patchPolicyServicesController)
router.delete('/delete/:sid' , controller.deleteServicesController)

export default router;
