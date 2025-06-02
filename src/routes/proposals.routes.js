const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /api/proposals?summary=true - Dashboard statistics
// GET /api/proposals - List all proposals with search/filter
// GET /api/proposals/:id - Get specific proposal
// POST /api/proposals - Create new proposal
// PUT /api/proposals/:id - Update proposal
// DELETE /api/proposals/:id - Delete proposal

router.get('/', async (req, res) => {
  try {
    const { summary, search, status, persona, tier, page = 1, limit = 20 } = req.query;

    // Handle dashboard summary request
    if (summary === 'true') {
      const [
        totalProposals,
        draftProposals,
        sentProposals,
        acceptedProposals,
        rejectedProposals,
        totalValue
      ] = await Promise.all([
        prisma.proposal.count(),
        prisma.proposal.count({ where: { status: 'draft' } }),
        prisma.proposal.count({ where: { status: 'sent' } }),
        prisma.proposal.count({ where: { status: 'accepted' } }),
        prisma.proposal.count({ where: { status: 'rejected' } }),
        prisma.proposal.aggregate({
          _sum: { totalAmount: true }
        })
      ]);

      return res.json({
        totalProposals,
        draftProposals,
        sentProposals,
        acceptedProposals,
        rejectedProposals,
        totalValue: totalValue._sum.totalAmount || 0
      });
    }

    // Handle regular proposal list request
    const where = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { customer: {
          OR: [
            { firstName: { contains: search } },
            { lastName: { contains: search } },
            { company: { contains: search } }
          ]
        }}
      ];
    }
    
    if (status) where.status = status;
    if (persona) where.customerPersona = persona;
    if (tier) where.pricingTier = tier;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [proposals, total] = await Promise.all([
      prisma.proposal.findMany({
        where,
        include: {
          customer: {
            select: {
              firstName: true,
              lastName: true,
              company: true,
              email: true
            }
          },
          property: {
            select: {
              name: true,
              type: true,
              squareFootage: true
            }
          },
          items: {
            include: {
              product: {
                select: {
                  name: true,
                  category: true,
                  brand: true
                }
              }
            }
          }
        },
        skip,
        take: parseInt(limit),
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.proposal.count({ where })
    ]);

    res.json({
      proposals,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({ 
      error: 'Failed to fetch proposals',
      details: error.message 
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            company: true,
            email: true,
            phone: true,
            type: true
          }
        },
        property: {
          select: {
            id: true,
            name: true,
            type: true,
            squareFootage: true,
            address: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                category: true,
                brand: true,
                model: true,
                sku: true,
                basePrice: true,
                goodTierPrice: true,
                betterTierPrice: true,
                bestTierPrice: true,
                specifications: true,
                compatibility: true,
                installation: true
              }
            }
          },
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    res.json(proposal);
  } catch (error) {
    console.error('Error fetching proposal:', error);
    res.status(500).json({ 
      error: 'Failed to fetch proposal',
      details: error.message 
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const proposalData = req.body;
    
    // Calculate total amount from items
    const subtotal = proposalData.items.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0
    );
    const tax = subtotal * 0.08; // 8% tax
    const totalAmount = subtotal + tax;
    
    const proposal = await prisma.proposal.create({
      data: {
        name: proposalData.name,
        description: proposalData.description,
        customerId: proposalData.customerId,
        propertyId: proposalData.propertyId || null,
        customerPersona: proposalData.customerPersona,
        pricingTier: proposalData.pricingTier,
        status: 'draft',
        totalAmount: totalAmount,
        validUntil: proposalData.validUntil ? new Date(proposalData.validUntil) : null,
        voiceTranscript: proposalData.voiceTranscript || null,
        createdBy: proposalData.createdBy || 'system',
        items: {
          create: proposalData.items.map((item, index) => ({
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice,
            productId: item.productId || null,
            sortOrder: index
          }))
        }
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            company: true,
            email: true
          }
        },
        property: {
          select: {
            name: true,
            type: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
                category: true,
                brand: true
              }
            }
          },
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    // Add calculated fields to response
    const response = {
      ...proposal,
      subtotal,
      tax
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating proposal:', error);
    res.status(500).json({ 
      error: 'Failed to create proposal',
      details: error.message 
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const proposalData = req.body;
    
    // Calculate total amount from items if provided
    let updateData = { ...proposalData };
    let subtotal = 0;
    let tax = 0;
    
    if (proposalData.items) {
      subtotal = proposalData.items.reduce((sum, item) => 
        sum + (item.quantity * item.unitPrice), 0
      );
      tax = subtotal * 0.08;
      updateData.totalAmount = subtotal + tax;
    }
    
    // Handle items update separately
    const { items, ...proposalUpdateData } = updateData;
    
    const proposal = await prisma.proposal.update({
      where: { id },
      data: {
        ...proposalUpdateData,
        validUntil: proposalUpdateData.validUntil ? new Date(proposalUpdateData.validUntil) : undefined,
        updatedAt: new Date()
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            company: true,
            email: true
          }
        },
        property: {
          select: {
            name: true,
            type: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
                category: true,
                brand: true
              }
            }
          },
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    // Calculate current subtotal and tax if not provided
    if (!proposalData.items) {
      subtotal = proposal.items.reduce((sum, item) => sum + item.totalPrice, 0);
      tax = subtotal * 0.08;
    }

    // Add calculated fields to response
    const response = {
      ...proposal,
      subtotal,
      tax
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating proposal:', error);
    res.status(500).json({ 
      error: 'Failed to update proposal',
      details: error.message 
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete proposal items first (due to foreign key constraints)
    await prisma.proposalItem.deleteMany({
      where: { proposalId: id }
    });
    
    // Delete the proposal
    await prisma.proposal.delete({
      where: { id }
    });

    res.json({ message: 'Proposal deleted successfully' });
  } catch (error) {
    console.error('Error deleting proposal:', error);
    res.status(500).json({ 
      error: 'Failed to delete proposal',
      details: error.message 
    });
  }
});

// Update proposal status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status',
        validStatuses 
      });
    }
    
    const proposal = await prisma.proposal.update({
      where: { id },
      data: { 
        status,
        updatedAt: new Date()
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            company: true
          }
        }
      }
    });

    res.json(proposal);
  } catch (error) {
    console.error('Error updating proposal status:', error);
    res.status(500).json({ 
      error: 'Failed to update proposal status',
      details: error.message 
    });
  }
});

module.exports = router; 