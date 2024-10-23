import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;
    if (!email) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 404 }
      );
    }
    const existingEmail = await db.user.findUnique({
      where: { email },
    });
    
    if (!existingEmail) {
      return NextResponse.json({ user: null, message: "Email Doesn't Exist" }, { status: 409 });
    }

    // Generate reset token and hash it
    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const passwordResetExpires = Date.now() + 600000;
    const updatedUser = await db.user.update({
      where: { email },
      data: {
        resetToken: passwordResetToken,
        resetTokenExpiry: new Date(passwordResetExpires),
      },
    });
    const resetUrl = `https://bhutatav.com/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 587,
      secure: false,
      auth: {
        user: 'info@careerdefiner.com',
        pass: 'Career@2024#',
      },
    });
    await transporter.sendMail({
      from: '"BhooTatav" <info@careerdefiner.com>',
      to: email,
      subject: 'Your Reset Password Link',
      text: `This link will become invalid in 10 minutes: ${resetUrl}`,
    });

    // Return a success response
    return NextResponse.json({message: "Link Sent" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}


