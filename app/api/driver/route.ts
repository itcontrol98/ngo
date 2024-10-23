import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
export async function POST(request: Request) {
  try {
    const { vehicletype, vehiclenumber, status, address } = await request.json();
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    if (!vehicletype || !vehiclenumber) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const existingDriver = await db.driver.findFirst({
      where: {
        userId: currentUser.id,
      },
    });

    if (existingDriver) {
      return NextResponse.json(
        { message: "You are already a driver." },
        { status: 403 }
      );
    }
    const drivers = await db.driver.create({
      data: {
        user: { connect: { id: currentUser.id } },
        vehicletype,
        vehiclenumber,
        address,
        status,
      },
    });

    return NextResponse.json(
      { drivers, message: "Added successfully" },
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
