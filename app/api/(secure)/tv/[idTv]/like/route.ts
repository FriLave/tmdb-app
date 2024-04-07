import Like from "@/models/like";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import { Types } from "mongoose";

type Params = {
  idTv: string;
};

/**
 * @swagger
 * /api/tv/:idTv/like:
 *   patch:
 *     description: Returns TMDB
 *     tags:
 *       - tv
 *     parameters:
 *       - name: idSerie
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
  const { idTv } = params;
  const payload = auth.retrieveJWTPayload(req);

  await dbConnect();
  const like = await Like.findOne({
    mediaId: idTv,
    user: new Types.ObjectId(payload?.sub as string),
  });
  if (like) {
    await like.deleteOne();
  } else {
    const like = new Like({
      mediaId: idTv,
      user: new Types.ObjectId(payload?.sub as string),
    });
    await like.save();
  }

  const count = await Like.countDocuments({ mediaId: idTv });
  return NextResponse.json({ count });
};
