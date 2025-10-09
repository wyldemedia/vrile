# Stripe Integration Setup for Netlify

## Overview
This project uses Netlify Functions to handle Stripe payments securely. The payment processing happens server-side using serverless functions.

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Stripe API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Secret Key** (starts with `sk_test_` for testing or `sk_live_` for production)

### 3. Configure Environment Variables

#### For Local Development:
Create a `.env` file in your project root:
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

#### For Netlify Production:
1. Go to your Netlify site dashboard
2. Navigate to Site settings > Environment variables
3. Add the following variable:
   - Key: `STRIPE_SECRET_KEY`
   - Value: Your Stripe secret key

### 4. Update Frontend Stripe Publishable Key
In your `index.html`, update this line with your Stripe publishable key:
```javascript
const STRIPE_PUBLISHABLE_KEY = 'pk_test_your_publishable_key_here';
```

### 5. Test Locally
```bash
# Install Netlify CLI if you haven't
npm install -g netlify-cli

# Start local development server
netlify dev
```

### 6. Deploy to Netlify
1. Connect your repository to Netlify
2. Set the environment variable `STRIPE_SECRET_KEY` in Netlify dashboard
3. Deploy!

## File Structure
```
├── index.html                          # Main landing page
├── netlify/
│   └── functions/
│       └── create-payment-intent.js    # Stripe payment function
├── netlify.toml                        # Netlify configuration
├── package.json                        # Dependencies
└── .env.example                        # Environment variables template
```

## How It Works
1. User clicks purchase button
2. Frontend calls `/.netlify/functions/create-payment-intent`
3. Netlify function creates a Stripe PaymentIntent
4. Frontend uses Stripe.js to collect payment details
5. Payment is processed by Stripe
6. On success, files are downloaded and user is redirected

## Testing
Use Stripe test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Use any future date for expiry and any 3-digit CVC

## Security Notes
- Never expose your Stripe secret key in frontend code
- Always use HTTPS in production
- Validate payments server-side
- Consider implementing webhooks for robust payment handling
