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
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Badge,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Star as StarIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { getCustomers, getProjects, Customer, Project } from '../../utils/dataStorage';

// Sample mock customers for demonstration
const mockCustomers: Customer[] = [
  {
    id: 'cust_mock_001',
    name: 'Sarah Mitchell',
    company: 'Mitchell Consulting Group',
    phone: '(555) 234-5678',
    email: 'sarah@mitchellconsulting.com',
    address: '123 Business Park Drive, Tech City, TC 12345',
    vipStatus: true,
    lifetimeValue: 185000,
    projectHistory: ['proj_mock_001'],
    source: 'Referral',
    addedDate: '2023-08-15',
    lastContact: '2024-01-10',
    completedProjects: 2,
    referralRevenue: 45000,
    satisfaction: 9.2,
  },
  {
    id: 'cust_mock_002',
    name: 'David Chen',
    company: 'Chen Family Trust',
    phone: '(555) 345-6789',
    email: 'david.chen.trust@email.com',
    address: '456 Luxury Lane, Premium Heights, PH 54321',
    vipStatus: false,
    lifetimeValue: 89000,
    projectHistory: ['proj_mock_002'],
    source: 'Online Marketing',
    addedDate: '2023-11-22',
    lastContact: '2023-12-15',
    completedProjects: 1,
    referralRevenue: 0,
    satisfaction: 8.5,
  },
  {
    id: 'cust_mock_003',
    name: 'Maria Rodriguez',
    company: 'Rodriguez Properties LLC',
    phone: '(555) 456-7890',
    email: 'maria@rodriguezproperties.com',
    address: '789 Investment Boulevard, Capital District, CD 67890',
    vipStatus: true,
    lifetimeValue: 320000,
    projectHistory: ['proj_mock_003', 'proj_mock_004'],
    source: 'Direct Business',
    addedDate: '2023-05-10',
    lastContact: '2024-01-08',
    completedProjects: 3,
    referralRevenue: 125000,
    satisfaction: 9.8,
  },
];

