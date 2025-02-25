# cc36staffapp

Internal application for managing applicants and participant data for ComCamp 36

## Development Setup

1. Install dependencies

```bash
pnpm i
```

2. Start the dev database

```bash
docker compose -f compose-db.yml up -d
```

3. Set up .env 

```
# S3 Credentials for Supabase storage
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_REGION=
S3_ENDPOINT=
S3_BUCKET=

# Connection String for Live DB on Supabase
DATABASE_URL=

# Better-Auth Settings
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3037

# Dev db settings 
STAFFAPP_POSTGRES_PASSWORD=password
STAFFAPP_POSTGRES_HOST=localhost
```

You can use `pnpm dlx @better-auth/cli secret` to generate `BETTER_AUTH_SECRET`

4. Run migration for better-auth (IMPORTANT: DON'T TOUCH ANYTHING RELATED TO DRIZZLE! ITS CONNECTED TO LIVE DB ON SUPABASE!)

```bash
pnpm dlx @better-auth/cli migrate
```

5. Create Admin account using `pnpm create-admin <email> <username> <password> [name]`

Example: 
```bash
pnpm create-admin anyemail@example.com username password example name
```

6. Go to `http://localhost:3037` and login with credentials you just created.