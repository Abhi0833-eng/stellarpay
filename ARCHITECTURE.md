# 🏗️ StellarPay Architecture

## Overview
StellarPay is a cross-border remittance application built on the Stellar Testnet. It solves the problem of high fees and slow transfers for migrant workers sending money home. Traditional remittance services charge 5–8% fees and take 3–5 days. StellarPay enables transfers in under 5 seconds with fees under $0.001.

## Real-World Problem → Stellar Solution
| Problem | Traditional | StellarPay |
|---------|------------|------------|
| Transfer fee | 5–8% | <$0.001 |
| Transfer time | 3–5 days | <5 seconds |
| Availability | Bank hours | 24/7 |
| Minimum amount | $10–50 | Any amount |

## System Architecture

[Migrant Worker - Browser]
|
▼
[React Frontend - Vercel]
|
├──► [CoinGecko API] — Live XLM/INR/USD price
|
└──► [Stellar Horizon API - Testnet]
|
▼
[Stellar Testnet Network]

## Components

### Frontend (React.js)
- **App.js** — Main component: wallet connect, send payment, INR price display, transaction history
- **Stellar SDK** — @stellar/stellar-sdk for building and signing transactions
- **CoinGecko API** — Real-time XLM price in INR and USD
- **Horizon API** — Direct calls to horizon-testnet.stellar.org

### Smart Contract Layer (/contracts)
- **payment.js** — Contract functions for payment execution, balance checking, and wallet validation

### Backend (Node.js + Express)
- **index.js** — Express server ready for future API endpoints
- **Port 5000** — Local development

### Blockchain Layer
- **Network:** Stellar Testnet
- **API:** Horizon REST API
- **Operations:** Payment, Account creation
- **Asset:** XLM (native Stellar token)

## Data Flow

### Wallet Connect Flow

User enters Public Key
→ Fetch account from Horizon API
→ Display XLM balance
→ Fetch live INR/USD equivalent from CoinGecko
→ Load last 5 transactions

### Send Remittance Flow

User enters recipient + amount + secret key
→ Show INR equivalent of amount
→ User clicks Send → Confirmation popup appears
→ User confirms → Transaction built with Stellar SDK
→ Signed in browser (key never leaves browser)
→ Submitted to Horizon API → Settled in <5 seconds
→ Balance and history auto-refresh

## Security Considerations
- Secret keys never leave the browser (no server storage)
- No keys logged or stored anywhere
- Confirmation popup prevents accidental transfers
- Input validation on all wallet addresses
- Testnet only — safe for user testing

## Deployment
- **Frontend:** Vercel (https://stellarpay-five.vercel.app)
- **Backend:** Local (ready for Railway/Render deployment)

## Why Stellar for Remittance?
- Stellar was founded specifically for cross-border payments
- 3–5 second settlement time
- Fees under $0.001 per transaction
- Supports fiat currency anchors (USDC, etc.)
- Used by real remittance companies like MoneyGram