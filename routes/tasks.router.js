import express from "express";
import { imageFileName, multerUpload } from "../helpers/functions.js";
import * as controller from "../controllers/tasks.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const uploadImage = multerUpload("tasks", null, { fileSize: 5 * 1024 * 1024 });

router.post("/image", auth, uploadImage.single("image"), imageFileName); //path for image only, returns file name to front-end

router.post("/", controller.addTasks);  

router.get("/", auth, controller.listTasks);

router.get("/:id", auth, controller.getTaskById);

router.put("/:id", auth, controller.updateTask);

router.delete("/:id", auth, controller.deleteTask);

router.post("/:id/image", auth, controller.updateImage);

export default router;
