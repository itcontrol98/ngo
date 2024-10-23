import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
export async function POST(request: Request) {
  const { name, email, contact, password } = await request.json();

  try {
    if (!name || !password || !email || !contact) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 404 }
      );
    }

    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      return NextResponse.json(
        { message: "Invalid contact format" },
        { status: 410 }
      );
    }

    const passwordRegex = /^.{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { message: "Password at least 8 characters" },
        { status: 411 }
      );
    }
    const existingEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const user = await db.user.create({
      data: { name, email, contact, password: hashedPassword },
    });

    return NextResponse.json(
      { user, message: "Added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

