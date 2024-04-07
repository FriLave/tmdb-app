import { NextRequest, NextResponse } from "next/server";
import { Media } from "@/types/api-response";

/**
 * @swagger
 * /api/search:
 *   get:
 *     description: Returns TMDB movies/series paginated filtered by query
 *     tags:
 *       - media
 *     parameters:
 *       - name: query
 *         in: query
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movies/Series
 *       500:
 *         description: Error
 */
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const page = searchParams.get("page") ?? 1;
  const language = req.cookies.get("NEXT_LOCALE")?.value;

  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&page=${page}&language=${language}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    },
  );

  const body = await res.json();
  const media = body.results.filter((media: Media) => {
    return ["tv", "movie"].includes(media.media_type);
  });
  return NextResponse.json({
    ...body,
    results: media,
  });
};
