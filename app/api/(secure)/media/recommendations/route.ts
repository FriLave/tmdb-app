import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Like from "@/models/like";
import { auth } from "@/lib/auth";
import { Types } from "mongoose";

/**
 * @swagger
 * /api/media/recommendations:
 *   get:
 *     description: Returns TMDB recommendations movies paginated
 *     tags:
 *       - media
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movies
 *       500:
 *         description: Error
 */
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") ?? 1;
  const language = req.cookies.get("NEXT_LOCALE")?.value;

  const payload = auth.retrieveJWTPayload(req);

  await dbConnect();

  const likes = await Like.find({ user: new Types.ObjectId(payload?.sub as string) });
  const promises = likes.map(async (like) => {
    return fetch(
      `https://api.themoviedb.org/3/${like.mediaType}/${like.mediaId}/recommendations?page=${page}&language=${language}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      },
    );
  });


  const res = await Promise.all(promises);
  const data = await Promise.all(res.map((r) => r.json()));

  //shuffle and take 20 first
  const uniqueResults = Array.from(new Set(data.flatMap(it => it.results)));
  const shuffledResults = uniqueResults.sort(() => Math.random() - 0.5);
  const results = shuffledResults.slice(0, 20);

  return NextResponse.json(results);
};
