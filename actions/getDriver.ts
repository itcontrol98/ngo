import { db } from '@/app/libs/db';

export default async function getDriver() {
    try {
        const drivers = await db.driver.findMany(
            {
                include: {
                    user: true,
                },
            }
        );
        return drivers;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || "Failed to fetch doctors");
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
}
