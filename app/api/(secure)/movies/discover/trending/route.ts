import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/movies/discover/trending:
 *   get:
 *     description: Returns TMDB week trending movies paginated
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
  const language = req.cookies.get("NEXT_LOCALE")?.value;

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?page=${page}&language=${language}`,
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
