import express from "express";
import IfoodControllers from "../controllers/ifoodControllers.js";
const router = express.Router();

router.post("/ifood/login", IfoodControllers.login);
router.post("/ifood/loginAxios", IfoodControllers.loginAxios);
router.get("/ifood/products", IfoodControllers.getAllProducts);

export default router;
