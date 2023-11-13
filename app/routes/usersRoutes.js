import express from "express";
import UsersControllers from "../controllers/usersControllers.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get("/users", UsersControllers.getAllUsers);
router.post("/users", UsersControllers.createUser);
router.post(
  "/users/avatar",
  upload.single("avatar"),
  UsersControllers.uploadAvatar
);
router.delete("/users/:id", UsersControllers.deleteUser);
router.put("/users/:id", UsersControllers.updateUser);

export default router;
