// import { db } from '@/app/libs/db';
// import { NextResponse } from 'next/server';
// export async function POST(request: Request) {
//   const { token } = await request.json();
//   try {
//     const user = await db.user.findFirst({
//       where: {
//         verificationToken: token,
//       },
//     });
//     if (!user) {
//       return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
//     }
//     await db.user.update({
//       where: { id: user.id },
//       data: {
//         emailVerified: true,
//         verificationToken: null,
//       },
//     });
//     return NextResponse.json({ user, message: 'Email verified successfully' });
//   } catch (error) {
//     console.error('Verification error:', error);
//     return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
//   }
// }
