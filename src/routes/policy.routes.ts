import { Router } from "express";
import PolicyControllers from "../controllers/Policy.controllers";

const controller = new PolicyControllers();

const router = Router();
router.post('/create' , controller.createPolicyController)
router.get('/' , controller.getAllPoliciesController)
router.get('/:pid' , controller.getPolicyByIdController)
router.patch('/update/:pid' , controller.patchPolicyController)
router.delete('/delete/:pid' , controller.deletePolicyController)

export default router;
