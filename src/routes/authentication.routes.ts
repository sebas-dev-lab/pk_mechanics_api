import { Router } from "express";
import AuthUserControllers from "../controllers/Authuser.controllers";

const router = Router();
router.post('/signup',AuthUserControllers.createnewuser)


export default router;
