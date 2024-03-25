import { model, Model, models, Schema, Types } from "mongoose";

export interface UserModel {
  _id: Types.ObjectId;
  username: string;
  password: string;
}

const userSchema = new Schema<UserModel>({
  _id: { type: Schema.ObjectId, auto: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User: Model<UserModel> =
  models.User || model<UserModel>("User", userSchema);

export default User;
