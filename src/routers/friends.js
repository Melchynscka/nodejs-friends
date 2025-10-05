import { Router } from "express";
import { getAllFriendsController, getFriendByIdController, createFriendController, deleteFriendController, upsertFriendController, patchFriendController } from "../controllers/friends.js";
import { ctrWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { createFriendSchema, createPatchSchema } from "../validation/friends.js";
import { isValidId } from "../middlewares/isValidId.js";

const friendsRouter = Router();

friendsRouter.get("/", ctrWrapper(getAllFriendsController));

friendsRouter.get("/:id", isValidId, ctrWrapper(getFriendByIdController));

friendsRouter.post("/",validateBody(createFriendSchema),ctrWrapper(createFriendController));

friendsRouter.delete("/:id", isValidId, ctrWrapper(deleteFriendController));

friendsRouter.put("/:id",isValidId, validateBody(createFriendSchema), ctrWrapper(upsertFriendController));

friendsRouter.patch("/:id",isValidId, validateBody(createPatchSchema), ctrWrapper(patchFriendController));

export default friendsRouter;