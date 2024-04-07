import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Like from "@/models/like";

/**
 * @swagger
 * /api/media/likes:
 *   get:
 *     description: Returns TMDB week trending movies paginated
 *     tags:
 *       - media
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
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

  const pageSize = 20;
  const skips = pageSize * (Number(page) - 1);

  const [total, likes] = await Promise.all([
    Like.countDocuments(),
    Like.find({}, { mediaType: 1, mediaId: 1 })
      .skip(skips)
      .limit(pageSize)
      .sort({ createdAt: -1 })
  ]);

  const promises = likes.map(async (like) => {
    return fetch(
      `https://api.themoviedb.org/3/${like.mediaType}/${like.mediaId}&language=${language}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      });
  })

  const res = await Promise.all(promises);
  const data = await Promise.all(res.map((r) => r.json()));

  return NextResponse.json({
    page: page,
    results: data,
    total_pages: Math.ceil(total / pageSize),
    total_results: total,
  });
};
