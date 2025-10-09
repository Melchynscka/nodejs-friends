import { Schema, model } from "mongoose";
import { contactTypeList, emailRegexp } from "../../constants/friends.js";
import { handleSaveError, setUpdateOptions } from "../models/hooks.js";

const friendSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: contactTypeList,
        required: true,
        default: "personal",
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'users',
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false,
});

friendSchema.post("save", handleSaveError);
friendSchema.pre("findOneAndUpdate", setUpdateOptions);
friendSchema.post("findOneAndUpdate", handleSaveError);

export const sortFields = ["name", "phoneNumber", "email", "contactType"];


export const FriendCollection =  model("friend", friendSchema)
