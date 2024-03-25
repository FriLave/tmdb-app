import Like from "@/models/like";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Types } from "mongoose";
import dbConnect from "@/lib/mongoose";

type Params = {
  idMovie: string;
};

/**
 * @swagger
 * /api/movies/:idMovie/like:
 *   patch:
 *     description: Like or unlike a movie if it's already liked
 *     tags:
 *       - movies
 *     parameters:
 *       - name: idMovie
 *         in: path
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: like
 *       500:
 *         description: Error
 */
export const PATCH = async (
  req: NextRequest,
  { params }: { params: Params },
) => {
  const { idMovie } = params;
  const payload = auth.retrieveJWTPayload(req);

  await dbConnect();
  const like = await Like.findOne({
    movieId: idMovie,
    user: new Types.ObjectId(payload?.sub as string),
  });
  if (like) {
    await like.deleteOne();
  } else {
    const like = new Like({
      movieId: idMovie,
      user: new Types.ObjectId(payload?.sub as string),
    });
    await like.save();
  }

  const count = await Like.countDocuments({ movieId: idMovie });
  return NextResponse.json(count);
};
