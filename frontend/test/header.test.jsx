import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../src/components/shared/Headers/Header'; 
import { useAuth } from '@/contexts/VisitorAuthContext';
import { useVendorAuth } from '@/contexts/VendorAuthContext';

// Mock the context hooks
jest.mock('@/contexts/VisitorAuthContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('@/contexts/VendorAuthContext', () => ({
  useVendorAuth: jest.fn()
}));

// Mock the header components
jest.mock('@/components/shared/Headers/VisitorHeader', () => {
  const VisitorHeaderMock = () => <div data-testid="visitor-header">Visitor Header</div>;
  VisitorHeaderMock.displayName = 'VisitorHeader';
  return VisitorHeaderMock;
});

jest.mock('@/components/shared/Headers/VendorHeader', () => {
  const VendorHeaderMock = () => <div data-testid="vendor-header">Vendor Header</div>;
  VendorHeaderMock.displayName = 'VendorHeader';
  return VendorHeaderMock;
});

jest.mock('@/components/shared/Headers/GeneralHeader', () => {
  const GeneralHeaderMock = () => <div data-testid="general-header">General Header</div>;
  GeneralHeaderMock.displayName = 'GeneralHeader';
  return GeneralHeaderMock;
});

describe('Header Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });
  
  test('renders VisitorHeader when visitor is authenticated', () => {
    // Set up the visitor auth mock to return a visitor
    useAuth.mockReturnValue({ visitor: { id: '123', name: 'Test Visitor' } });
    useVendorAuth.mockReturnValue({ vendor: null });
    
    render(<Header />);
    
    // Assert VisitorHeader is rendered
    expect(screen.getByTestId('visitor-header')).toBeInTheDocument();
    // Assert the other headers are not rendered
    expect(screen.queryByTestId('vendor-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('general-header')).not.toBeInTheDocument();
  });
  
  test('renders VendorHeader when vendor is authenticated', () => {
    // Set up the vendor auth mock to return a vendor and visitor auth to return null
    useAuth.mockReturnValue({ visitor: null });
    useVendorAuth.mockReturnValue({ vendor: { id: '456', name: 'Test Vendor' } });
    
    render(<Header />);
    
    // Assert VendorHeader is rendered
    expect(screen.getByTestId('vendor-header')).toBeInTheDocument();
    // Assert the other headers are not rendered
    expect(screen.queryByTestId('visitor-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('general-header')).not.toBeInTheDocument();
  });
  
  test('renders GeneralHeader when neither visitor nor vendor is authenticated', () => {
    // Set up both auth mocks to return null
    useAuth.mockReturnValue({ visitor: null });
    useVendorAuth.mockReturnValue({ vendor: null });
    
    render(<Header />);
    
    // Assert GeneralHeader is rendered
    expect(screen.getByTestId('general-header')).toBeInTheDocument();
    // Assert the other headers are not rendered
    expect(screen.queryByTestId('visitor-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('vendor-header')).not.toBeInTheDocument();
  });
  
  test('prioritizes visitor auth over vendor auth when both are present', () => {
    // Set up both auth mocks to return values
    useAuth.mockReturnValue({ visitor: { id: '123', name: 'Test Visitor' } });
    useVendorAuth.mockReturnValue({ vendor: { id: '456', name: 'Test Vendor' } });
    
    render(<Header />);
    
    // Assert VisitorHeader is rendered (visitor takes precedence per the component logic)
    expect(screen.getByTestId('visitor-header')).toBeInTheDocument();
    // Assert the other headers are not rendered
    expect(screen.queryByTestId('vendor-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('general-header')).not.toBeInTheDocument();
  });
});