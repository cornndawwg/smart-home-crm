import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Autocomplete,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Collapse,
  FormControlLabel,
  Switch,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Save as SaveIcon,
  Clear as ClearIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  Star as StarIcon,
  AttachMoney as MoneyIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  VolumeUp as VolumeUpIcon,
  Stop as StopIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
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
  keyFeatures: string | string[]; // Can be JSON string or array
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
  goodTierPrice?: number;
  betterTierPrice?: number;
  bestTierPrice?: number;
  specifications: any;
  compatibility: string;
  installation: string;
  price: number; // Calculated based on selected tier
}

interface ProposalItem {
  id?: string;
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
  type: string;
}

interface Property {
  id: string;
  name: string;
  type: string;
  squareFootage: number;
}

interface FormData {
  name: string;
  description: string;
  isExistingCustomer: boolean;
  customerId: string;
  prospectName: string;
  prospectCompany: string;
  prospectEmail: string;
  prospectPhone: string;
  propertyId?: string;
  projectType: 'residential' | 'commercial';
  customerPersona: string;
  validUntil?: string;
  voiceTranscript?: string;
  items: ProposalItem[];
}

interface VoiceToTextState {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
}

const PRODUCT_CATEGORIES = [
  'audio-video', 'lighting', 'security', 'networking', 'climate', 'access-control', 'other'
];

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
    SpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

