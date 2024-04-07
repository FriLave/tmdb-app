import Like from "@/models/like";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { Types } from "mongoose";
import dbConnect from "@/lib/mongoose";

type Params = {
  id: string;
};

interface Body {
  media_type: 'tv' | 'movie';
}

/**
 * @swagger
 * /api/media/:idMovie/like:
 *   patch:
 *     description: Like or unlike a movie/series/person if it's already likes
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
  const { id } = params;
  const body: Body = await req.json();
  console.log(body);

  const payload = auth.retrieveJWTPayload(req);

  await dbConnect();
  const like = await Like.findOne({
    mediaId: id,
    user: new Types.ObjectId(payload?.sub as string),
  });

  if (like) {
    // Unlike
    await like.deleteOne();
  } else {
    // Like
    const like = new Like({
      mediaId: id,
      user: new Types.ObjectId(payload?.sub as string),
      mediaType: body.media_type,
    });

    console.log(like);
    await like.save();
  }

  const count = await Like.countDocuments({ mediaId: id });
  return NextResponse.json(count);
};
