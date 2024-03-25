import {UserModel} from "@/models/user";
import {sign, verify} from "jsonwebtoken";
import {cookies} from "next/headers";
import {NextRequest} from "next/server";

const MAX_AGE = 60 * 60 * 24 * 30; //30d

const generateJWT =(user: UserModel) => {
    const secret = process.env.JWT_SECRET ?? ''
    return sign({sub: user._id}, secret, {
        algorithm: 'HS256',
        expiresIn: MAX_AGE
    })
}

async function verifyJWT(user: string) {
    const secret = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(process.env.JWT_SECRET!),
        {
            name: "HMAC",
            hash: { name: "SHA-256" },
        },
        false,
        ["verify"]
    );

    return crypto.subtle.verify(
        "HMAC",
        secret,
        Buffer.from(user.split(".")[2], "base64url"),
        new TextEncoder().encode(user.split(".").splice(0, 2).join("."))
    );
}

const retrieveJWTPayload = (request: NextRequest) => {
    const token = request.cookies.get('user')?.value;
    if (!token) return null;
    return verify(token, process.env.JWT_SECRET!);
}



const setCookie = (token: string) => {
    cookies().set('user', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: MAX_AGE,
        path: "/",
    });
}

export const auth = {
    generateJWT,
    verifyJWT,
    retrieveJWTPayload,
    setCookie
}
