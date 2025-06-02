import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Breadcrumbs,
  Link,
  Chip,
  IconButton,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  AttachMoney as MoneyIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon,
  Inventory as InventoryIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useApi } from '../../hooks/useApi';
import { getApiUrl } from '../../lib/api';

// TypeScript interfaces
interface ProposalPersona {
  id: string;
  type: string;
  name: string;
  displayName: string;
  description: string;
  keyFeatures: string | string[];
  recommendedTier: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  model: string;
  sku: string;
  basePrice: number;
  specifications: any;
  compatibility: string;
  installation: string;
}

interface ProposalItem {
  id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productId?: string;
  product?: Product;
  sortOrder: number;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  type: string;
}

interface Property {
  id: string;
  name: string;
  type: string;
  squareFootage: number;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface Proposal {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired';
  customerPersona: string;
  pricingTier: 'good' | 'better' | 'best';
  totalAmount: number;
  validUntil?: string;
  voiceTranscript?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  customer: Customer;
  property?: Property;
  items: ProposalItem[];
}

const STATUS_COLORS = {
  draft: 'default',
  sent: 'primary',
  viewed: 'info',
  accepted: 'success',
  rejected: 'error',
  expired: 'warning'
} as const;

const PRICING_TIERS = {
  good: { label: 'Good', color: 'success', description: 'Essential features at competitive price' },
  better: { label: 'Better', color: 'primary', description: 'Enhanced features with professional service' },
  best: { label: 'Best', color: 'error', description: 'Premium features with white-glove service' }
} as const;

export default function ProposalDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // State management
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // API hooks
  const { get: fetchProposal } = useApi<Proposal>({
    onSuccess: (data) => {
      setProposal(data);
      setLoading(false);
    },
    onError: (error) => {
      setError(`Failed to load proposal: ${error.message}`);
      setLoading(false);
    }
  });

  const { delete: deleteProposal } = useApi<any>({
    onSuccess: () => {
      setSuccess('Proposal deleted successfully');
      setTimeout(() => router.push('/proposals'), 2000);
    },
    onError: (error) => {
      setError(`Failed to delete proposal: ${error.message}`);
      setDeleting(false);
    }
  });

