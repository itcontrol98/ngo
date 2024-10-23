import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  try {
    if (!password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    
    const passwordRegex = /^.{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { message: "Password at least 8 characters" },
        { status: 411 }
      );
    }
    
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await hash(password, 10);
    const updatedUser = await db.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json(
      { message: "Password updated" },
      { status: 200 }
    );
  } catch (error:any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
