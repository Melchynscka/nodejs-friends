import { FriendCollection } from "../db/models/Friend.js";

export const getAllFriends = async () => {
    const friends = await FriendCollection.find();
    return friends;
};

export const getFriendById = async (id) => {
    const friend = await FriendCollection.findById(id);
    return friend;
};

export const createFriend = async (payload) => {
    const friend = await FriendCollection.create(payload);
    return friend;
};

export const deleteFriend = async (id) => {
    const friend = await FriendCollection.findByIdAndDelete({
        _id: id,
    });

    return friend;
};

export const updateFriend = async (id, payload, options = {}) => {
    const rawResult = await FriendCollection.findByIdAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );
    if (!rawResult || !rawResult.value) return null;
    return {
        friend: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

