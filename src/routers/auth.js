import { Router } from "express";
import { ctrWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { registerUserSchema, loginUserSchema, requestResetEmailSchema, resetPasswordSchema   } from "../validation/auth.js";
import { registerUserController,loginUserController, refreshUserSessionController, logoutUserController, requestResetEmailController, resetPasswordController  } from "../controllers/auth.js";


const authRouter = Router();

authRouter.post("/register", validateBody(registerUserSchema), ctrWrapper(registerUserController));

authRouter.post("/login", validateBody(loginUserSchema), ctrWrapper(loginUserController));

authRouter.post('/refresh', ctrWrapper(refreshUserSessionController));

authRouter.post('/logout', ctrWrapper(logoutUserController));

authRouter.post("/request-reset-email", validateBody(requestResetEmailSchema), ctrWrapper(requestResetEmailController));

authRouter.post("/reset-password", validateBody(resetPasswordSchema), ctrWrapper(resetPasswordController));


export default authRouter;