import {db} from '@/app/libs/db'

export default async function getUsers() 
{
    try {
        const users = await db.user.findMany(
        );
        return users
    } catch (error:any) {
        throw new Error(error);
    }
}
