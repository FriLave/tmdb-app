import {NextApiRequest} from "next";
import {NextRequest, NextResponse} from "next/server";
import Like from "@/models/like";
import dbConnect from "@/lib/mongoose";

type Params = {
    idMovie: string;
};

/**
 * @swagger
 * /api/movies/:idMovie:
 *   get:
 *     description: Returns TMDB movie's details
 *     tags:
 *       - movies
 *     responses:
 *       200:
 *         description: movie details
 *       500:
 *         description: Error
 */
export const GET = async (req: NextRequest, { params } : { params: Params}) => {
    const { idMovie } = params;
    const searchParams = req.nextUrl.searchParams
    const appendToResponse = searchParams.get('append_to_response')

    const res = await fetch(`https://api.themoviedb.org/3/movie/${idMovie}?append_to_response=${appendToResponse}`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    })

    await dbConnect();
    const like = await Like.countDocuments({ movieId: idMovie })

    return NextResponse.json({
        ...(await res.json()),
        like
    })
}
