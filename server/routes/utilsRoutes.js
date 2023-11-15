import express from "express";
import UtilsControllers from "../controllers/utilsControllers.js";
const router = express.Router();

router.get("/cep/:cep", UtilsControllers.consultaCEP);

export default router;
