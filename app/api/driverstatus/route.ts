import {db} from '@/app/libs/db'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
    const body = await request.json()
    const { id,status,deliverystatus } = body
    const order = await db.driver.update({
        where: { id: id },
        data: {status,deliverystatus }
    })
    return NextResponse.json(order)
}