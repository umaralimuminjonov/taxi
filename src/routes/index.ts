import { Router } from "express";

import userRouter from "../domain/driver/driver.route";

const router = Router();

router.use("/drivers", userRouter);

export default router;
