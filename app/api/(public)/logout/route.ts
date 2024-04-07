import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * @swagger
 * /api/logout:
 *   post:
 *     description: Authenticate user
 *     tags:
 *       - authentication
 *     responses:
 *       200:
 *         description: Movies
 *       500:
 *         description: Error
 */
export const POST = async () => {
  cookies().delete("user");
  return NextResponse.json({ message: "Logged out" });
};
