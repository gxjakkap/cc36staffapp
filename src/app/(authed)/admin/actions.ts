"use server"

import { UWRWithUsername } from "@/components/staff-table"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function addStaffAccount(data: { name: string, role: "staff" | "admin", email: string, username: string, password: string,}) {
    const reqHeaders = await headers()
    const session = await auth.api.getSession({ headers: reqHeaders })
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

export async function deleteStaffAccount(id: string) {
    const reqHeaders = await headers()
    const session = await auth.api.getSession({ headers: reqHeaders })
    if (!session || session.user.role !== "admin"){
        return { status: 403, err: 'forbidden' }
    }
    try {
        await auth.api.removeUser({
            body: {
                userId: id
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

    return { status: 200 }
}