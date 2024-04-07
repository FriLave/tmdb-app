import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Returns TMDB movies paginated
 *     tags:
 *       - movies
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *       - name: with_genres
 *         in: query
 *         schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Movies
 *       500:
 *         description: Error
 */
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") ?? 1;
  const with_genres = searchParams.get("with_genres") ?? "";
  const language = req.cookies.get("NEXT_LOCALE")?.value;

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?page=${page}&with_genres=${with_genres}&language=${language}`,
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
