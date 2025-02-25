import { auth } from "../src/lib/auth"
import crypto from "crypto"
import { Pool } from "pg"
import { randomUUID } from "crypto"
import { scryptAsync } from "@noble/hashes/scrypt";
import { getRandomValues } from "@better-auth/utils";
import { hex } from "@better-auth/utils/hex";

const email = process.argv[2]
const username = process.argv[3] 
const password = process.argv[4]
const name = process.argv[5] || username

if (!email || !username || !password) {
    console.error("Usage: pnpm create-admin <email> <username> <password> [name]")
    process.exit(1)
}

console.log(email)
console.log(username)
console.log(password)
console.log(name)

const config = {
	N: 16384,
	r: 16,
	p: 1,
	dkLen: 64,
}

async function generateKey(password: string, salt: string) {
	return await scryptAsync(password.normalize("NFKC"), salt, {
		N: config.N,
		p: config.p,
		r: config.r,
		dkLen: config.dkLen,
		maxmem: 128 * config.N * config.r * 2,
	});
}

export const hashPassword = async (password: string) => {
	const salt = hex.encode(getRandomValues(new Uint8Array(16)));
	const key = await generateKey(password, salt);
	return `${salt}:${hex.encode(key)}`;
}

async function createAdmin() {
    const pool = new Pool({
        connectionString: `postgresql://postgres:${process.env.STAFFAPP_POSTGRES_PASSWORD}@${process.env.STAFFAPP_POSTGRES_HOST}:5432/postgres`
    })

    try {
        const hash = await hashPassword(password)

        const userId = randomUUID()
        const now = new Date()

        await pool.query(
            'INSERT INTO "user" (id, name, email, "emailVerified", "createdAt", "updatedAt", username, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [userId, name, email, 1, now, now, username, 'admin']
        )

        await pool.query(
            'INSERT INTO account (id, "userId", "providerId", "accountId", password, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [randomUUID(), userId, 'credential', email, hash, now, now]
        )

        console.log("✅ Admin user created successfully!")
    } catch (error) {
        console.error("❌ Failed to create admin user:", error)
    } finally {
        await pool.end()
        process.exit()
    }
}

createAdmin() 