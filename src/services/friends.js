import { FriendCollection } from "../db/models/Friend.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";

export const getFriends = async ({
    page,
    perPage,
    sortBy = "_id",
    sortOrder = SORT_ORDER[0],
    filter = {},
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const friendQuery = FriendCollection.find();
    if (filter.contactType) {
        friendQuery.where("contactType")
            .equals(filter.contactType);
    };
    if (filter.userId) {
        friendQuery.where("userId").equals(filter.userId);
    }
    const count = await FriendCollection.countDocuments();
    
    const friends = await friendQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();
    
    const paginationData = calculatePaginationData({ count, perPage, page });
    
    return {
        data: friends,
        ...paginationData
    };
};

export const getFriendById = filter => FriendCollection.findById(filter); 

    
export const createFriend = async (payload) => FriendCollection.create(payload);



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

