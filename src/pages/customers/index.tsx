import React, { useState } from 'react';
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
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Star as StarIcon,
  Assignment as ProjectIcon,
  Home as PropertyIcon,
  TrendingUp as TrendingUpIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  Schedule as ScheduleIcon,
  RequestQuote as RequestQuoteIcon,
  Reviews as ReviewsIcon,
  Share as ReferralIcon,
  Build as BuildIcon,
  Timeline as TimelineIcon,
  MonetizationOn as MoneyIcon,
  Settings as SettingsIcon,
  Campaign as CampaignIcon,
  ThumbUp as ThumbUpIcon,
  EventAvailable as EventIcon,
  AttachMoney as AttachMoneyIcon,
  ContactSupport as ContactIcon,
} from '@mui/icons-material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import RevenueAnalytics from '../../components/RevenueAnalytics';

// Enhanced mock past clients data (completed projects only)
const mockPastClients = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    company: null,
    title: 'Homeowner',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    address: '1234 Oak Street, Beverly Hills, CA 90210',
    projectStatus: 'Completed',
    customerType: 'Individual',
    lifetimeValue: '$85,500',
    projectsCompleted: 2,
    totalSystemsInstalled: 1,
    lastContact: '2024-01-15',
    lastContactMethod: 'Email Follow-up',
    projectCompletionDate: '2023-11-15',
    installAnniversary: '2023-08-15',
    referralSource: 'Industry Partner - Interior Designer',
    referralsGenerated: 2,
    referralRevenue: '$43,000',
    warrantyStatus: 'Active (2 years remaining)',
    maintenanceSchedule: '2024-03-15',
    expansionOpportunity: 'High - Interested in outdoor automation',
    communicationPreference: 'Email',
    tags: ['Premium Client', 'Referral Source', 'Expansion Ready'],
    notes: 'Installed complete Control4 system. Very satisfied, generated 2 referrals.',
    systemBrands: ['Control4', 'Lutron', 'Ring'],
    serviceLevel: 'Premium Maintenance',
    nextMaintenanceDue: '2024-02-15',
    satisfactionScore: 9.5,
    lastReviewDate: '2023-12-01',
    googleReviewStatus: 'Submitted 5-star review'
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Chen',
    company: 'Chen Family',
    title: 'Homeowner',
    email: 'm.chen@email.com',
    phone: '(555) 234-5678',
    address: '5678 Pine Avenue, Manhattan Beach, CA 90266',
    projectStatus: 'Completed',
    customerType: 'Individual',
    lifetimeValue: '$62,300',
    projectsCompleted: 1,
    totalSystemsInstalled: 1,
    lastContact: '2024-01-14',
    lastContactMethod: 'Phone Call',
    projectCompletionDate: '2023-12-20',
    installAnniversary: '2023-12-20',
    referralSource: 'Google Search',
    referralsGenerated: 1,
    referralRevenue: '$28,500',
    warrantyStatus: 'Active (2.8 years remaining)',
    maintenanceSchedule: '2024-06-20',
    expansionOpportunity: 'Medium - Pool automation interest',
    communicationPreference: 'Text Message',
    tags: ['Energy Efficient', 'Tech Savvy', 'Recent Install'],
    notes: 'Modern family system with Ecobee and smart lighting. Very tech-oriented.',
    systemBrands: ['Ecobee', 'Philips Hue', 'Sonos'],
    serviceLevel: 'Standard Maintenance',
    nextMaintenanceDue: '2024-03-20',
    satisfactionScore: 9.2,
    lastReviewDate: '2024-01-05',
    googleReviewStatus: 'Pending request'
  },
  {
    id: 3,
    firstName: 'Jennifer',
    lastName: 'Martinez',
    company: 'Riverside Business Park',
    title: 'Facilities Manager',
    email: 'j.martinez@rbpark.com',
    phone: '(555) 345-6789',
    address: '9012 Business Blvd, Newport Beach, CA 92660',
    projectStatus: 'Completed',
    customerType: 'Business',
    lifetimeValue: '$145,800',
    projectsCompleted: 1,
    totalSystemsInstalled: 1,
    lastContact: '2024-01-10',
    lastContactMethod: 'In-person Meeting',
    projectCompletionDate: '2023-09-30',
    installAnniversary: '2023-06-15',
    referralSource: 'Direct Marketing Campaign',
    referralsGenerated: 0,
    referralRevenue: '$0',
    warrantyStatus: 'Active (1.5 years remaining)',
    maintenanceSchedule: '2024-02-20',
    expansionOpportunity: 'High - Additional building automation',
    communicationPreference: 'Email + Phone',
    tags: ['Commercial', 'High Value', 'Expansion Potential'],
    notes: 'Office automation system. Considering expansion to second building.',
    systemBrands: ['Crestron', 'Honeywell', 'Cisco'],
    serviceLevel: 'Commercial Maintenance',
    nextMaintenanceDue: '2024-02-20',
    satisfactionScore: 8.8,
    lastReviewDate: '2023-10-15',
    googleReviewStatus: 'Submitted 4-star review'
  },
  {
    id: 4,
    firstName: 'Robert',
    lastName: 'Williams',
    company: null,
    title: 'Retiree',
    email: 'r.williams@email.com',
    phone: '(555) 456-7890',
    address: '3456 Elder Lane, Santa Monica, CA 90401',
    projectStatus: 'Completed',
    customerType: 'Individual',
    lifetimeValue: '$34,200',
    projectsCompleted: 1,
    totalSystemsInstalled: 1,
    lastContact: '2024-01-12',
    lastContactMethod: 'Service Visit',
    projectCompletionDate: '2023-07-20',
    installAnniversary: '2023-07-20',
    referralSource: 'Client Referral - Sarah Johnson',
    referralsGenerated: 0,
    referralRevenue: '$0',
    warrantyStatus: 'Active (2.3 years remaining)',
    maintenanceSchedule: '2024-07-20',
    expansionOpportunity: 'Low - Complete system',
    communicationPreference: 'Phone',
    tags: ['Senior Client', 'Security Focused', 'Maintenance Client'],
    notes: 'Security-focused installation. Referred by Sarah Johnson.',
    systemBrands: ['Ring', 'Honeywell'],
    serviceLevel: 'Basic Maintenance',
    nextMaintenanceDue: '2024-04-20',
    satisfactionScore: 9.8,
    lastReviewDate: '2023-08-15',
    googleReviewStatus: 'Not requested (prefers phone)'
  },
  {
    id: 5,
    firstName: 'Amanda',
    lastName: 'Davis',
    company: 'Davis Construction',
    title: 'Business Owner',
    email: 'a.davis@davisconstruction.com',
    phone: '(555) 567-8901',
    address: '7890 University Drive, Irvine, CA 92612',
    projectStatus: 'Completed',
    customerType: 'Business',
    lifetimeValue: '$78,900',
    projectsCompleted: 2,
    totalSystemsInstalled: 2,
    lastContact: '2024-01-11',
    lastContactMethod: 'Email',
    projectCompletionDate: '2023-10-15',
    installAnniversary: '2023-05-10',
    referralSource: 'Industry Partner - Real Estate Agent',
    referralsGenerated: 3,
    referralRevenue: '$95,400',
    warrantyStatus: 'Active (1.8 years remaining)',
    maintenanceSchedule: '2024-05-10',
    expansionOpportunity: 'Medium - Home office expansion',
    communicationPreference: 'Email',
    tags: ['Business Owner', 'Multiple Projects', 'Top Referrer'],
    notes: 'Office + home systems. Excellent referral source for other contractors.',
    systemBrands: ['Ring', 'Nest', 'TP-Link'],
    serviceLevel: 'Premium Maintenance',
    nextMaintenanceDue: '2024-02-10',
    satisfactionScore: 9.7,
    lastReviewDate: '2023-11-01',
    googleReviewStatus: 'Submitted 5-star review'
  },
  {
    id: 6,
    firstName: 'David',
    lastName: 'Thompson',
    company: 'Thompson Properties',
    title: 'Property Investor',
    email: 'd.thompson@thompsonprop.com',
    phone: '(555) 678-9012',
    address: '1111 Investment Blvd, Riverside, CA 92506',
    projectStatus: 'Completed',
    customerType: 'Business',
    lifetimeValue: '$125,600',
    projectsCompleted: 3,
    totalSystemsInstalled: 3,
    lastContact: '2023-12-15',
    lastContactMethod: 'Text Message',
    projectCompletionDate: '2023-08-30',
    installAnniversary: '2022-03-15',
    referralSource: 'Industry Partner - Contractor',
    referralsGenerated: 1,
    referralRevenue: '$18,900',
    warrantyStatus: 'Expired (eligible for extended warranty)',
    maintenanceSchedule: 'On-demand',
    expansionOpportunity: 'High - Additional rental properties',
    communicationPreference: 'Text',
    tags: ['Investment Properties', 'Multiple Projects', 'Warranty Renewal'],
    notes: 'Rental property systems. Interested in more properties but price-sensitive.',
    systemBrands: ['ADT', 'Basic Security'],
    serviceLevel: 'Basic Maintenance',
    nextMaintenanceDue: 'Overdue',
    satisfactionScore: 7.8,
    lastReviewDate: '2023-09-15',
    googleReviewStatus: 'No review'
  }
];

