import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import pg from 'pg'
import { config } from '../config/index.js'

const connectionString = config.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required')
}

const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({
  adapter,
  log: config.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// Handle shutdown gracefully
process.on('SIGINT', async () => {
  console.log('Disconnecting Prisma Client...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('Disconnecting Prisma Client...')
  await prisma.$disconnect()
  process.exit(0)
})

export default prisma
