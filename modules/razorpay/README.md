# Razorpay Integration for Expo/React Native

This module provides native Razorpay integration for both iOS and Android platforms in Expo managed workflow.

## Features

- ✅ Native Android integration using Razorpay Android SDK 1.6.40
- ✅ Native iOS integration using Razorpay iOS SDK 1.3.9
- ✅ TypeScript support with full type definitions
- ✅ Promise-based API
- ✅ Comprehensive error handling
- ✅ Support for all Razorpay payment options

## Installation

### 1. Install Dependencies

The Razorpay module is already included in this project. For new projects, you would need to:

```bash
# Install the module (this is a local module in this project)
cd modules/razorpay
npm install
```

### 2. iOS Setup

The iOS setup is automatically handled through the podspec file. The module includes:

- Razorpay iOS SDK dependency (`razorpay-pod ~> 1.3.9`)
- Proper URL scheme configuration in Info.plist
- Required permissions and capabilities

### 3. Android Setup

The Android setup is automatically handled through the build.gradle file. The module includes:

- Razorpay Android SDK dependency (`com.razorpay:checkout:1.6.40`)
- Required permissions in AndroidManifest.xml
- ProGuard rules if needed

## Usage

### Basic Payment

```typescript
import { Razorpay, RazorpayOptions, PaymentStatus } from './modules/razorpay';

const handlePayment = async () => {
  try {
    const options: RazorpayOptions = {
      key: 'rzp_test_your_key_here', // Replace with your Razorpay key
      amount: 50000, // Amount in paise (50000 = ₹500)
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Payment for order #12345',
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9876543210'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const result = await Razorpay.initializePayment(options);

    if (result.status === PaymentStatus.SUCCESS) {
      console.log('Payment successful:', result.paymentId);
      // Handle successful payment
    } else if (result.status === PaymentStatus.ERROR) {
      console.log('Payment failed:', result.error?.description);
      // Handle payment failure
    } else {
      console.log('Payment cancelled by user');
      // Handle payment cancellation
    }
  } catch (error) {
    console.error('Payment initialization error:', error);
  }
};
```

### Advanced Configuration

```typescript
const advancedOptions: RazorpayOptions = {
  key: 'rzp_test_your_key_here',
  amount: 100000, // ₹1000 in paise
  currency: 'INR',
  orderId: 'order_abc123', // Order ID from your backend
  name: 'Acme Corp',
  description: 'Premium subscription',
  image: 'https://your-logo-url.png',
  prefill: {
    name: 'Jane Smith',
    email: 'jane@example.com',
    contact: '9123456789'
  },
  notes: {
    address: 'Customer address',
    merchant_order_id: 'ORDER_123'
  },
  theme: {
    color: '#ff6b35',
    backdropColor: 'rgba(0,0,0,0.5)'
  },
  modal: {
    backdropClose: false,
    escape: true,
    handleback: true,
    confirmClose: true
  },
  readonly: {
    email: true,
    contact: false,
    name: false
  }
};

const result = await Razorpay.initializePayment(advancedOptions);
```

## API Reference

### Razorpay.initializePayment(options)

Initializes and starts a Razorpay payment.

**Parameters:**
- `options` (RazorpayOptions): Payment configuration options

**Returns:**
- `Promise<PaymentResult>`: Payment result with status and details

### Razorpay.getVersion()

Returns the SDK version string.

**Returns:**
- `string`: SDK version

### Razorpay.SDK_VERSION

Constant containing the SDK version.

## Type Definitions

### RazorpayOptions

```typescript
interface RazorpayOptions {
  key: string;                    // Razorpay API key
  amount: number;                 // Amount in paise
  currency?: string;              // Currency code (default: 'INR')
  orderId?: string;               // Order ID from backend
  name: string;                   // Business/product name
  description?: string;           // Payment description
  image?: string;                 // Logo URL
  prefill?: PrefillOptions;       // Pre-filled customer data
  notes?: Record<string, any>;    // Custom notes
  theme?: ThemeOptions;           // UI theme options
  modal?: ModalOptions;           // Modal behavior options
  readonly?: ReadonlyOptions;     // Read-only field options
}
```

### PaymentResult

```typescript
interface PaymentResult {
  status: PaymentStatus;          // Payment status
  paymentId?: string;             // Payment ID (on success)
  orderId?: string;               // Order ID
  signature?: string;             // Payment signature
  error?: PaymentError;           // Error details (on failure)
}

enum PaymentStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  CANCELLED = 'cancelled'
}
```

## Error Handling

The module provides comprehensive error handling:

```typescript
const result = await Razorpay.initializePayment(options);

switch (result.status) {
  case PaymentStatus.SUCCESS:
    // Payment completed successfully
    console.log('Payment ID:', result.paymentId);
    break;
    
  case PaymentStatus.ERROR:
    // Payment failed
    console.log('Error:', result.error?.description);
    console.log('Error Code:', result.error?.code);
    break;
    
  case PaymentStatus.CANCELLED:
    // User cancelled the payment
    console.log('Payment cancelled by user');
    break;
}
```

## Testing

Use the included test component to verify the integration:

```typescript
import RazorpayTestScreen from './src/components/RazorpayTestScreen';

// Use this component in your app for testing
```

## Backend Integration

Remember to:

1. Create orders on your backend using Razorpay's Order API
2. Verify payment signatures on your backend
3. Handle webhook notifications from Razorpay
4. Store payment details securely

## Platform-Specific Notes

### iOS
- Minimum iOS version: 12.0
- URL schemes are automatically configured
- Payment sheet opens as a modal

### Android
- Minimum Android API level: 21
- Handles back button and lifecycle events
- Uses Fragment-based implementation

## Troubleshooting

### Common Issues

1. **"No current activity available"**: Ensure the payment is initiated from a mounted React component
2. **"Cannot find type converter"**: Make sure all data classes implement the Record interface
3. **Build failures**: Clean and rebuild the project after making changes

### Debug Mode

Enable debug logging in development:

```typescript
// Add this before payment initialization
console.log('Razorpay options:', options);

const result = await Razorpay.initializePayment(options);
console.log('Payment result:', result);
```

## License

This module integrates with Razorpay's official SDKs. Please refer to Razorpay's terms of service and licensing.

## Support

For issues related to:
- **This module**: Check the implementation in `modules/razorpay/`
- **Razorpay SDK**: Visit [Razorpay Documentation](https://razorpay.com/docs/)
- **Integration**: Check the example in `src/components/RazorpayTestScreen.tsx`
