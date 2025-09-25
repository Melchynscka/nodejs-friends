import { FriendCollection } from "../db/models/Friend.js";

export const getAllFriends = async () => {
    const friends = await FriendCollection.find();
    return friends;
};

export const getFriendById = async (id) => {
    const friend = await FriendCollection.findById(id);
    return friend;
};