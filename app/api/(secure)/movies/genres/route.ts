import {NextApiRequest, NextApiResponse} from "next";
import {NextRequest, NextResponse} from "next/server";

/**
 * @swagger
 * /api/movies/genres:
 *   get:
 *     description: Returns TMDB genres list of movies
 *     tags:
 *       - movies
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

    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    })

    const body = await res.json()
    return NextResponse.json(body.genres)
}
