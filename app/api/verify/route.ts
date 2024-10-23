import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";
import crypto from 'crypto';

export async function POST(req: Request) {
    const { token } = await req.json();
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const data = await db.user.findUnique({
        where: {
            resetToken: hashedToken,
            resetTokenExpiry: { gt: new Date() }
        }
    });

    if (!data) {
        return NextResponse.json({ message: "Invalid token or has expired" }, { status: 400 });
    }

    return NextResponse.json(JSON.stringify(data), { status: 200 });
}
