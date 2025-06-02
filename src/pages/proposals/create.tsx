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
  customerId: string;
  propertyId?: string;
  customerPersona: string;
  pricingTier: 'good' | 'better' | 'best';
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

const PRICING_TIERS = [
  { value: 'good', label: 'Good', color: 'success', description: 'Essential features at competitive price' },
  { value: 'better', label: 'Better', color: 'primary', description: 'Enhanced features with professional service' },
  { value: 'best', label: 'Best', color: 'error', description: 'Premium features with white-glove service' }
];

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
    customerId: (customerId as string) || '',
    propertyId: propertyId as string,
    customerPersona: '',
    pricingTier: 'better',
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
    onSuccess: (data) => setPersonas(data.personas),
    onError: (error) => setError(`Failed to load personas: ${error.message}`)
  });

  const { get: fetchCustomers } = useApi<{ customers: Customer[] }>({
    onSuccess: (data) => setCustomers(data.customers),
    onError: (error) => setError(`Failed to load customers: ${error.message}`)
  });

  const { get: fetchProperties } = useApi<{ properties: Property[] }>({
    onSuccess: (data) => setProperties(data.properties),
    onError: (error) => setError(`Failed to load properties: ${error.message}`)
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
      setLoading(true);
      try {
        await Promise.all([
          fetchProposalPersonas(getApiUrl('/api/proposal-personas')),
          fetchCustomers(getApiUrl('/api/customers')),
          fetchProperties(getApiUrl('/api/properties'))
        ]);
      } catch (error) {
        console.error('Failed to initialize data:', error);
      } finally {
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
      pricingTier: formData.pricingTier,
      searchLength: productSearch.trim().length 
    });
    
    const timeoutId = setTimeout(() => {
      if (productSearch.trim()) {
        const searchParams = new URLSearchParams({
          search: productSearch,
          pricingTier: formData.pricingTier
        });
        const searchUrl = getApiUrl(`/api/products?${searchParams.toString()}`);
        console.log('🚀 Making product search API call:', searchUrl);
        searchProducts(searchUrl);
      } else {
        console.log('🧹 Clearing search results (empty search)');
        setProductSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [productSearch, formData.pricingTier]);

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
      customerPersona: personaName,
      pricingTier: (persona?.recommendedTier as any) || 'better'
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
    if (!formData.name || !formData.customerId || !formData.customerPersona) {
      setError('Please fill in all required fields');
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
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading proposal data...
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
          <Link component={NextLink} href="/proposals" color="inherit">
            Proposals
          </Link>
          <Typography color="text.primary">Create Proposal</Typography>
        </Breadcrumbs>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Create Smart Proposal
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create intelligent proposals with voice input, AI-powered product matching, and personalized pricing tiers.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Main Form */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            {/* Basic Information */}
            <Typography variant="h6" gutterBottom>
              Proposal Information
            </Typography>
            
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

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Customer</InputLabel>
                  <Select
                    value={formData.customerId}
                    label="Customer"
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
                    {personas.map((persona) => (
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
                <FormControl fullWidth>
                  <InputLabel>Pricing Tier</InputLabel>
                  <Select
                    value={formData.pricingTier}
                    label="Pricing Tier"
                    onChange={(e) => setFormData(prev => ({ ...prev, pricingTier: e.target.value as any }))}
                  >
                    {PRICING_TIERS.map((tier) => (
                      <MenuItem key={tier.value} value={tier.value}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                          <Box>
                            <Chip
                              label={tier.label}
                              color={tier.color as any}
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            {tier.description}
                          </Box>
                          {selectedPersona?.recommendedTier === tier.value && (
                            <StarIcon color="primary" fontSize="small" />
                          )}
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
                  Product Selection
                </Typography>
                <IconButton onClick={() => toggleSection('productSearch')}>
                  {expandedSections.productSearch ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              <Collapse in={expandedSections.productSearch}>
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
              Pricing Summary
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

            <Box display="flex" gap={2}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                onClick={handleSubmit}
                disabled={saving || !formData.name || !formData.customerId || !formData.customerPersona}
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
                <Chip
                  label={`Recommended: ${selectedPersona?.recommendedTier?.toUpperCase() || 'BETTER'}`}
                  color="primary"
                  variant="filled"
                />
              </Box>
            </Paper>
          )}

          {/* Quick Actions */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
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
              
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={() => setFormData({
                  name: '',
                  description: '',
                  customerId: '',
                  propertyId: '',
                  customerPersona: '',
                  pricingTier: 'better',
                  validUntil: '',
                  voiceTranscript: '',
                  items: []
                })}
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