export default function CustomersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [vipFilter, setVipFilter] = useState('All');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  // Load customers and projects on component mount
  useEffect(() => {
    loadCustomers();
    loadProjects();
  }, []);

  const loadCustomers = () => {
    const storedCustomers = getCustomers();
    // Merge mock customers with stored customers (filter out duplicates)
    const combinedCustomers = [
      ...storedCustomers,
      ...mockCustomers.filter(mockCustomer => 
        !storedCustomers.some(stored => stored.id === mockCustomer.id)
      )
    ];
    setAllCustomers(combinedCustomers);
  };

  const loadProjects = () => {
    const projects = getProjects();
    setAllProjects(projects);
  };

  // Filter customers based on search and filters
  const filteredCustomers = allCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSource = sourceFilter === 'All' || customer.source === sourceFilter;
    const matchesVip = vipFilter === 'All' || 
      (vipFilter === 'VIP' && customer.vipStatus) ||
      (vipFilter === 'Regular' && !customer.vipStatus);
    
    return matchesSearch && matchesSource && matchesVip;
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, customer: Customer) => {
    setMenuAnchor(event.currentTarget);
    setSelectedCustomer(customer);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedCustomer(null);
  };

  const getCustomerProjects = (customer: Customer) => {
    return allProjects.filter(project => 
      customer.projectHistory.includes(project.id)
    );
  };

  const getCustomerStats = () => {
    const total = allCustomers.length;
    const vipCustomers = allCustomers.filter(c => c.vipStatus).length;
    const totalLifetimeValue = allCustomers.reduce((sum, c) => sum + c.lifetimeValue, 0);
    const avgSatisfaction = allCustomers.length > 0 
      ? allCustomers.reduce((sum, c) => sum + c.satisfaction, 0) / allCustomers.length 
      : 0;
    
    return { total, vipCustomers, totalLifetimeValue, avgSatisfaction };
  };

  const stats = getCustomerStats();

  const getCustomerInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={NextLink} href="/" color="inherit" underline="hover">
          Dashboard
        </Link>
        <Typography color="text.primary">Customers</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Customer Management
            <Chip 
              label={`${filteredCustomers.length} customers`} 
              size="small" 
              color="primary" 
              sx={{ ml: 2 }} 
            />
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage relationships with smart home clients
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<FilterIcon />}>
            Advanced Filters
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            size="large"
          >
            Add Customer
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
                    Total Customers
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
                  <Typography variant="h4" color="warning.main">
                    {stats.vipCustomers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    VIP Customers
                  </Typography>
                </Box>
                <Badge badgeContent="VIP" color="warning">
                  <StarIcon sx={{ fontSize: 40, color: 'warning.main' }} />
                </Badge>
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
                    ${(stats.totalLifetimeValue / 1000).toFixed(0)}K
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lifetime Value
                  </Typography>
                </Box>
                <MoneyIcon sx={{ fontSize: 40, color: 'success.main' }} />
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
                    {stats.avgSatisfaction.toFixed(1)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Satisfaction
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ fontSize: 40, color: 'info.main' }} />
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
              placeholder="Search customers..."
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
              <InputLabel>Source</InputLabel>
              <Select
                value={sourceFilter}
                label="Source"
                onChange={(e) => setSourceFilter(e.target.value)}
              >
                <MenuItem value="All">All Sources</MenuItem>
                <MenuItem value="Referral">Referral</MenuItem>
                <MenuItem value="Online Marketing">Online Marketing</MenuItem>
                <MenuItem value="Direct Business">Direct Business</MenuItem>
                <MenuItem value="Social Media">Social Media</MenuItem>
                <MenuItem value="Trade Show">Trade Show</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Customer Type</InputLabel>
              <Select
                value={vipFilter}
                label="Customer Type"
                onChange={(e) => setVipFilter(e.target.value)}
              >
                <MenuItem value="All">All Customers</MenuItem>
                <MenuItem value="VIP">VIP Customers</MenuItem>
                <MenuItem value="Regular">Regular Customers</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Customer Cards */}
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">
            Customers ({filteredCustomers.length})
          </Typography>
        </Box>
        
        <Grid container spacing={3} sx={{ p: 3 }}>
          {filteredCustomers.map((customer) => {
            const customerProjects = getCustomerProjects(customer);
            
            return (
              <Grid item xs={12} lg={6} key={customer.id}>
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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                          {getCustomerInitials(customer.name)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {customer.name}
                            {customer.vipStatus && (
                              <Chip 
                                label="VIP" 
                                size="small" 
                                color="warning" 
                                sx={{ ml: 1 }}
                                icon={<StarIcon />}
                              />
                            )}
                          </Typography>
                          {customer.company && (
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {customer.company}
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

                    {/* Contact Information */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <EmailIcon fontSize="small" color="action" />
                        <Typography variant="body2">{customer.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <PhoneIcon fontSize="small" color="action" />
                        <Typography variant="body2">{customer.phone}</Typography>
                      </Box>
                      {customer.address && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationIcon fontSize="small" color="action" />
                          <Typography variant="body2" noWrap>
                            {customer.address}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Customer Metrics */}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" color="success.main">
                            ${(customer.lifetimeValue / 1000).toFixed(0)}K
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Lifetime Value
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" color="primary">
                            {customer.completedProjects}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Projects
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" color="warning.main">
                            {customer.satisfaction.toFixed(1)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Satisfaction
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Project History Preview */}
                    {customerProjects.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Recent Projects:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {customerProjects.slice(0, 2).map((project) => (
                            <Chip 
                              key={project.id}
                              label={project.name} 
                              size="small" 
                              variant="outlined"
                              color={project.status === 'Completed' ? 'success' : 'primary'}
                            />
                          ))}
                          {customerProjects.length > 2 && (
                            <Chip 
                              label={`+${customerProjects.length - 2}`} 
                              size="small" 
                              variant="outlined" 
                            />
                          )}
                        </Box>
                      </Box>
                    )}

                    {/* Source and Last Contact */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip 
                        label={customer.source} 
                        size="small" 
                        variant="outlined" 
                        color="info"
                      />
                      <Typography variant="caption" color="text.secondary">
                        Last contact: {customer.lastContact}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {filteredCustomers.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No customers found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm || sourceFilter !== 'All' || vipFilter !== 'All' 
                ? 'Try adjusting your search criteria or filters.'
                : 'Customers from completed projects will appear here automatically.'
              }
            </Typography>
          </Box>
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
          View Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon sx={{ mr: 1 }} />
          Edit Customer
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EmailIcon sx={{ mr: 1 }} />
          Send Email
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Remove Customer
        </MenuItem>
      </Menu>

      {/* Success Message */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
} 