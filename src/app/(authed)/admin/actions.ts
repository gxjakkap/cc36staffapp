"use server";

import { headers } from "next/headers";
import { UWRWithUsername } from "@/components/staff-table";
import { auth } from "@/lib/auth";

export async function addStaffAccount(data: {
  name: string;
  role: "staff" | "admin";
  email: string;
  username: string;
  password: string;
}) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });
  if (!session || session.user.role !== "admin") {
    return { status: 403, err: "forbidden" };
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
          username: data.username,
        },
      },
    });
  } catch (error) {
    /* if (error instanceof APIError) {
            console.log(error.message, error.status)
            return { status: 400, error: JSON.parse(JSON.stringify(error)) }
        } */
    return { status: 400, error: JSON.parse(JSON.stringify(error)) };
  }

  return { status: 201 };
}

export async function deleteStaffAccount(id: string) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });
  if (!session || session.user.role !== "admin") {
    return { status: 403, err: "forbidden" };
  }
  try {
    await auth.api.removeUser({
      headers: await headers(),
      body: {
        userId: id,
      },
    });
  } catch (error) {
    /* if (error instanceof APIError) {
            console.log(error.message, error.status)
            return { status: 400, error: JSON.parse(JSON.stringify(error)) }
        } */
    return { status: 400, error: JSON.parse(JSON.stringify(error)) };
  }

  return { status: 200 };
}

export async function editStaffAccount(
  data: Partial<{ password: string; role: "staff" | "admin" }>,
  id: string,
) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });
  if (!session || session.user.role !== "admin") {
    return { status: 403, err: "forbidden" };
  }
  try {
    if (data.role) {
      await auth.api.setRole({
        headers: await headers(),
        body: {
          userId: id,
          role: data.role,
        },
      });
    }
    if (data.password) {
      await auth.api.setUserPassword({
        headers: await headers(),
        body: {
          userId: id,
          newPassword: data.password,
        },
      });
    }
  } catch (error) {
    /* if (error instanceof APIError) {
            console.log(error.message, error.status)
            return { status: 400, error: JSON.parse(JSON.stringify(error)) }
        } */
    return { status: 400, error: JSON.parse(JSON.stringify(error)) };
  }

  return { status: 200 };
}
