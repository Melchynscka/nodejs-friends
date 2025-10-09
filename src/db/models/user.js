import { model, Schema } from 'mongoose';
import { emailRegexp } from "../../constants/users.js";
import { handleSaveError, setUpdateOptions } from "./hooks.js";

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, match: emailRegexp, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);
usersSchema.post("save", handleSaveError);
usersSchema.pre("findOneAndUpdate", setUpdateOptions);
usersSchema.post("findOneAndUpdate", handleSaveError);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);