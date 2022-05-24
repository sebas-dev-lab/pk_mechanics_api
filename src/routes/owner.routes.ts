import { Router } from "express";
import OwnerController from "../controllers/Owner.controllers";

const controller = new OwnerController();

const router = Router();
router.post('/register' , controller.createOwnerController)
router.get('/' , controller.getAllOwnerController)
router.get('/byowid/:owid' , controller.getByOidOwnerController)
router.get('/bydata' , controller.getByDataOwnerController)
router.patch('/update/:owid' , controller.patchAllOwnerController)
router.delete('/delete/:owid' , controller.deleteOwnerController)

export default router;
