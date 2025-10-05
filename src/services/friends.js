import { FriendCollection } from "../db/models/Friend.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";

export const getFriends = async ({ perPage, page, sortBy="_id", sortOrder = SORT_ORDER[0] }) => {
    const skip = (page - 1) * perPage;

    const friends = await FriendCollection.find().skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
    const count = await FriendCollection.find().countDocuments();

    const paginationData = calculatePaginationData({ count, perPage, page });
    
    return {
        page,
        perPage,
        friends,
        totalItems: count,
        ...paginationData
    };
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
    const rawResult = await FriendCollection.findOneAndUpdate(
        { _id: id },
        payload,
        {
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

