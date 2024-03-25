import Like from "@/models/like";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  idTv: string;
};

/**
 * @swagger
 * /api/tv/:idTv/like:
 *   post:
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
export const POST = async (
  req: NextRequest,
  { params }: { params: Params },
) => {
  const { idTv } = params;
  // const payload = auth.retrieveJWTPayload(req);

  const like = new Like({ movieId: idTv });
  await like.save();

  const count = await Like.countDocuments({ movieId: idTv });
  return NextResponse.json(count);
};
