import { getCurrentUser } from '@/actions/getCurrentUser';
import {db} from '@/app/libs/db'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'SUPERADMIN')) {
      return NextResponse.json(
        { message: "Unauthorized User" },
        { status: 401 }
      );
  }
    const body = await request.json()
    const { id, isEnabled } = body
    const order = await db.user.update({
        where: { id: id },
        data: { isEnabled }
    })
    return NextResponse.json(order)
}