export default function CreateProposalPage() {
  const router = useRouter();
  const { customerId, propertyId } = router.query;

  // State management
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    isExistingCustomer: true,
    customerId: (customerId as string) || '',
    prospectName: '',
    prospectCompany: '',
    prospectEmail: '',
    prospectPhone: '',
    propertyId: propertyId as string,
    projectType: 'residential',
    customerPersona: '',
    validUntil: '',
    voiceTranscript: '',
    items: []
  });

  const [personas, setPersonas] = useState<ProposalPersona[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<ProposalPersona | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const [productSearchResults, setProductSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    voiceInput: false,
    productSearch: true,
    selectedProducts: true
  });

  // Voice to Text state
  const [voiceState, setVoiceState] = useState<VoiceToTextState>({
    isListening: false,
    transcript: '',
    interimTranscript: '',
    error: null
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // API hooks
  const { get: fetchProposalPersonas } = useApi<{ personas: ProposalPersona[] }>({
    onSuccess: (data) => {
      console.log('✅ Personas loaded successfully:', data);
      setPersonas(data.personas);
    },
    onError: (error) => {
      console.error('❌ Failed to load personas:', error);
      setError(`Failed to load personas: ${error.message}`);
    }
  });

  const { get: fetchCustomers } = useApi<{ customers: Customer[] }>({
    onSuccess: (data) => {
      console.log('✅ Customers loaded successfully:', data);
      setCustomers(data.customers);
    },
    onError: (error) => {
      console.error('❌ Failed to load customers:', error);
      setError(`Failed to load customers: ${error.message}`);
    }
  });

  const { get: fetchProperties } = useApi<{ properties: Property[] }>({
    onSuccess: (data) => {
      console.log('✅ Properties loaded successfully:', data);
      setProperties(data.properties);
    },
    onError: (error) => {
      console.error('❌ Failed to load properties:', error);
      setError(`Failed to load properties: ${error.message}`);
    }
  });

  const { get: searchProducts } = useApi<{ products: Product[] }>({
    onSuccess: (data) => {
      console.log('🎯 Product search successful:', data);
      console.log(`📦 Found ${data.products?.length || 0} products:`, data.products);
      setProductSearchResults(data.products);
    },
    onError: (error) => {
      console.error('❌ Product search failed:', error);
      setError(`Failed to search products: ${error.message}`);
    }
  });

  const { post: createProposal } = useApi<any>({
    onSuccess: (data) => {
      setSuccess('Proposal created successfully!');
      setTimeout(() => router.push(`/proposals/${data.id}`), 2000);
    },
    onError: (error) => setError(`Failed to create proposal: ${error.message}`)
  });

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      console.log('🚀 Starting data initialization...');
      setLoading(true);
      setError(null);
      
      // Add timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        console.error('⏰ Data loading timeout after 10 seconds');
        setError('Loading timeout - please refresh the page');
        setLoading(false);
      }, 10000);

      try {
        console.log('📡 Making API calls...');
        const results = await Promise.allSettled([
          fetchProposalPersonas(getApiUrl('/api/proposal-personas')),
          fetchCustomers(getApiUrl('/api/customers')),
          fetchProperties(getApiUrl('/api/properties'))
        ]);

        // Check if any failed
        const failures = results.filter(result => result.status === 'rejected');
        if (failures.length > 0) {
          console.warn('⚠️ Some API calls failed:', failures);
          // Still allow the page to load with partial data
        }

        console.log('✅ Data initialization completed');
        clearTimeout(timeout);
      } catch (error) {
        console.error('💥 Critical error during initialization:', error);
        clearTimeout(timeout);
        setError('Failed to initialize data. Please refresh the page.');
      } finally {
        console.log('🏁 Setting loading to false');
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Initialize Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setVoiceState(prev => ({ ...prev, isListening: true, error: null }));
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setVoiceState(prev => ({
          ...prev,
          transcript: prev.transcript + finalTranscript,
          interimTranscript
        }));

        if (finalTranscript) {
          setFormData(prev => ({
            ...prev,
            voiceTranscript: prev.voiceTranscript + finalTranscript,
            description: prev.description + finalTranscript
          }));
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setVoiceState(prev => ({
          ...prev,
          error: `Speech recognition error: ${event.error}`,
          isListening: false
        }));
      };

      recognition.onend = () => {
        setVoiceState(prev => ({ ...prev, isListening: false }));
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Product search with debouncing
  useEffect(() => {
    console.log('🔍 Product search effect triggered:', { 
      productSearch: productSearch.trim(), 
      searchLength: productSearch.trim().length 
    });
    
    const timeoutId = setTimeout(() => {
      if (productSearch.trim()) {
        const searchUrl = getApiUrl(`/api/products?search=${productSearch}`);
        console.log('🚀 Making product search API call:', searchUrl);
        searchProducts(searchUrl);
      } else {
        console.log('🧹 Clearing search results (empty search)');
        setProductSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [productSearch]);

  // Calculate totals
  const totals = useMemo(() => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    return { subtotal, tax, total };
  }, [formData.items]);

  // Voice control functions
  const startListening = useCallback(() => {
    if (recognitionRef.current && !voiceState.isListening) {
      recognitionRef.current.start();
    }
  }, [voiceState.isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && voiceState.isListening) {
      recognitionRef.current.stop();
    }
  }, [voiceState.isListening]);

  const clearVoiceTranscript = useCallback(() => {
    setVoiceState(prev => ({ ...prev, transcript: '', interimTranscript: '' }));
    setFormData(prev => ({ ...prev, voiceTranscript: '' }));
  }, []);

  // Form handlers
  const handlePersonaChange = (personaName: string) => {
    const persona = personas.find(p => p.name === personaName);
    setSelectedPersona(persona || null);
    setFormData(prev => ({
      ...prev,
      customerPersona: personaName
    }));
  };

  const handleAddProduct = (product: Product) => {
    const newItem: ProposalItem = {
      name: product.name,
      description: product.description || '',
      category: product.category,
      quantity: 1,
      unitPrice: product.price,
      totalPrice: product.price,
      productId: product.id,
      product,
      sortOrder: formData.items.length
    };

    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const handleUpdateItem = (index: number, updates: Partial<ProposalItem>) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item, ...updates };
          updatedItem.totalPrice = updatedItem.quantity * updatedItem.unitPrice;
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const handleRemoveItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    // Validate based on customer type
    const isValidCustomer = formData.isExistingCustomer ? formData.customerId : (formData.prospectName && formData.prospectEmail);
    
    if (!formData.name || !isValidCustomer || !formData.customerPersona) {
      const missingFields = [];
      if (!formData.name) missingFields.push('Proposal Name');
      if (!isValidCustomer) {
        missingFields.push(formData.isExistingCustomer ? 'Customer Selection' : 'Prospect Name and Email');
      }
      if (!formData.customerPersona) missingFields.push('Customer Persona');
      
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setSaving(true);
    try {
      await createProposal(getApiUrl('/api/proposals'), {
        ...formData,
        createdBy: 'current-user', // TODO: Get from auth context
        validUntil: formData.validUntil ? new Date(formData.validUntil).toISOString() : null
      });
    } catch (error) {
      console.error('Failed to create proposal:', error);
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2, mt: 2 }}>
            Loading proposal data...
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This should only take a few seconds
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 3, maxWidth: 600 }}>
              <Box>
                <Typography variant="body2">{error}</Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  sx={{ mt: 1 }}
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </Box>
            </Alert>
          )}
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
          <Typography color="text.primary">Create Proposal</Typography>
        </Breadcrumbs>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Create Smart Proposal
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create intelligent proposals by selecting your project type, customer persona, and products. AI will suggest upsell opportunities and complementary products to maximize value.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Main Form */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            {/* Basic Information */}
            <Typography variant="h6" gutterBottom>
              Project Type & Basic Information
            </Typography>

            {/* Project Type Selection - Prominent at top */}
            <Box sx={{ mb: 4, p: 3, bgcolor: 'primary.50', borderRadius: 2, border: '2px solid', borderColor: 'primary.200' }}>
              <Typography variant="h6" gutterBottom color="primary">
                Select Project Type
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Choose the project type to see relevant customer personas and optimize your proposal
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={formData.projectType === 'residential' ? 8 : 1}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      border: formData.projectType === 'residential' ? '2px solid' : '1px solid',
                      borderColor: formData.projectType === 'residential' ? 'primary.main' : 'divider',
                      bgcolor: formData.projectType === 'residential' ? 'primary.50' : 'background.paper',
                      '&:hover': {
                        bgcolor: 'primary.50',
                        borderColor: 'primary.main'
                      }
                    }}
                    onClick={() => {
                      setFormData(prev => ({ 
                        ...prev, 
                        projectType: 'residential',
                        customerPersona: '' // Clear persona when changing type
                      }));
                      setSelectedPersona(null);
                    }}
                  >
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                      <HomeIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6" color="primary">
                        Residential
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Single-family homes, condos, apartments
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={formData.projectType === 'commercial' ? 8 : 1}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      border: formData.projectType === 'commercial' ? '2px solid' : '1px solid',
                      borderColor: formData.projectType === 'commercial' ? 'primary.main' : 'divider',
                      bgcolor: formData.projectType === 'commercial' ? 'primary.50' : 'background.paper',
                      '&:hover': {
                        bgcolor: 'primary.50',
                        borderColor: 'primary.main'
                      }
                    }}
                    onClick={() => {
                      setFormData(prev => ({ 
                        ...prev, 
                        projectType: 'commercial',
                        customerPersona: '' // Clear persona when changing type
                      }));
                      setSelectedPersona(null);
                    }}
                  >
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                      <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6" color="primary">
                        Commercial
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Offices, retail, hospitality, enterprise
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Proposal Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="e.g., Johnson Family Smart Home Automation"
                />
              </Grid>

              {/* Customer Status Selection */}
              <Grid item xs={12}>
                <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'grey.300' }}>
                  <Typography variant="h6" gutterBottom>
                    Customer Information
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isExistingCustomer}
                        onChange={(e) => {
                          setFormData(prev => ({ 
                            ...prev, 
                            isExistingCustomer: e.target.checked,
                            // Clear fields when switching
                            customerId: '',
                            prospectName: '',
                            prospectCompany: '',
                            prospectEmail: '',
                            prospectPhone: ''
                          }));
                        }}
                        color="primary"
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <PersonIcon sx={{ mr: 1 }} />
                        <Typography variant="body1">
                          {formData.isExistingCustomer ? 'Existing Customer' : 'New Prospect'}
                        </Typography>
                      </Box>
                    }
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                    {formData.isExistingCustomer 
                      ? 'Select from your existing customer database'
                      : 'Enter prospect information (will become customer after approval + payment)'
                    }
                  </Typography>

                  {formData.isExistingCustomer ? (
                    <FormControl fullWidth required>
                      <InputLabel>Select Customer</InputLabel>
                      <Select
                        value={formData.customerId}
                        label="Select Customer"
                        onChange={(e) => setFormData(prev => ({ ...prev, customerId: e.target.value }))}
                      >
                        {customers.map((customer) => (
                          <MenuItem key={customer.id} value={customer.id}>
                            <Box display="flex" alignItems="center">
                              <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
                                {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                              </Avatar>
                              {customer.firstName} {customer.lastName}
                              {customer.company && ` (${customer.company})`}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Contact Name"
                          value={formData.prospectName}
                          onChange={(e) => setFormData(prev => ({ ...prev, prospectName: e.target.value }))}
                          required={!formData.isExistingCustomer}
                          placeholder="John Doe"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Company/Organization"
                          value={formData.prospectCompany}
                          onChange={(e) => setFormData(prev => ({ ...prev, prospectCompany: e.target.value }))}
                          placeholder="Acme Corp (optional)"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          type="email"
                          value={formData.prospectEmail}
                          onChange={(e) => setFormData(prev => ({ ...prev, prospectEmail: e.target.value }))}
                          required={!formData.isExistingCustomer}
                          placeholder="john@acmecorp.com"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={formData.prospectPhone}
                          onChange={(e) => setFormData(prev => ({ ...prev, prospectPhone: e.target.value }))}
                          placeholder="(555) 123-4567"
                        />
                      </Grid>
                    </Grid>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Property</InputLabel>
                  <Select
                    value={formData.propertyId || ''}
                    label="Property"
                    onChange={(e) => setFormData(prev => ({ ...prev, propertyId: e.target.value }))}
                  >
                    <MenuItem value="">No specific property</MenuItem>
                    {properties.map((property) => (
                      <MenuItem key={property.id} value={property.id}>
                        {property.name} ({property.type}, {property.squareFootage} sq ft)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Customer Persona</InputLabel>
                  <Select
                    value={formData.customerPersona}
                    label="Customer Persona"
                    onChange={(e) => handlePersonaChange(e.target.value)}
                  >
                    {personas
                      .filter(persona => persona.type === formData.projectType)
                      .map((persona) => (
                      <MenuItem key={persona.id} value={persona.name}>
                        <Box>
                          <Box display="flex" alignItems="center">
                            {persona.type === 'residential' ? <HomeIcon sx={{ mr: 1 }} /> : <BusinessIcon sx={{ mr: 1 }} />}
                            {persona.displayName}
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {persona.description}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Valid Until"
                  value={formData.validUntil}
                  onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Voice Input Section */}
            <Box sx={{ mb: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h6">
                  Voice Input
                </Typography>
                <IconButton onClick={() => toggleSection('voiceInput')}>
                  {expandedSections.voiceInput ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              <Collapse in={expandedSections.voiceInput}>
                <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                    <Fab
                      color={voiceState.isListening ? "error" : "primary"}
                      size="medium"
                      onClick={voiceState.isListening ? stopListening : startListening}
                      disabled={!recognitionRef.current}
                    >
                      {voiceState.isListening ? <StopIcon /> : <MicIcon />}
                    </Fab>
                    
                    <Box flex={1}>
                      <Typography variant="body2" color="text.secondary">
                        {voiceState.isListening ? "Listening... Speak now" : "Click to start voice input"}
                      </Typography>
                      {voiceState.error && (
                        <Typography variant="caption" color="error">
                          {voiceState.error}
                        </Typography>
                      )}
                    </Box>

                    <Button
                      startIcon={<ClearIcon />}
                      onClick={clearVoiceTranscript}
                      disabled={!voiceState.transcript}
                      variant="outlined"
                      size="small"
                    >
                      Clear
                    </Button>
                  </Box>

                  {(voiceState.transcript || voiceState.interimTranscript) && (
                    <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="body2">
                        {voiceState.transcript}
                        <Typography component="span" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                          {voiceState.interimTranscript}
                        </Typography>
                      </Typography>
                    </Paper>
                  )}
                </Card>
              </Collapse>
            </Box>

            {/* Description Field */}
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Proposal Description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the proposed smart home solution..."
              sx={{ mb: 3 }}
            />

            <Divider sx={{ my: 3 }} />

            {/* Product Search Section */}
            <Box sx={{ mb: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h6">
                  Product Selection & AI Recommendations
                </Typography>
                <IconButton onClick={() => toggleSection('productSearch')}>
                  {expandedSections.productSearch ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              <Collapse in={expandedSections.productSearch}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>AI-Powered Suggestions:</strong> As you add products, our AI will identify complementary products and upsell opportunities to maximize project value.
                  </Typography>
                </Alert>
                
                <TextField
                  fullWidth
                  label="Search Products"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search by name, brand, or category..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                  sx={{ mb: 2 }}
                />

                {productSearchResults.length > 0 && (
                  <Card variant="outlined" sx={{ maxHeight: 400, overflow: 'auto' }}>
                    <List>
                      {productSearchResults.map((product) => (
                        <ListItem
                          key={product.id}
                          secondaryAction={
                            <Button
                              startIcon={<AddIcon />}
                              variant="outlined"
                              size="small"
                              onClick={() => handleAddProduct(product)}
                            >
                              Add
                            </Button>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <InventoryIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box display="flex" alignItems="center" gap={1}>
                                {product.name}
                                <Chip label={product.category} size="small" />
                                <Chip label={product.brand} size="small" variant="outlined" />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  {product.description}
                                </Typography>
                                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                                  ${product.price.toFixed(2)}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Card>
                )}
              </Collapse>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Selected Products */}
            <Box sx={{ mb: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h6">
                  Selected Products ({formData.items.length})
                </Typography>
                <IconButton onClick={() => toggleSection('selectedProducts')}>
                  {expandedSections.selectedProducts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              <Collapse in={expandedSections.selectedProducts}>
                {formData.items.length === 0 ? (
                  <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
                    <ShoppingCartIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      No products selected yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Search and add products above
                    </Typography>
                  </Paper>
                ) : (
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell align="center">Quantity</TableCell>
                          <TableCell align="right">Unit Price</TableCell>
                          <TableCell align="right">Total</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formData.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" fontWeight="medium">
                                  {item.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {item.description}
                                </Typography>
                                <Box mt={1}>
                                  <Chip label={item.category} size="small" />
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <TextField
                                size="small"
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleUpdateItem(index, { quantity: parseInt(e.target.value) || 1 })}
                                inputProps={{ min: 1, style: { textAlign: 'center' } }}
                                sx={{ width: 80 }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <TextField
                                size="small"
                                type="number"
                                value={item.unitPrice}
                                onChange={(e) => handleUpdateItem(index, { unitPrice: parseFloat(e.target.value) || 0 })}
                                inputProps={{ min: 0, step: 0.01 }}
                                InputProps={{
                                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                sx={{ width: 120 }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight="medium">
                                ${item.totalPrice.toFixed(2)}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleRemoveItem(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Collapse>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* Pricing Summary */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Proposal Summary
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body2">Subtotal:</Typography>
                <Typography variant="body2">${totals.subtotal.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body2">Tax (8%):</Typography>
                <Typography variant="body2">${totals.tax.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  ${totals.total.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                Final pricing will be discussed and customized during your face-to-face customer meeting.
              </Typography>
            </Alert>

            <Box display="flex" gap={2}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                onClick={handleSubmit}
                disabled={saving || !formData.name || !(formData.isExistingCustomer ? formData.customerId : (formData.prospectName && formData.prospectEmail)) || !formData.customerPersona}
              >
                {saving ? 'Creating...' : 'Create Proposal'}
              </Button>
            </Box>
          </Paper>

          {/* Selected Persona Info */}
          {selectedPersona && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Customer Persona
              </Typography>
              
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                {selectedPersona?.type === 'residential' ? <HomeIcon sx={{ mr: 1 }} /> : <BusinessIcon sx={{ mr: 1 }} />}
                <Typography variant="body1" fontWeight="medium">
                  {selectedPersona?.displayName || 'Unknown Persona'}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedPersona?.description || 'No description available'}
              </Typography>

              <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
                Key Features for this Persona:
              </Typography>
              <Box>
                {(() => {
                  // Defensive programming for keyFeatures
                  if (!selectedPersona?.keyFeatures) {
                    return (
                      <Chip
                        label="No key features available"
                        size="small"
                        color="default"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    );
                  }

                  let features: string[] = [];
                  
                  try {
                    // Handle case where keyFeatures is a JSON string
                    if (typeof selectedPersona.keyFeatures === 'string') {
                      features = JSON.parse(selectedPersona.keyFeatures);
                    } else if (Array.isArray(selectedPersona.keyFeatures)) {
                      // Handle case where keyFeatures is already an array
                      features = selectedPersona.keyFeatures;
                    } else {
                      // Fallback for unexpected data types
                      features = [];
                    }
                  } catch (error) {
                    console.error('Error parsing keyFeatures:', error);
                    features = [];
                  }

                  // Ensure features is an array and has elements
                  if (!Array.isArray(features) || features.length === 0) {
                    return (
                      <Chip
                        label="No key features available"
                        size="small"
                        color="default"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    );
                  }

                  return features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ));
                })()}
              </Box>

              <Box mt={2}>
                <Alert severity="info" variant="outlined">
                  <Typography variant="caption">
                    AI will suggest complementary products based on this persona's preferences and project requirements.
                  </Typography>
                </Alert>
              </Box>
            </Paper>
          )}

          {/* Quick Actions */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              AI Assistant Tools
            </Typography>
            
            <Box display="flex" flexDirection="column" gap={1}>
              <Button
                variant="outlined"
                startIcon={<MicIcon />}
                onClick={voiceState.isListening ? stopListening : startListening}
                disabled={!recognitionRef.current}
                color={voiceState.isListening ? "error" : "primary"}
              >
                {voiceState.isListening ? 'Stop Recording' : 'Voice Input'}
              </Button>
              
              {formData.items.length > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<StarIcon />}
                  color="success"
                  disabled
                >
                  AI Upsell Suggestions (Coming Soon)
                </Button>
              )}
              
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={() => {
                  setFormData({
                    name: '',
                    description: '',
                    isExistingCustomer: true,
                    customerId: '',
                    prospectName: '',
                    prospectCompany: '',
                    prospectEmail: '',
                    prospectPhone: '',
                    propertyId: '',
                    projectType: 'residential',
                    customerPersona: '',
                    validUntil: '',
                    voiceTranscript: '',
                    items: []
                  });
                  setSelectedPersona(null);
                }}
              >
                Clear Form
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

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