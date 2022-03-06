import { Router } from "express";

import DriverController from "./driver.controller";

import { checkToken } from "./driver.util";

const router = Router();

router.post("/register", DriverController.register);

router.post("/verify", DriverController.verify);

router.post("/login", DriverController.login);

router
  .route("/me")
  .get(checkToken, DriverController.get)
  .put(checkToken, DriverController.update)
  .delete(checkToken, DriverController.delete);

export default router;
