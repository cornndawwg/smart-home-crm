const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /api/customers?summary=true - Dashboard statistics
// GET /api/customers - List all customers with search/filter
// GET /api/customers/:id - Get specific customer
// POST /api/customers - Create new customer
// PUT /api/customers/:id - Update customer
// DELETE /api/customers/:id - Delete customer

router.get('/', async (req, res) => {
  try {
    const { summary, search, type, status, page = 1, limit = 20 } = req.query;

    // Handle dashboard summary request
    if (summary === 'true') {
      const [
        totalCustomers,
        activeCustomers,
        recentProjects,
        completedProjects
      ] = await Promise.all([
        prisma.customer.count(),
        prisma.customer.count({ where: { status: 'active' } }),
        prisma.project.count({ where: { status: 'in-progress' } }),
        prisma.project.count({ where: { status: 'completed' } })
      ]);

      return res.json({
        totalCustomers,
        activeCustomers,
        recentProjects,
        completedProjects
      });
    }

    // Handle regular customer list request
    const where = {};
    
    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { company: { contains: search } }
      ];
    }
    
    if (type) where.type = type;
    if (status) where.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: {
          properties: true,
          projects: true,
          billingAddress: true,
          tags: true,
          metrics: true
        },
        skip,
        take: parseInt(limit),
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.customer.count({ where })
    ]);

    res.json({
      customers,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ 
      error: 'Failed to fetch customers',
      details: error.message 
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        properties: {
          include: {
            address: true,
            photos: true,
            documents: true,
            systems: true,
            serviceHistory: true,
            projects: true
          }
        },
        projects: {
          include: {
            milestones: true,
            budget: {
              include: {
                lineItems: true
              }
            },
            teamMembers: {
              include: {
                teamMember: true
              }
            },
            documents: true
          }
        },
        interactions: true,
        billingAddress: true,
        tags: true,
        metrics: true
      }
    });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ 
      error: 'Failed to fetch customer',
      details: error.message 
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const customerData = req.body;
    
    const customer = await prisma.customer.create({
      data: {
        ...customerData,
        billingAddress: customerData.billingAddress ? {
          create: customerData.billingAddress
        } : undefined,
        tags: customerData.tags ? {
          create: customerData.tags.map(tag => ({ name: tag }))
        } : undefined
      },
      include: {
        billingAddress: true,
        tags: true,
        properties: true,
        projects: true
      }
    });

    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ 
      error: 'Failed to create customer',
      details: error.message 
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customerData = req.body;
    
    const customer = await prisma.customer.update({
      where: { id },
      data: {
        ...customerData,
        billingAddress: customerData.billingAddress ? {
          upsert: {
            create: customerData.billingAddress,
            update: customerData.billingAddress
          }
        } : undefined
      },
      include: {
        billingAddress: true,
        tags: true,
        properties: true,
        projects: true
      }
    });

    res.json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ 
      error: 'Failed to update customer',
      details: error.message 
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.customer.delete({
      where: { id }
    });

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ 
      error: 'Failed to delete customer',
      details: error.message 
    });
  }
});

module.exports = router; 