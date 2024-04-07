import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Like from "@/models/like";

/**
 * @swagger
 * /api/media/recommended:
 *   get:
 *     description: Returns TMDB recommended movies paginated
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

  await dbConnect();

  const likes = await Like.find();
  const promises = likes.map(async (like) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${like.mediaId}/recommendations?page=${page}&language=${language}`,
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
  const shuffle = data.toSorted(() => Math.random() - 0.5);
  const results = shuffle.slice(0, 20);

  return NextResponse.json(results);
};
