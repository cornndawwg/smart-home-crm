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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
  Fab,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileDownload as DownloadIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useApi } from '../../hooks/useApi';
import { getApiUrl } from '../../lib/api';

interface Proposal {
  id: string;
  name: string;
  description: string;
  customerPersona: string;
  status: string;
  totalAmount: number;
  validUntil: string | null;
  createdAt: string;
  isExistingCustomer: boolean;
  customer?: {
    firstName: string;
    lastName: string;
    company?: string;
  };
  prospectName?: string;
  prospectCompany?: string;
  prospectEmail?: string;
  prospectPhone?: string;
  prospectStatus?: string;
  items: {
    name: string;
    quantity: number;
    totalPrice: number;
  }[];
}

export default function ProposalsPage() {
  const router = useRouter();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const { get: fetchProposals } = useApi<{ proposals: Proposal[] }>({
    onSuccess: (data) => {
      setProposals(data.proposals || []);
      setLoading(false);
    },
    onError: (error) => {
      setError(`Failed to load proposals: ${error.message}`);
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchProposals(getApiUrl('/api/proposals'));
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, proposal: Proposal) => {
    setMenuAnchor(event.currentTarget);
    setSelectedProposal(proposal);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedProposal(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'default';
      case 'sent': return 'primary';
      case 'viewed': return 'info';
      case 'accepted': return 'success';
      case 'rejected': return 'error';
      case 'expired': return 'warning';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading proposals...
          </Typography>
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
          <Typography color="text.primary">Proposals</Typography>
        </Breadcrumbs>
        
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Smart Proposals
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage AI-powered proposals with voice input and intelligent pricing.
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            component={NextLink}
            href="/proposals/create"
          >
            Create Proposal
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Proposals
              </Typography>
              <Typography variant="h4">
                {proposals.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Value
              </Typography>
              <Typography variant="h4">
                {formatCurrency(proposals.reduce((sum, p) => sum + p.totalAmount, 0))}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Accepted
              </Typography>
              <Typography variant="h4">
                {proposals.filter(p => p.status === 'accepted').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4">
                {proposals.filter(p => ['sent', 'viewed'].includes(p.status)).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Proposals Table */}
      <Paper>
        {proposals.length === 0 ? (
          <Box p={6} textAlign="center">
            <AssessmentIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No proposals yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Create your first smart proposal with voice input and AI-powered product recommendations.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              component={NextLink}
              href="/proposals/create"
            >
              Create Your First Proposal
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Proposal</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Persona</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Valid Until</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proposals.map((proposal) => (
                  <TableRow 
                    key={proposal.id} 
                    hover 
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                    onClick={() => router.push(`/proposals/${proposal.id}`)}
                  >
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {proposal.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {proposal.items.length} items
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {proposal.customer ? 
                            `${proposal.customer.firstName} ${proposal.customer.lastName}` : 
                            (proposal.prospectName || 'Unknown Prospect')
                          }
                        </Typography>
                        {(proposal.customer?.company || proposal.prospectCompany) && (
                          <Typography variant="caption" color="text.secondary">
                            {proposal.customer?.company || proposal.prospectCompany}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {proposal.customerPersona}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={proposal.status.toUpperCase()}
                        color={getStatusColor(proposal.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="medium">
                        {formatCurrency(proposal.totalAmount)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(proposal.createdAt)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {proposal.validUntil ? (
                        <Typography variant="body2">
                          {formatDate(proposal.validUntil)}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No expiry
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuOpen(e, proposal);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          if (selectedProposal) {
            router.push(`/proposals/${selectedProposal.id}`);
          }
          handleMenuClose();
        }}>
          <ViewIcon sx={{ mr: 1 }} fontSize="small" />
          View Details
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedProposal) {
            router.push(`/proposals/${selectedProposal.id}/edit`);
          }
          handleMenuClose();
        }}>
          <EditIcon sx={{ mr: 1 }} fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
          // TODO: Implement download functionality
          handleMenuClose();
        }}>
          <DownloadIcon sx={{ mr: 1 }} fontSize="small" />
          Download PDF
        </MenuItem>
        <MenuItem onClick={() => {
          // TODO: Implement delete functionality
          handleMenuClose();
        }}>
          <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
          Delete
        </MenuItem>
      </Menu>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add proposal"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        component={NextLink}
        href="/proposals/create"
      >
        <AddIcon />
      </Fab>
    </Container>
  );
} 