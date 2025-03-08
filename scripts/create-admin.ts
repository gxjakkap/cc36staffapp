import { eq } from "drizzle-orm";

import { dbStaff } from "@/db";
import { user as userTable } from "@/db/staff-schema";
import { authClient } from "@/lib/auth-client";
import { StaffRoles } from "@/lib/auth/role";

const email = process.argv[2];
const username = process.argv[3];
const password = process.argv[4];
const name = process.argv[5] || username;

if (!email || !username || !password) {
  console.error(
    "Usage: pnpm create-admin <email> <username> <password> [name]",
  );
  process.exit(1);
}

console.log(email);
console.log(username);
console.log(password);
console.log(name);

function createCurrentDate() {
  return new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

async function createAdmin() {
  try {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      username,
    });

    if (error) {
      throw error;
    }

    if (!data) {
      return;
    }

    await dbStaff
      .update(userTable)
      .set({
        role: StaffRoles["ADMIN"],
      })
      .where(eq(userTable.id, data.user.id));

    console.log(
      `✅ Admin user created successfully! at ${createCurrentDate()}`,
    );
  } catch (error) {
    console.error(
      `❌ Failed to create admin user at with ${createCurrentDate()} \n error : `,
      error,
    );
  } finally {
    process.exit();
  }
}

createAdmin();
