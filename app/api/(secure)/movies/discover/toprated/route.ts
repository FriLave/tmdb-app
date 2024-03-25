import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/movies/discover/toprated:
 *   get:
 *     description: Returns TMDB toprated movies paginated
 *     tags:
 *       - movies
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

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    },
  );

  const movies = await res.json();
  return NextResponse.json(movies);
};
