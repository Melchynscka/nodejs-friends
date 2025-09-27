import { Router } from "express";
import { getAllFriendsController, getFriendByIdController, createFriendController, deleteFriendController, upsertFriendController, patchFriendController } from "../controllers/friends.js";
import { ctrWrapper } from "../utils/ctrlWrapper.js";

const friendsRouter = Router();

friendsRouter.get("/", ctrWrapper(getAllFriendsController));

friendsRouter.get("/:id", ctrWrapper(getFriendByIdController));

friendsRouter.post("/", ctrWrapper(createFriendController));

friendsRouter.delete("/:id", ctrWrapper(deleteFriendController));

friendsRouter.put("/:id", ctrWrapper(upsertFriendController));

friendsRouter.patch("/:id", ctrWrapper(patchFriendController));

export default friendsRouter;