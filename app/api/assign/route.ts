
import {db} from '@/app/libs/db'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
    const body = await request.json()
    const { id,drivername,drivercontact,drivervehicle ,drivervehiclenumber } = body
    const order = await db.service.update({
        where: { id: id },
        data: {drivername,drivercontact,drivervehicle ,drivervehiclenumber}
    })
    return NextResponse.json(order)
}