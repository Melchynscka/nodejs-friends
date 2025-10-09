import Joi from "joi";
import { contactTypeList, emailRegexp } from "../constants/friends.js";

export const createFriendSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required().messages({
        "any.required": "number must be exist",
    }),
    email: Joi.string().min(3).max(20).pattern(emailRegexp),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactTypeList).required(),
});

export const createPatchSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20).messages({
        "any.required": "number must be exist",
    }),
    email: Joi.string().min(3).max(20).pattern(emailRegexp),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactTypeList)
});