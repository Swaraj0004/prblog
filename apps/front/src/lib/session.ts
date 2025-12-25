
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export type SessionUser = {
    id?: number;
    name?: string;
    avatar?: string;
};

export type Session = {
    user: SessionUser;
    acessToken: string;
}
const secretKey = process.env.SESSION_SECRET_KEY!
const encodedKey = new TextEncoder().encode(secretKey)

export async function createSession(payload: Session) {
    const session = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(encodedKey);

    const expierdAt = new Date(Date.now() + 60 * 60 * 1000);

    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expierdAt,
        sameSite: "lax",
        path: "/",
    });

}

export async function getSession() {
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) return null;

    try {
        const { payload } = await jwtVerify(cookie, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload as Session;
    }
    catch (err) {
        console.error("Failed to verify session:", err);
        redirect("/auth/signin");
    }

}

export async function deleteSession() {
    await (await cookies()).delete("session");
}