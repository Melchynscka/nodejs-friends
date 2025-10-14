import { Router } from "express";
import { getAllFriendsController, getFriendByIdController, createFriendController, deleteFriendController, upsertFriendController, patchFriendController } from "../controllers/friends.js";
import { ctrWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { createFriendSchema, createPatchSchema } from "../validation/friends.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";


const friendsRouter = Router();

friendsRouter.use(authenticate);

friendsRouter.get("/", ctrWrapper(getAllFriendsController));

friendsRouter.get("/:id", isValidId, ctrWrapper(getFriendByIdController));

friendsRouter.post("/", upload.single("photo"), validateBody(createFriendSchema), ctrWrapper(createFriendController));

friendsRouter.delete("/:id", isValidId, ctrWrapper(deleteFriendController));

friendsRouter.put("/:id",upload.single("photo"),isValidId, validateBody(createFriendSchema), ctrWrapper(upsertFriendController));

friendsRouter.patch("/:id",upload.single("photo"), isValidId, validateBody(createPatchSchema), ctrWrapper(patchFriendController));

export default friendsRouter;