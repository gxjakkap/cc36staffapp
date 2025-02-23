"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function addStaffAccount(data: { name: string, role: "staff" | "admin", email: string, username: string, password: string,}) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session || session.user.role !== "admin"){
        return { status: 403, err: 'forbidden' }
    }

    try {
        await auth.api.createUser({
            headers: await headers(),
            body: {
                email: data.email,
                name: data.name,
                password: data.password,
                role: data.role,
                data: {
                    username: data.username
                }
            }
        })
    }
    catch (error) {
        /* if (error instanceof APIError) {
            console.log(error.message, error.status)
            return { status: 400, error: JSON.parse(JSON.stringify(error)) }
        } */
        return { status: 400, error: JSON.parse(JSON.stringify(error)) }
    }

    return { status: 201 }
}

