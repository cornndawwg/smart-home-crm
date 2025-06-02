const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /api/properties - List all properties with search/filter
// GET /api/properties/:id - Get specific property

router.get('/', async (req, res) => {
  try {
    const { search, type, customerId, page = 1, limit = 50 } = req.query;

    const where = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { type: { contains: search } },
        { customer: {
          firstName: { contains: search },
          lastName: { contains: search },
          company: { contains: search }
        }}
      ];
    }
    
    if (type) where.type = type;
    if (customerId) where.customerId = customerId;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          customer: {
            select: {
              firstName: true,
              lastName: true,
              company: true
            }
          },
          address: true
        },
        skip,
        take: parseInt(limit),
        orderBy: { name: 'asc' }
      }),
      prisma.property.count({ where })
    ]);

    res.json({
      properties,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ 
      error: 'Failed to fetch properties',
      details: error.message 
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            company: true,
            email: true,
            phone: true
          }
        },
        address: true,
        photos: true,
        documents: true,
        systems: true,
        serviceHistory: true,
        projects: true
      }
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ 
      error: 'Failed to fetch property',
      details: error.message 
    });
  }
});

module.exports = router; 