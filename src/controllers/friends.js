import createHttpError from 'http-errors';
import { getFriends, getFriendById, createFriend, deleteFriend, updateFriend } from "../services/friends.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { sortFields } from "../db/models/Friend.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getAllFriendsController = async (req, res) => {
    const { perPage, page } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
    const { _id: userId } = req.user;
    const filter = parseFilterParams(req.query)

    const friends = await getFriends({
        perPage,
        page,
        sortBy,
        sortOrder,
        filter: {...filter, userId},
    });
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data: friends,
        });
};
export const getFriendByIdController = async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const friend = await getFriendById({_id: id, userId});

    if (!friend) {
        throw createHttpError(404, 'Friends not found');
    }
    res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: friend
    });
};

export const createFriendController = async (req, res) => {
    console.log(req.user);
    const { _id: userId } = req.user;

    const body = await createFriend({...req.body, userId});
    res.status(201).json({
        status: 201,
        message: "Successfully created a friend!",
        data: body,
    });
};

export const deleteFriendController = async (req, res, next) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const friend = await deleteFriend({_id: id, userId});

    if (!friend) {
    next(createHttpError(404, 'Friend not found'));
    return;
    };

  res.status(204).send();
};

export const upsertFriendController = async (req, res, next) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const result = await updateFriend({_id: id, userId}, req.body, {
        upsert: true,
    });
    if (!result) {
        next(createHttpError(404, "friend not found"));
        return
    };
    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: `Successfully upserted a friend!`,
        data: result.friend
    });
};

export const patchFriendController = async (req, res, next) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const result = await updateFriend({_id: id, userId}, req.body);
    if (!result) {
        next(createHttpError(404, "friend not found"))
        return
    };
    res.json({
        status: 200,
        message: "Successfully updated a friend!",
        data:result.friend    
});
};