'use server'

import { dbConnect } from "@/lib/dbConnect"
import bcrypt from 'bcryptjs'

export const postUser = async (payLoad) => {
    // validate payload, if there is no email or password return with appropriate message

    // 1. check user exist or not
    const isExist = await dbConnect('users').findOne({ email: payLoad.email });
    if (isExist) {
        return {
            success: false,
            message: 'user already exists'
        }
    }

    // 2. create new user

    // encrypt the password
    const hashedPassword = await bcrypt.hash(payLoad.password, 10);

    // create user
    const newUser = {
        ...payLoad,
        createdAt: new Date().toISOString(),
        role: 'user',
        password: hashedPassword
    }

    // 3. store user to database
    const result = await dbConnect('users').insertOne(newUser);
    if (result.acknowledged) {
        return {
            success: true,
            message: `user created with ${result.insertedId.toString()}`,
        }
    }
}