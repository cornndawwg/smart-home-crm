import React, { useState, useEffect, useMemo } from 'react';
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
  Avatar,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fab,
  InputAdornment,
  Tooltip,
  Tab,
  Tabs,
  Menu,
  TableSortLabel,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  FileDownload as FileDownloadIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { getProjectById, Project } from '../../utils/dataStorage';

interface Expense {
  id: string;
  date: string;
  description: string;
  category: 'Equipment' | 'Labor' | 'Materials' | 'Subcontractors' | 'Travel' | 'Permits' | 'Other';
  amount: number;
  vendor: string;
  receiptNumber?: string;
  approved: boolean;
  notes?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  
  // Dialog states
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [editExpenseOpen, setEditExpenseOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  
  // Menu states
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [expenseMenuAnchor, setExpenseMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string>('');
  
  // Filter states
  const [expenseFilter, setExpenseFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showApprovedOnly, setShowApprovedOnly] = useState(false);
  
  // Form states
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    description: '',
    category: 'Materials',
    amount: 0,
    vendor: '',
    receiptNumber: '',
    notes: '',
  });

  // Sample expenses data - in real app, this would come from the project data
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 'exp1',
      date: '2024-01-15',
      description: 'Smart Home Hub Installation',
      category: 'Equipment',
      amount: 1250.00,
      vendor: 'SmartTech Solutions',
      receiptNumber: 'STS-2024-001',
      approved: true,
      notes: 'Main control hub for automation system'
    },
    {
      id: 'exp2',
      date: '2024-01-18',
      description: 'Electrical Wiring Installation',
      category: 'Labor',
      amount: 2800.00,
      vendor: 'Elite Electrical',
      receiptNumber: 'EE-INV-445',
      approved: true,
      notes: 'Wiring for smart switches and outlets'
    },
    {
      id: 'exp3',
      date: '2024-01-20',
      description: 'Smart Lighting System',
      category: 'Equipment',
      amount: 1850.00,
      vendor: 'Illumination Pro',
      receiptNumber: 'IP-2024-078',
      approved: false,
      notes: 'LED smart bulbs and dimmer switches'
    },
    {
      id: 'exp4',
      date: '2024-01-22',
      description: 'Security Camera Installation',
      category: 'Subcontractors',
      amount: 3200.00,
      vendor: 'SecureView Systems',
      receiptNumber: 'SVS-445-2024',
      approved: true,
      notes: '8-camera security system installation'
    },
  ]);

  // Load project data
  useEffect(() => {
    const loadProject = async () => {
      if (!id || typeof id !== 'string') return;
      
      setLoading(true);
      setError(null);
      
      try {
        const projectData = getProjectById(id);
        if (projectData) {
          setProject(projectData);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError('Error loading project');
        console.error('Error loading project:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  // Financial calculations
  const financialMetrics = useMemo(() => {
    if (!project || !expenses) return null;

    const contractAmount = project.projectData?.contractAmount || 0;
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const approvedExpenses = expenses.filter(exp => exp.approved).reduce((sum, exp) => sum + exp.amount, 0);
    const pendingExpenses = expenses.filter(exp => !exp.approved).reduce((sum, exp) => sum + exp.amount, 0);
    
    const grossProfit = contractAmount - approvedExpenses;
    const projectedProfit = contractAmount - totalExpenses;
    const profitMargin = contractAmount > 0 ? (grossProfit / contractAmount) * 100 : 0;
    const projectedMargin = contractAmount > 0 ? (projectedProfit / contractAmount) * 100 : 0;

    // Category breakdown
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>);

    return {
      contractAmount,
      totalExpenses,
      approvedExpenses,
      pendingExpenses,
      grossProfit,
      projectedProfit,
      profitMargin,
      projectedMargin,
      categoryTotals,
    };
  }, [project, expenses]);

  // Filtered expenses
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesFilter = expenseFilter === 'All' || expense.category === expenseFilter;
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expense.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesApproval = !showApprovedOnly || expense.approved;
      
      return matchesFilter && matchesSearch && matchesApproval;
    });
  }, [expenses, expenseFilter, searchTerm, showApprovedOnly]);

  const handleAddExpense = () => {
    const expense: Expense = {
      id: `exp${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: newExpense.description || '',
      category: newExpense.category as Expense['category'],
      amount: newExpense.amount || 0,
      vendor: newExpense.vendor || '',
      receiptNumber: newExpense.receiptNumber,
      approved: false,
      notes: newExpense.notes,
    };
    
    setExpenses([...expenses, expense]);
    setNewExpense({
      description: '',
      category: 'Materials',
      amount: 0,
      vendor: '',
      receiptNumber: '',
      notes: '',
    });
    setAddExpenseOpen(false);
  };

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(expenses.filter(exp => exp.id !== expenseId));
    setExpenseMenuAnchor(null);
  };

  const handleApproveExpense = (expenseId: string) => {
    setExpenses(expenses.map(exp => 
      exp.id === expenseId ? { ...exp, approved: !exp.approved } : exp
    ));
    setExpenseMenuAnchor(null);
  };

  const formatCurrency = (amount: number) => `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'primary';
      case 'Completed': return 'success';
      case 'Planning': return 'info';
      case 'On Hold': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Equipment': '#1976d2',
      'Labor': '#388e3c',
      'Materials': '#f57c00',
      'Subcontractors': '#7b1fa2',
      'Travel': '#0288d1',
      'Permits': '#5d4037',
      'Other': '#616161'
    };
    return colors[category] || '#616161';
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">
          {error || 'Project not found'}
        </Alert>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/projects')}
          sx={{ mt: 2 }}
        >
          Back to Projects
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={NextLink} href="/" color="inherit" underline="hover">
          Dashboard
        </Link>
        <Link component={NextLink} href="/projects" color="inherit" underline="hover">
          Projects
        </Link>
        <Typography color="text.primary">{project.name}</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={() => router.push('/projects')} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {project.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {project.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip
                  label={project.status}
                  size="small"
                  color={getStatusColor(project.status) as any}
                />
                <Chip
                  label={`${project.priority} Priority`}
                  size="small"
                  color={getPriorityColor(project.priority) as any}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setEditProjectOpen(true)}>
            Edit Project
          </Button>
          <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Financial Summary Cards */}
      {financialMetrics && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.main', color: 'white' }}>
              <MoneyIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5">
                {formatCurrency(financialMetrics.contractAmount)}
              </Typography>
              <Typography variant="body2">
                Contract Value
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.main', color: 'white' }}>
              <TrendingUpIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5">
                {formatCurrency(financialMetrics.approvedExpenses)}
              </Typography>
              <Typography variant="body2">
                Approved Expenses
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2, bgcolor: financialMetrics.grossProfit >= 0 ? 'success.main' : 'error.main', color: 'white' }}>
              <AssignmentIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5">
                {formatCurrency(financialMetrics.grossProfit)}
              </Typography>
              <Typography variant="body2">
                Current Profit ({financialMetrics.profitMargin.toFixed(1)}%)
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2, bgcolor: financialMetrics.pendingExpenses > 0 ? 'info.main' : 'success.main', color: 'white' }}>
              <WarningIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5">
                {formatCurrency(financialMetrics.pendingExpenses)}
              </Typography>
              <Typography variant="body2">
                Pending Approval
              </Typography>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Progress Bar */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6">Project Progress</Typography>
          <Typography variant="h6" color="primary">
            {project.progress}%
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={project.progress} 
          sx={{ height: 12, borderRadius: 6 }}
          color={project.progress === 100 ? 'success' : 'primary'}
        />
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Overview" />
          <Tab label="Expense Tracking" />
          <Tab label="Financial Analysis" />
          <Tab label="Team & Tasks" />
        </Tabs>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Project Details
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Customer</Typography>
                  <Typography variant="body1">{project.customer}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationIcon sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Property</Typography>
                  <Typography variant="body1">{project.property}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarIcon sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Timeline</Typography>
                  <Typography variant="body1">{project.startDate} - {project.endDate}</Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Budget Breakdown
              </Typography>
              {financialMetrics && Object.entries(financialMetrics.categoryTotals).map(([category, amount]) => (
                <Box key={category} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        bgcolor: getCategoryColor(category),
                        mr: 1 
                      }} 
                    />
                    <Typography variant="body2">{category}</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="bold">
                    {formatCurrency(amount)}
                  </Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </TabPanel>

        {/* Expense Tracking Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Expense Ledger</Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setAddExpenseOpen(true)}
            >
              Add Expense
            </Button>
          </Box>

          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              size="small"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={expenseFilter}
                label="Category"
                onChange={(e) => setExpenseFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Equipment">Equipment</MenuItem>
                <MenuItem value="Labor">Labor</MenuItem>
                <MenuItem value="Materials">Materials</MenuItem>
                <MenuItem value="Subcontractors">Subcontractors</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Permits">Permits</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch 
                  checked={showApprovedOnly}
                  onChange={(e) => setShowApprovedOnly(e.target.checked)}
                />
              }
              label="Approved Only"
            />
          </Box>

          {/* Expense Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{expense.description}</Typography>
                        {expense.receiptNumber && (
                          <Typography variant="caption" color="text.secondary">
                            Receipt: {expense.receiptNumber}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        size="small" 
                        label={expense.category}
                        sx={{ bgcolor: getCategoryColor(expense.category), color: 'white' }}
                      />
                    </TableCell>
                    <TableCell>{expense.vendor}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{formatCurrency(expense.amount)}</TableCell>
                    <TableCell>
                      <Chip 
                        size="small" 
                        label={expense.approved ? 'Approved' : 'Pending'}
                        color={expense.approved ? 'success' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          setSelectedExpenseId(expense.id);
                          setExpenseMenuAnchor(e.currentTarget);
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

          {/* Expense Summary */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Paper sx={{ p: 2, minWidth: 300 }}>
              <Typography variant="h6" gutterBottom>Expense Summary</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Total Expenses:</Typography>
                <Typography fontWeight="bold">{formatCurrency(filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0))}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Approved:</Typography>
                <Typography color="success.main" fontWeight="bold">
                  {formatCurrency(filteredExpenses.filter(exp => exp.approved).reduce((sum, exp) => sum + exp.amount, 0))}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Pending:</Typography>
                <Typography color="warning.main" fontWeight="bold">
                  {formatCurrency(filteredExpenses.filter(exp => !exp.approved).reduce((sum, exp) => sum + exp.amount, 0))}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </TabPanel>

        {/* Financial Analysis Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Financial Performance
          </Typography>
          
          {financialMetrics && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>Profit Analysis</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Current Profit Margin</Typography>
                    <Typography variant="h4" color={financialMetrics.profitMargin >= 0 ? 'success.main' : 'error.main'}>
                      {financialMetrics.profitMargin.toFixed(1)}%
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Projected Margin (with pending)</Typography>
                    <Typography variant="h5" color={financialMetrics.projectedMargin >= 0 ? 'success.main' : 'error.main'}>
                      {financialMetrics.projectedMargin.toFixed(1)}%
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Revenue:</Typography>
                    <Typography fontWeight="bold">{formatCurrency(financialMetrics.contractAmount)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Current Costs:</Typography>
                    <Typography fontWeight="bold">{formatCurrency(financialMetrics.approvedExpenses)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Projected Costs:</Typography>
                    <Typography fontWeight="bold">{formatCurrency(financialMetrics.totalExpenses)}</Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>Cost Breakdown</Typography>
                  {Object.entries(financialMetrics.categoryTotals).map(([category, amount]) => {
                    const percentage = (amount / financialMetrics.totalExpenses) * 100;
                    return (
                      <Box key={category} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">{category}</Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {formatCurrency(amount)} ({percentage.toFixed(1)}%)
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={percentage} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: getCategoryColor(category)
                            }
                          }}
                        />
                      </Box>
                    );
                  })}
                </Paper>
              </Grid>
            </Grid>
          )}
        </TabPanel>

        {/* Team & Tasks Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Team Members</Typography>
              <List>
                {project.team.map((member, index) => (
                  <ListItem key={index}>
                    <Avatar sx={{ mr: 2 }}>
                      {member.charAt(0).toUpperCase()}
                    </Avatar>
                    <ListItemText primary={member} secondary="Team Member" />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Project Tasks</Typography>
              <List>
                {project.tasks.map((task, index) => (
                  <ListItem key={index} divider={index < project.tasks.length - 1}>
                    <ListItemIcon>
                      {task.status === 'Completed' ? (
                        <CheckCircleIcon color="success" />
                      ) : task.status === 'In Progress' ? (
                        <ScheduleIcon color="primary" />
                      ) : (
                        <WarningIcon color="warning" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={task.name}
                      secondary={`Status: ${task.status}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Add Expense Dialog */}
      <Dialog open={addExpenseOpen} onClose={() => setAddExpenseOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newExpense.category}
                  label="Category"
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as Expense['category'] })}
                >
                  <MenuItem value="Equipment">Equipment</MenuItem>
                  <MenuItem value="Labor">Labor</MenuItem>
                  <MenuItem value="Materials">Materials</MenuItem>
                  <MenuItem value="Subcontractors">Subcontractors</MenuItem>
                  <MenuItem value="Travel">Travel</MenuItem>
                  <MenuItem value="Permits">Permits</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vendor"
                value={newExpense.vendor}
                onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Receipt Number"
                value={newExpense.receiptNumber}
                onChange={(e) => setNewExpense({ ...newExpense, receiptNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={newExpense.notes}
                onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddExpenseOpen(false)}>Cancel</Button>
          <Button onClick={handleAddExpense} variant="contained">Add Expense</Button>
        </DialogActions>
      </Dialog>

      {/* Expense Menu */}
      <Menu
        anchorEl={expenseMenuAnchor}
        open={Boolean(expenseMenuAnchor)}
        onClose={() => setExpenseMenuAnchor(null)}
      >
        <MenuItem onClick={() => handleApproveExpense(selectedExpenseId)}>
          <CheckCircleIcon sx={{ mr: 2 }} />
          {expenses.find(exp => exp.id === selectedExpenseId)?.approved ? 'Unapprove' : 'Approve'}
        </MenuItem>
        <MenuItem onClick={() => setEditExpenseOpen(true)}>
          <EditIcon sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDeleteExpense(selectedExpenseId)} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Project Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => setEditProjectOpen(true)}>
          <EditIcon sx={{ mr: 2 }} />
          Edit Project
        </MenuItem>
        <MenuItem>
          <FileDownloadIcon sx={{ mr: 2 }} />
          Export Report
        </MenuItem>
        <MenuItem>
          <CheckCircleIcon sx={{ mr: 2 }} />
          Mark Complete
        </MenuItem>
      </Menu>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add expense"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setAddExpenseOpen(true)}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
} 