  // Load proposal data
  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchProposal(getApiUrl(`/api/proposals/${id}`));
    }
  }, [id]);

  // Calculate totals
  const totals = React.useMemo(() => {
    if (!proposal) return { subtotal: 0, tax: 0, total: 0 };
    
    const subtotal = proposal.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    return { subtotal, tax, total };
  }, [proposal]);

  // Parse key features for persona
  const getKeyFeatures = (keyFeatures: string | string[] | undefined): string[] => {
    if (!keyFeatures) return [];
    
    try {
      if (typeof keyFeatures === 'string') {
        return JSON.parse(keyFeatures);
      } else if (Array.isArray(keyFeatures)) {
        return keyFeatures;
      }
    } catch (error) {
      console.error('Error parsing keyFeatures:', error);
    }
    
    return [];
  };

  const handleDelete = async () => {
    if (!proposal) return;
    
    setDeleting(true);
    await deleteProposal(getApiUrl(`/api/proposals/${proposal.id}`));
    setDeleteDialogOpen(false);
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!proposal) return;
    
    // TODO: Implement status update API call
    console.log('Update status to:', newStatus);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading proposal...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!proposal) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Alert severity="error">
            Proposal not found or you don't have permission to view it.
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box mb={3}>
        <Breadcrumbs separator="/" sx={{ mb: 2 }}>
          <Link component={NextLink} href="/" color="inherit">
            Dashboard
          </Link>
          <Link component={NextLink} href="/proposals" color="inherit">
            Proposals
          </Link>
          <Typography color="text.primary">{proposal.name}</Typography>
        </Breadcrumbs>
        
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {proposal.name}
            </Typography>
            <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
              <Chip
                label={proposal.status.toUpperCase()}
                color={STATUS_COLORS[proposal.status] as any}
                size="medium"
              />
              <Chip
                label={PRICING_TIERS[proposal.pricingTier].label}
                color={PRICING_TIERS[proposal.pricingTier].color as any}
                variant="outlined"
                size="medium"
              />
              <Typography variant="body2" color="text.secondary">
                Created {new Date(proposal.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" gap={1}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push('/proposals')}
              variant="outlined"
            >
              Back to Proposals
            </Button>
            <Button
              startIcon={<EditIcon />}
              onClick={() => router.push(`/proposals/${proposal.id}/edit`)}
              variant="outlined"
              color="primary"
            >
              Edit
            </Button>
            <Button
              startIcon={<ShareIcon />}
              variant="outlined"
              color="primary"
            >
              Share
            </Button>
            <Button
              startIcon={<DownloadIcon />}
              variant="outlined"
              color="primary"
            >
              Export PDF
            </Button>
            <IconButton
              color="error"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          {/* Proposal Description */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
              <DescriptionIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Proposal Description</Typography>
            </Box>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              {proposal.description || 'No description provided.'}
            </Typography>

            {proposal.voiceTranscript && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Voice Notes:
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="body2" fontStyle="italic">
                    "{proposal.voiceTranscript}"
                  </Typography>
                </Paper>
              </Box>
            )}
          </Paper>

          {/* Proposal Items */}
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
              <Box display="flex" alignItems="center">
                <InventoryIcon sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Proposal Items ({proposal.items.length})
                </Typography>
              </Box>
              <Typography variant="h6" color="primary">
                Total: ${totals.total.toFixed(2)}
              </Typography>
            </Box>

            {proposal.items.length === 0 ? (
              <Box textAlign="center" py={4}>
                <InventoryIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  No items in this proposal
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="right">Unit Price</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {proposal.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {item.name}
                            </Typography>
                            {item.description && (
                              <Typography variant="caption" color="text.secondary">
                                {item.description}
                              </Typography>
                            )}
                            <Box mt={0.5}>
                              <Chip label={item.category} size="small" />
                              {item.product && (
                                <Chip 
                                  label={item.product.brand} 
                                  size="small" 
                                  variant="outlined" 
                                  sx={{ ml: 0.5 }}
                                />
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {item.quantity}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            ${item.unitPrice.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight="medium">
                            ${item.totalPrice.toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {/* Totals */}
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Typography variant="body2">Subtotal:</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">${totals.subtotal.toFixed(2)}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Typography variant="body2">Tax (8%):</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">${totals.tax.toFixed(2)}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Typography variant="h6">Total:</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6" color="primary">
                          ${totals.total.toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* Customer Information */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
              <PersonIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Customer Information</Typography>
            </Box>
            
            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
              <Avatar sx={{ mr: 2 }}>
                {proposal.customer.firstName.charAt(0)}{proposal.customer.lastName.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  {proposal.customer.firstName} {proposal.customer.lastName}
                </Typography>
                {proposal.customer.company && (
                  <Typography variant="body2" color="text.secondary">
                    {proposal.customer.company}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
              <EmailIcon sx={{ mr: 1, fontSize: 16 }} />
              <Typography variant="body2">{proposal.customer.email}</Typography>
            </Box>

            {proposal.customer.phone && (
              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <PhoneIcon sx={{ mr: 1, fontSize: 16 }} />
                <Typography variant="body2">{proposal.customer.phone}</Typography>
              </Box>
            )}

            <Chip
              label={proposal.customer.type.toUpperCase()}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mt: 1 }}
            />
          </Paper>

          {/* Property Information */}
          {proposal.property && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <HomeIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Property Information</Typography>
              </Box>
              
              <Typography variant="body1" fontWeight="medium" sx={{ mb: 1 }}>
                {proposal.property.name}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {proposal.property.type} • {proposal.property.squareFootage.toLocaleString()} sq ft
              </Typography>

              {proposal.property.address && (
                <Typography variant="body2" color="text.secondary">
                  {proposal.property.address.street}<br />
                  {proposal.property.address.city}, {proposal.property.address.state} {proposal.property.address.zipCode}
                </Typography>
              )}
            </Paper>
          )}

          {/* Persona & Pricing */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Customer Persona & Pricing
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Customer Persona:</Typography>
              <Typography variant="body1" fontWeight="medium">
                {proposal.customerPersona}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Pricing Tier:</Typography>
              <Chip
                label={PRICING_TIERS[proposal.pricingTier].label}
                color={PRICING_TIERS[proposal.pricingTier].color as any}
                sx={{ mt: 0.5 }}
              />
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                {PRICING_TIERS[proposal.pricingTier].description}
              </Typography>
            </Box>
          </Paper>

          {/* Proposal Status & Actions */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Proposal Status
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Current Status:
              </Typography>
              <Chip
                label={proposal.status.toUpperCase()}
                color={STATUS_COLORS[proposal.status] as any}
                sx={{ mb: 2 }}
              />
            </Box>

            {proposal.validUntil && (
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <CalendarIcon sx={{ mr: 1, fontSize: 16 }} />
                <Typography variant="body2">
                  Valid until: {new Date(proposal.validUntil).toLocaleDateString()}
                </Typography>
              </Box>
            )}

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Last updated: {new Date(proposal.updatedAt).toLocaleDateString()}
            </Typography>

            <Box display="flex" flexDirection="column" gap={1}>
              {proposal.status === 'draft' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStatusUpdate('sent')}
                >
                  Send to Customer
                </Button>
              )}
              
              {proposal.status === 'sent' && (
                <>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleStatusUpdate('accepted')}
                  >
                    Mark as Accepted
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleStatusUpdate('rejected')}
                  >
                    Mark as Rejected
                  </Button>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Proposal</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this proposal? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={16} /> : <DeleteIcon />}
          >
            {deleting ? 'Deleting...' : 'Delete Proposal'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar notifications */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(null)} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
} 