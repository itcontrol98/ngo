
import {db} from '@/app/libs/db'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
    const body = await request.json()
    const { id,drivername,drivercontact,drivervehicle ,drivervehiclenumber,driverid,deliverystatus } = body
    const order = await db.service.update({
        where: { id: id },
        data: {drivername,drivercontact,drivervehicle ,drivervehiclenumber,driverid,deliverystatus}
    })
    return NextResponse.json(order)
}