import {db} from '@/app/libs/db'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
    const body = await request.json()
    const { id,deliverystatus } = body
    const order = await db.service.update({
        where: { id: id },
        data: {deliverystatus }
    })
    return NextResponse.json(order)
}