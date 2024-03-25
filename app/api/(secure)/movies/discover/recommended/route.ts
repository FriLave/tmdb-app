import {NextRequest, NextResponse} from "next/server";

/**
 * @swagger
 * /api/movies/:idMovie/discover/recommended:
 *   get:
 *     description: Returns TMDB recommended movies paginated
 *     tags:
 *       - movies
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
    const searchParams = req.nextUrl.searchParams
    const page = searchParams.get('page') ?? 1

    const res = await fetch(`https://api.themoviedb.org/3/movie/293660/recommendations?page=${page}`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    })

    const movies = await res.json()
    return NextResponse.json(movies)
}
