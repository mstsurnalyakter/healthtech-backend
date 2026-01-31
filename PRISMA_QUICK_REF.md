# 🚀 Prisma Quick Reference

## Import & Use

```typescript
import { prisma } from '@/lib/prisma'
```

## Common Operations

### Create
```typescript
const user = await prisma.user.create({
  data: {
    name: 'John',
    email: 'john@example.com',
    password: 'hash',
  },
})
```

### Read
```typescript
// Find many
const users = await prisma.user.findMany()

// Find one
const user = await prisma.user.findUnique({
  where: { id: 'userId' },
})

// Find first
const user = await prisma.user.findFirst({
  where: { role: 'DOCTOR' },
})
```

### Update
```typescript
const user = await prisma.user.update({
  where: { id: 'userId' },
  data: { role: 'ADMIN' },
})
```

### Delete
```typescript
await prisma.user.delete({
  where: { id: 'userId' },
})
```

### Count
```typescript
const count = await prisma.user.count()
```

## Command Cheatsheet

| Command | What it does |
|---------|-------------|
| `npx prisma studio` | Open GUI database viewer |
| `npx prisma migrate dev --name <name>` | Create migration |
| `npx prisma migrate deploy` | Apply migrations (prod) |
| `npx prisma migrate reset --force` | Reset DB (deletes data) |
| `npx prisma generate` | Regenerate client |
| `npx prisma validate` | Check schema syntax |
| `npx prisma db pull` | Pull schema from DB |

## Schema Examples

### Add a Doctor Model
```prisma
model Doctor {
  id            String   @id @default(uuid())
  userId        String   @unique
  user          User     @relation(fields: [userId], references: [id])
  specialization String
  experience    Int
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

// Update User model to add relation:
model User {
  // ... existing fields
  doctor        Doctor?
}
```

Then run:
```bash
npx prisma migrate dev --name add_doctor_model
```

## Environment Setup

See `.env` for:
- `DATABASE_URL` - Connection string
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - Authentication key
- Other configs

## Need Help?

- See `PRISMA_SETUP.md` for detailed guide
- See `SETUP_COMPLETE.md` for what was done
- Check `prisma/migrations/` for history
- Run `npx prisma --help` for all commands

---

**Status:** ✅ Ready to use  
**Database:** PostgreSQL (healthtech-db2)  
**Last verified:** 2026-01-31
