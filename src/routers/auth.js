import { Router } from "express";
import { ctrWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { registerUserSchema, loginUserSchema } from "../validation/auth.js";
import { registerUserController,loginUserController, refreshUserSessionController, logoutUserController } from "../controllers/auth.js";


const authRouter = Router();

authRouter.post("/register", validateBody(registerUserSchema), ctrWrapper(registerUserController));

authRouter.post("/login", validateBody(loginUserSchema), ctrWrapper(loginUserController));

authRouter.post('/refresh', ctrWrapper(refreshUserSessionController));

authRouter.post('/logout', ctrWrapper(logoutUserController));

export default authRouter;