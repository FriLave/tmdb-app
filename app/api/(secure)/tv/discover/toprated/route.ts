import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/tv/discover/toprated:
 *   get:
 *     description: Returns TMDB toprated series paginated
 *     tags:
 *       - tv
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: series
 *       500:
 *         description: Error
 */
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") ?? 1;
  const language = req.cookies.get("NEXT_LOCALE")?.value;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?page=${page}&language=${language}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    },
  );

  const series = await res.json();
  return NextResponse.json(series);
};
