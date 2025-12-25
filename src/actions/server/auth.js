'use server'

import { dbConnect } from "@/lib/dbConnect"
import bcrypt from 'bcryptjs'

export const postUser = async (payLoad) => {

    // 3. store user to database
    const result = await dbConnect('users').insertOne(newUser);
    if (result.acknowledged) {
        return {
            success: true,
            message: `user created with ${result.insertedId.toString()}`,
        }
    }
}