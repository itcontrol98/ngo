import { getCurrentUser } from '@/actions/getCurrentUser';
import {db} from '@/app/libs/db'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'SUPERADMIN' && currentUser.role !== 'DRIVER')) {
      return NextResponse.json(
        { message: "Unauthorized User" },
        { status: 401 }
      );
  }
    const body = await request.json()
    const { id, status } = body
    const order = await db.service.update({
        where: { id: id },
        data: { status }
    })
    return NextResponse.json(order)
}