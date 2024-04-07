import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/tv/genres:
 *   get:
 *     description: Returns TMDB genres list of tv
 *     tags:
 *       - tv
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Genres
 *       500:
 *         description: Error
 */
export const GET = async (req: NextRequest) => {
  const language = req.cookies.get("NEXT_LOCALE")?.value;
  const res = await fetch(`https://api.themoviedb.org/3/genre/tv/list?language${language}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });

  const body = await res.json();
  return NextResponse.json(body.genres);
};
