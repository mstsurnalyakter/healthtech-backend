# Prisma Setup Guide - HealthTech Backend

## ✅ Setup Complete

Your Prisma is now properly configured and tested.

## Database Configuration

- **Provider**: PostgreSQL
- **Connection**: `postgresql://postgres:postgres@localhost:5432/healthtech-db2`
- **Adapter**: `@prisma/adapter-pg` (PostgreSQL Driver Adapter)
- **Schema Location**: `prisma/schema.prisma`
- **Migrations**: `prisma/migrations/`

## What's Been Set Up

1. ✅ **Prisma Client** - Generated to `src/generated/prisma`
2. ✅ **Initial Migration** - User table with Role enum created
3. ✅ **Database Connection** - PostgreSQL database `healthtech-db2` created
4. ✅ **Environment Variables** - `.env` file configured
5. ✅ **Adapter Setup** - PrismaPg adapter configured for Node.js
6. ✅ **Prisma Instance** - Reusable client at `src/lib/prisma.ts`

## Key Files

- `prisma/schema.prisma` - Your database schema definition
- `prisma/migrations/` - Database migration history
- `src/lib/prisma.ts` - Prisma Client singleton for your app
- `.env` - Environment variables (DATABASE_URL, JWT_SECRET, etc.)
- `src/test-db.ts` - Test script for database operations

## Using Prisma in Your Code

```typescript
// In your services/controllers
import { prisma } from '@/lib/prisma'

// Example: Create a user
const user = await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashedPassword',
  },
})

// Example: Find users
const users = await prisma.user.findMany()

// Example: Update user
const updated = await prisma.user.update({
  where: { id: 'userId' },
  data: { role: 'DOCTOR' },
})

// Example: Delete user
await prisma.user.delete({
  where: { id: 'userId' },
})
```

## Available Commands

### Development
```bash
npm run dev          # Start development server
```

### Database Management
```bash
npx prisma studio           # Open Prisma Studio (GUI database viewer)
npx prisma migrate dev      # Create and apply a new migration
npx prisma migrate deploy   # Apply pending migrations (production)
npx prisma migrate reset    # Reset database (dev only!)
npx prisma db push         # Sync schema to database (rapid prototyping)
```

### Code Generation
```bash
npx prisma generate         # Regenerate Prisma Client
npx prisma validate         # Validate schema syntax
```

### Testing
```bash
npx tsx src/test-db.ts      # Run database connection tests
```

## Making Schema Changes

### Development Workflow
1. Edit `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name <descriptive_name>`
3. This creates a migration and applies it automatically
4. Prisma Client is regenerated automatically

Example:
```bash
npx prisma migrate dev --name add_doctor_specialization
```

## Migration Files

Migrations are version-controlled SQL files in `prisma/migrations/`:

```
prisma/migrations/
├── 20260131110021_init/
│   └── migration.sql
└── migration_lock.toml
```

Each migration file contains the SQL to move from one schema state to another.

## Prisma Studio

Open the database GUI in your browser:
```bash
npx prisma studio
```

This launches at `http://localhost:5555` by default.

## Environment Variables

Required in `.env`:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/healthtech-db2?schema=public"
NODE_ENV="development"
JWT_SECRET="your_jwt_secret_key_here"
JWT_EXPIRES_IN="7d"
SALT_ROUNDS=10
```

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx tsx src/test-db.ts

# Check migration status
npx prisma migrate status
```

### Schema Out of Sync
```bash
# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

### Regenerate Client
```bash
npx prisma generate
```

## Next Steps

1. Add more models to `prisma/schema.prisma`
2. Create migrations for each schema change
3. Import `{ prisma }` in your services
4. Build out your API endpoints

## Resources

- [Prisma Docs](https://www.prisma.io/docs/)
- [Prisma PostgreSQL Adapter](https://github.com/prisma/prisma/tree/main/packages/adapter-pg)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
