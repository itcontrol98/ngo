import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";

// PUT API

export async function PUT(request: any, content: any) {
  const currentUser = await getCurrentUser();
  if (!currentUser || (currentUser.role !== 'SUPERADMIN')) {
    return NextResponse.json(
      { message: "Unauthorized User" },
      { status: 401 }
    );
}
  try {
    const id = content.params.id;
    const payload = await request.json();
    const data = await db.driver.update({ where: { id }, data: payload });
    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}



//SINGLE ITEM GET API

export async function GET(request: any, content: any) {
  try {
    const id = content.params.id;
    const data = await db.driver.findUnique({ where: { id } });
    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE API

export async function DELETE(request: any, content: any) {
  const currentUser = await getCurrentUser();
  if (!currentUser || (currentUser.role !== 'SUPERADMIN')) {
    return NextResponse.json(
      { message: "Unauthorized User" },
      { status: 401 }
    );
}
  try {
    const id = content.params.id;
    const data = await db.driver.delete({ where: { id } });
    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}