import { NextRequest, NextResponse } from "next/server";
import Like from "@/models/like";
import dbConnect from "@/lib/mongoose";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

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
export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const { idMovie } = params;
  const searchParams = req.nextUrl.searchParams;
  const appendToResponse = searchParams.get("append_to_response");
  const language = cookies().get('NEXT_LOCALE')?.value

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${idMovie}?append_to_response=${appendToResponse}&language=${language}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    },
  );

  const data = await res.json();
  if (!data || data.success === false) {
    return notFound();
  }

  await dbConnect();
  const like = await Like.countDocuments({ mediaId: idMovie });

  return NextResponse.json({
    ...data,
    like,
  });
};
