import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
export async function POST(request: Request) {
  try {
    const { message, line1, line2, state,district,postalCode } = await request.json();
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Please Login!" }, { status: 401 });
    }
    if (!message || !district || !line1  || !state  || !postalCode) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const drivers = await db.service.create({
      data: {
        user: { connect: { id: currentUser.id } },
        message, line1, line2, state,district,postalCode
      },
    });

    return NextResponse.json(
      { drivers, message: "Requested successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating driver:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
