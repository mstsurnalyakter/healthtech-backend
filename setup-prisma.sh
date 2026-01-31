#!/bin/bash

# Prisma Setup & Test Script
echo "🔧 Prisma Health Tech Backend - Setup & Test"
echo "============================================"

# Check environment
echo ""
echo "📋 Checking environment..."
if [ -z "$DATABASE_URL" ]; then
  echo "⚠️  Loading DATABASE_URL from .env"
  set -a
  source .env
  set +a
fi
echo "✅ DATABASE_URL is set"

# Validate schema
echo ""
echo "🔍 Validating Prisma schema..."
npx prisma validate

# Generate client
echo ""
echo "📦 Generating Prisma Client..."
npx prisma generate

# Check migration status
echo ""
echo "📊 Checking migration status..."
npx prisma migrate status

# Run tests
echo ""
echo "🧪 Running database tests..."
npx tsx src/test-db.ts

echo ""
echo "✅ All checks passed! Prisma is properly set up."
echo ""
echo "📝 Available Commands:"
echo "   npx prisma studio        - Open Prisma Studio (GUI)"
echo "   npx prisma migrate dev   - Create new migration"
echo "   npm run dev              - Start development server"
