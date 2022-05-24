import { Router } from "express";
import CarControllers from "../controllers/Car.controllers";

const controller = new  CarControllers();

const router = Router();
router.post('/register/:owid' , controller.createCarControllers)
router.get('/owner/:owid' , controller.getOwenerCarsControllers)
router.get('/owner/car/:owid' , controller.getOwenerCarByCidControllers)
router.get('/' , controller.getAllCarsControllers)
router.patch('/owner/car/:owid' , controller.updateCarsControllers)
router.delete('/owner/car/:owid' , controller.deleteCarsControllers)


export default router;
