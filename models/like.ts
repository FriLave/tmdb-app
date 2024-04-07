import mongoose, { Model, model, models, Schema, Types } from "mongoose";

interface LikeModel {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  mediaId: string;
  mediaType: "tv" | "movie";
}

const likeSchema = new Schema<LikeModel>({
  _id: { type: Schema.ObjectId, auto: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mediaId: { type: String, required: true },
  mediaType: { type: String, required: true },
});

const Like: Model<LikeModel> =
  models.Like || model<LikeModel>("Like", likeSchema);

export default Like;
