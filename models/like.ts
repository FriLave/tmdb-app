import mongoose, { Model, model, models, Schema, Types } from "mongoose";

interface LikeModel {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  movieId: string;
}

const likeSchema = new Schema<LikeModel>({
  _id: { type: Schema.ObjectId, auto: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  movieId: { type: String, required: true },
});

const Like: Model<LikeModel> =
  models.Like || model<LikeModel>("Like", likeSchema);

export default Like;
