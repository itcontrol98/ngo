import { db } from '@/app/libs/db';

export default async function getService() {
    try {
        const services = await db.service.findMany(
            {
                include: {
                    user: {
                        include:{
                            drivers:true
                        }
                    },
                },
            }
        );
        return services;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "Failed to fetch doctors");
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}
