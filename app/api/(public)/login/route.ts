import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User, { UserModel } from "@/models/user";
import { auth } from "@/lib/auth";
import { compare } from "bcrypt";

/**
 * @swagger
 * /api/login:
 *   post:
 *     description: Authenticate user
 *     tags:
 *       - authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Movies
 *       500:
 *         description: Error
 */
export const POST = async (req: NextRequest) => {
  const body: Omit<UserModel, "_id"> = await req.json();

  await dbConnect();
  const user = await User.findOne({ username: body.username });
  if (!user || !(await compare(body.password, user.password))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = auth.generateJWT(user);
  auth.setCookie(token);

  return NextResponse.json(user);
};