export default function CustomersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [newCustomerDialog, setNewCustomerDialog] = useState(false);
  const [revenueAnalyticsOpen, setRevenueAnalyticsOpen] = useState(false);

  // Helper functions for status filtering
  const isMaintenanceDue = (customer: any) => {
    if (customer.nextMaintenanceDue === 'Overdue') return true;
    
    // Check if maintenance is due within next 30 days
    if (customer.nextMaintenanceDue && customer.nextMaintenanceDue !== 'Overdue') {
      try {
        const maintenanceDate = new Date(customer.nextMaintenanceDue);
        const today = new Date();
        const daysUntilMaintenance = Math.ceil((maintenanceDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
        return daysUntilMaintenance <= 30 && daysUntilMaintenance >= 0;
      } catch (e) {
        return false;
      }
    }
    return false;
  };

  const isWarrantyExpired = (customer: any) => {
    return customer.warrantyStatus.toLowerCase().includes('expired');
  };

  // Filter customers based on search and filters
  const filteredCustomers = mockPastClients.filter(customer => {
    const matchesSearch = 
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.company && customer.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Updated status filtering logic
    let matchesStatus = true;
    if (statusFilter === 'Maintenance Due') {
      matchesStatus = isMaintenanceDue(customer);
    } else if (statusFilter === 'Warranty Expired') {
      matchesStatus = isWarrantyExpired(customer);
    }
    // 'All' and other values show all customers
    
    const matchesType = typeFilter === 'All' || customer.customerType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, customer: any) => {
    setMenuAnchor(event.currentTarget);
    setSelectedCustomer(customer);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedCustomer(null);
  };

  const getSatisfactionColor = (score: number) => {
    if (score >= 9.0) return 'success';
    if (score >= 8.0) return 'warning';
    return 'error';
  };

  const getPastClientStats = () => {
    const total = mockPastClients.length;
    const totalRevenue = mockPastClients.reduce((sum, c) => {
      const value = parseFloat(c.lifetimeValue.replace(/[$,]/g, ''));
      return sum + value;
    }, 0);
    const totalReferralRevenue = mockPastClients.reduce((sum, c) => {
      const value = parseFloat(c.referralRevenue.replace(/[$,]/g, ''));
      return sum + value;
    }, 0);
    const avgSatisfaction = mockPastClients.reduce((sum, c) => sum + c.satisfactionScore, 0) / mockPastClients.length;
    
    return { 
      total, 
      totalRevenue: `$${totalRevenue.toLocaleString()}`, 
      totalReferralRevenue: `$${totalReferralRevenue.toLocaleString()}`,
      avgSatisfaction: avgSatisfaction.toFixed(1)
    };
  };

  const stats = getPastClientStats();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={NextLink} href="/" color="inherit" underline="hover">
          Dashboard
        </Link>
        <Typography color="text.primary">Past Clients</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Past Client Relationship Management
            <Chip 
              label={`${filteredCustomers.length} clients`} 
              size="small" 
              color="primary" 
              sx={{ ml: 2 }} 
            />
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage relationships and maximize revenue from completed projects
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Button
              variant={viewMode === 'card' ? 'contained' : 'text'}
              startIcon={<ViewModuleIcon />}
              onClick={() => setViewMode('card')}
              size="small"
              sx={{ borderRadius: '4px 0 0 4px' }}
            >
              Cards
            </Button>
            <Button
              variant={viewMode === 'list' ? 'contained' : 'text'}
              startIcon={<ViewListIcon />}
              onClick={() => setViewMode('list')}
              size="small"
              sx={{ borderRadius: '0 4px 4px 0' }}
            >
              List
            </Button>
          </Box>
          <Button 
            variant="outlined" 
            startIcon={<FilterIcon />}
            onClick={() => setRevenueAnalyticsOpen(true)}
          >
            Revenue Analytics
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setNewCustomerDialog(true)}
            size="large"
          >
            Add Past Client
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" color="primary">
                    {stats.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Past Clients
                  </Typography>
                </Box>
                <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" color="success.main">
                    {stats.totalRevenue}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                </Box>
                <AttachMoneyIcon sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" color="info.main">
                    {stats.totalReferralRevenue}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Referral Revenue
                  </Typography>
                </Box>
                <ReferralIcon sx={{ fontSize: 40, color: 'info.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" color="warning.main">
                    {stats.avgSatisfaction}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg. Satisfaction
                  </Typography>
                </Box>
                <StarIcon sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="All">All Clients</MenuItem>
                <MenuItem value="Maintenance Due">Maintenance Due (30 days)</MenuItem>
                <MenuItem value="Warranty Expired">Warranty Expired</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={typeFilter}
                label="Type"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="All">All Types</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Individual">Individual</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Customer Cards or List View */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">
            Clients ({filteredCustomers.length})
          </Typography>
        </Box>
        
        {viewMode === 'card' ? (
          // Card View
          <Grid container spacing={3} sx={{ p: 3 }}>
            {filteredCustomers.map((customer) => (
              <Grid item xs={12} md={6} lg={4} key={customer.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { 
                      elevation: 4,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s'
                    }
                  }}
                  onClick={() => router.push(`/customers/${customer.id}`)}
                >
                  <CardContent>
                    {/* Customer Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: customer.customerType === 'Business' ? 'primary.main' : 'secondary.main',
                            mr: 2 
                          }}
                        >
                          {customer.customerType === 'Business' ? <BusinessIcon /> : <PersonIcon />}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">
                            {customer.firstName} {customer.lastName}
                          </Typography>
                          {customer.company && (
                            <Typography variant="body2" color="text.secondary">
                              {customer.title} at {customer.company}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuOpen(e, customer);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    {/* Status and Satisfaction */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Chip
                        label={`${customer.satisfactionScore}/10 Satisfaction`}
                        size="small"
                        color={getSatisfactionColor(customer.satisfactionScore) as any}
                        icon={<StarIcon />}
                      />
                      {customer.referralsGenerated > 0 && (
                        <Chip
                          label={`${customer.referralsGenerated} Referrals`}
                          size="small"
                          color="info"
                          icon={<ReferralIcon />}
                        />
                      )}
                    </Box>

                    {/* Contact Info */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <EmailIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{customer.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <PhoneIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{customer.phone}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" noWrap>{customer.address}</Typography>
                      </Box>
                    </Box>

                    {/* Revenue & Referral Stats */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="primary">
                          {customer.lifetimeValue}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Lifetime Value
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="success.main">
                          {customer.referralRevenue}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Referral Revenue
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="info.main">
                          {customer.projectsCompleted}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Projects
                        </Typography>
                      </Box>
                    </Box>

                    {/* Smart Home System Info */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>Installed:</strong> {customer.installAnniversary} • <strong>Source:</strong> {customer.referralSource.split(' - ')[0]}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>Brands:</strong> {customer.systemBrands.slice(0, 2).join(', ')}
                        {customer.systemBrands.length > 2 && ` +${customer.systemBrands.length - 2} more`}
                      </Typography>
                      <Typography variant="body2" color={customer.warrantyStatus.includes('Active') ? 'success.main' : 'warning.main'}>
                        <strong>Warranty:</strong> {customer.warrantyStatus}
                      </Typography>
                    </Box>

                    {/* Quick Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ReferralIcon />}
                        sx={{ flex: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle referral request
                        }}
                      >
                        Request Referral
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ReviewsIcon />}
                        sx={{ flex: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle review request
                        }}
                      >
                        Request Review
                      </Button>
                    </Box>

                    {/* Tags and Communication Preference */}
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                      {customer.tags.slice(0, 2).map((tag, index) => (
                        <Chip key={index} label={tag} size="small" variant="outlined" />
                      ))}
                      {customer.tags.length > 2 && (
                        <Chip label={`+${customer.tags.length - 2}`} size="small" variant="outlined" />
                      )}
                    </Box>

                    {/* Last Contact & Next Action */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Last: {customer.lastContact} ({customer.lastContactMethod})
                      </Typography>
                      <Typography variant="caption" color={customer.nextMaintenanceDue === 'Overdue' ? 'error.main' : 'success.main'} sx={{ fontWeight: 'medium' }}>
                        Next maintenance: {customer.nextMaintenanceDue}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          // List/Table View
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Contact Info</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell align="right">Lifetime Value</TableCell>
                  <TableCell align="right">Referral Revenue</TableCell>
                  <TableCell>Last Contact</TableCell>
                  <TableCell>Next Maintenance</TableCell>
                  <TableCell>Warranty Status</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow 
                    key={customer.id}
                    hover
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'action.hover' }
                    }}
                    onClick={() => router.push(`/customers/${customer.id}`)}
                  >
                    {/* Client Column */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: customer.customerType === 'Business' ? 'primary.main' : 'secondary.main',
                            mr: 2,
                            width: 32,
                            height: 32
                          }}
                        >
                          {customer.customerType === 'Business' ? <BusinessIcon fontSize="small" /> : <PersonIcon fontSize="small" />}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {customer.firstName} {customer.lastName}
                          </Typography>
                          {customer.company && (
                            <Typography variant="caption" color="text.secondary">
                              {customer.title} at {customer.company}
                            </Typography>
                          )}
                          <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                            <Chip
                              label={`${customer.satisfactionScore}/10`}
                              size="small"
                              color={getSatisfactionColor(customer.satisfactionScore) as any}
                            />
                            {customer.referralsGenerated > 0 && (
                              <Chip
                                label={`${customer.referralsGenerated} ref`}
                                size="small"
                                color="info"
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Contact Info Column */}
                    <TableCell>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <EmailIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2">{customer.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PhoneIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2">{customer.phone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Address Column */}
                    <TableCell>
                      <Typography variant="body2">{customer.address}</Typography>
                    </TableCell>

                    {/* Lifetime Value Column */}
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {customer.lifetimeValue}
                      </Typography>
                    </TableCell>

                    {/* Referral Revenue Column */}
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="bold" color="success.main">
                        {customer.referralRevenue}
                      </Typography>
                    </TableCell>

                    {/* Last Contact Column */}
                    <TableCell>
                      <Typography variant="body2">{customer.lastContact}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        ({customer.lastContactMethod})
                      </Typography>
                    </TableCell>

                    {/* Next Maintenance Column */}
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        color={customer.nextMaintenanceDue === 'Overdue' ? 'error.main' : 'text.primary'}
                        fontWeight={customer.nextMaintenanceDue === 'Overdue' ? 'bold' : 'normal'}
                      >
                        {customer.nextMaintenanceDue}
                      </Typography>
                    </TableCell>

                    {/* Warranty Status Column */}
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        color={customer.warrantyStatus.includes('Active') ? 'success.main' : 'warning.main'}
                      >
                        {customer.warrantyStatus}
                      </Typography>
                    </TableCell>

                    {/* Source Column */}
                    <TableCell>
                      <Typography variant="body2">
                        {customer.referralSource.split(' - ')[0]}
                      </Typography>
                    </TableCell>

                    {/* Actions Column */}
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Button
                          variant="text"
                          size="small"
                          startIcon={<ReferralIcon />}
                          sx={{ minWidth: 'auto', px: 1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle referral request
                          }}
                        >
                          Referral
                        </Button>
                        <Button
                          variant="text"
                          size="small"
                          startIcon={<ReviewsIcon />}
                          sx={{ minWidth: 'auto', px: 1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle review request
                          }}
                        >
                          Review
                        </Button>
                        <IconButton 
                          size="small" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenuOpen(e, customer);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          router.push(`/customers/${selectedCustomer?.id}`);
          handleMenuClose();
        }}>
          <ViewIcon sx={{ mr: 1 }} />
          View Client Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ReferralIcon sx={{ mr: 1 }} />
          Request Referral
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ReviewsIcon sx={{ mr: 1 }} />
          Request Google Review
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ScheduleIcon sx={{ mr: 1 }} />
          Schedule Maintenance
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <BuildIcon sx={{ mr: 1 }} />
          System Expansion Quote
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ContactIcon sx={{ mr: 1 }} />
          Update Contact Info
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Archive Client
        </MenuItem>
      </Menu>

      {/* New Customer Dialog */}
      <Dialog open={newCustomerDialog} onClose={() => setNewCustomerDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create a new client record in your CRM system.
          </Typography>
          {/* Add form fields here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewCustomerDialog(false)}>Cancel</Button>
          <Button variant="contained">Add Client</Button>
        </DialogActions>
      </Dialog>

      {/* Revenue Analytics Dialog */}
      <RevenueAnalytics
        open={revenueAnalyticsOpen}
        onClose={() => setRevenueAnalyticsOpen(false)}
        clientData={filteredCustomers}
      />
    </Container>
  );
} 