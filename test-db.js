const { PrismaClient } = require('./generated/prisma');

async function testDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Testing Smart Proposal System database...');
    
    // Check proposal personas
    const personasCount = await prisma.proposalPersona.count();
    console.log(`📝 Proposal Personas: ${personasCount}`);
    
    if (personasCount > 0) {
      const samplePersonas = await prisma.proposalPersona.findMany({
        take: 3,
        select: { displayName: true, type: true, recommendedTier: true }
      });
      console.log('Sample personas:', samplePersonas);
    }
    
    // Check products
    const productsCount = await prisma.product.count();
    console.log(`📦 Products: ${productsCount}`);
    
    if (productsCount > 0) {
      const sampleProducts = await prisma.product.findMany({
        take: 3,
        select: { name: true, category: true, basePrice: true }
      });
      console.log('Sample products:', sampleProducts);
    }
    
    // Check proposals
    const proposalsCount = await prisma.proposal.count();
    console.log(`📄 Proposals: ${proposalsCount}`);
    
    console.log('✅ Database test completed!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase(); 