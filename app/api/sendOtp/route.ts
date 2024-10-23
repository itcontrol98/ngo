import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json();
  const { email,newOtp } = body;
     try {
          
            const transporter = nodemailer.createTransport({
                host: 'smtpout.secureserver.net',
                port: 587,
                secure: false,
                auth: {
                    user: 'info@careerdefiner.com',
                    pass: 'Career@2024#'
                }
            });

            // Send email
            await transporter.sendMail({
                from: '"BhooTatav" <info@careerdefiner.com>',
                to: email,
                subject: 'Your OTP for verification',
                text: `Your OTP is: ${newOtp}`
            });

            NextResponse.json({ message: 'OTP sent successfully' },{status:200});
        } catch (error) {
            console.error('Error sending OTP:', error);
            NextResponse.json({ message: 'Failed to send OTP' },{status:403});
        }
    } 

