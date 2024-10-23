import { db } from "@/app/libs/db";
import { NextResponse } from 'next/server'
import { getCurrentUser } from "@/actions/getCurrentUser";

// Single Request 

export async function GET(request: Request) {
  const id = request.url.split('/').pop()
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'SUPERADMIN') {
    return NextResponse.json(
      { message: "Unauthorized User" },
      { status: 401 })}
  
  try {
    const user = await db.user.findUnique({
      where: { id: id as string },
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.error()
  }
}

// Update Request

export async function PUT(request: Request) {
  const id = request.url.split("/").pop();
  const { name, email, contact, role } = await request.json();
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'SUPERADMIN') {
    return NextResponse.json(
      { message: "Unauthorized User" },
      { status: 401 })}
  try {
    if (!email || !name || !contact  || !role) {
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
    if(!contactRegex.test(contact)){
      {
        return NextResponse.json(
          { message: "Invalid contact format" },
          { status: 410 }
        );
      }
    }
    const existingEmail = await db.user.findUnique({
      where: { email },
    });


    if (existingEmail && existingEmail.id !== id) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 409 }
      );
    }
    const customer = await db.user.update({
      where: { id: id as string },
      data: { name, email, contact, role },
    });

    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Delete Reqest

export async function DELETE(request: Request) {
  const id = request.url.split('/').pop()
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'SUPERADMIN') {
    return NextResponse.json(
      { message: "Unauthorized User" },
      { status: 401 })}
  try {
    await db.user.delete({
      where: { id: id as string },
    })
    return NextResponse.json({}, { status: 204 })
  } catch (error) {
    return NextResponse.error()
  }
}
