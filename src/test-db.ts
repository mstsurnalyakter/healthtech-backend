import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import pg from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set')
}

const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter,
  log: ['warn', 'error'],
})

async function main() {
  try {
    console.log('🔗 Testing database connection...')
    
    // Test the connection
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection successful!')
    
    // Test creating a user
    console.log('\n📝 Testing user creation...')
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        password: 'hashed_password',
      },
    })
    console.log('✅ User created:', user)
    
    // Test reading users
    console.log('\n📖 Testing user retrieval...')
    const allUsers = await prisma.user.findMany()
    console.log(`✅ Found ${allUsers.length} user(s)`)
    
    // Clean up test data
    await prisma.user.delete({
      where: { id: user.id },
    })
    console.log('\n✅ Test data cleaned up')
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    console.log('\n✅ All tests passed!')
  }
}

main()
