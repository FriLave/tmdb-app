import { NextRequest, NextResponse } from "next/server";
import Like from "@/models/like";
import dbConnect from "@/lib/mongoose";

type Params = {
  idTv: string;
};

/**
 * @swagger
 * /api/tv/:idTv:
 *   get:
 *     description: Returns TMDB serie's details
 *     tags:
 *       - tv
 *     responses:
 *       200:
 *         description: series details
 *       500:
 *         description: Error
 */
export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const { idTv } = params;
  const searchParams = req.nextUrl.searchParams;
  const appendToResponse = searchParams.get("append_to_response");
  const language = req.cookies.get("NEXT_LOCALE")?.value;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${idTv}?append_to_response=${appendToResponse}&language=${language}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    },
  );

  await dbConnect();
  const like = await Like.countDocuments({ mediaId: idTv });

  return NextResponse.json({
    ...(await res.json()),
    like,
  });
};
