import {NextApiRequest} from "next";
import {NextRequest, NextResponse} from "next/server";

/**
 * @swagger
 * /api/tv:
 *   get:
 *     description: Returns TMDB tv paginated
 *     tags:
 *       - tv
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Series
 *       500:
 *         description: Error
 */
export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams
    const page = searchParams.get('page') ?? 1;

    const res = await fetch(`https://api.themoviedb.org/3/discover/tv?page=${page}`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    })

    const movies = await res.json()
    return NextResponse.json(movies)
}
