import {NextRequest, NextResponse} from "next/server";
import dbConnect from "@/lib/mongoose";
import Like from "@/models/like";
import User, {UserModel} from "@/models/user";
import {auth} from "@/lib/auth";
import bcrypt, {genSalt, hash} from "bcrypt";

/**
 * @swagger
 * /api/register:
 *   post:
 *     description: Create and authenticate user
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
 *         description: User
 *       500:
 *         description: Error
 */
export const POST = async (req: NextRequest) => {
    const body: Omit<UserModel, '_id'> = await req.json();

    const salt = await genSalt(10);
    body.password = await hash(body.password, salt);

    await dbConnect();
    const user = new User(body)
    await user.save();

    const token = auth.generateJWT(user);
    auth.setCookie(token);

    return NextResponse.json(user)
}
