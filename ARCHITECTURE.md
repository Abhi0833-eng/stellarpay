# 🏗️ StellarPay Architecture

## Overview
StellarPay is a decentralized salary and freelancer payment system built on 
the Stellar blockchain. It eliminates the need for intermediaries like Upwork, 
PayPal, or banks when paying freelancers across borders.

## Problem → Solution
| Problem | Traditional Platforms | StellarPay |
|---------|----------------------|------------|
| Platform fee | 20% (Upwork/Fiverr) | <$0.001 |
| Transfer time | 30–45 days | <5 seconds |
| PayPal fee | 3–5% | <$0.001 |
| Availability | Business hours | 24/7 |
| Middlemen | Banks, platforms | None |

## System Architecture
[Employer - Browser]
        |
        ▼
[React Frontend - Vercel]
        |
        ├──► [CoinGecko API] — Live XLM/INR/USD price feed
        |
        └──► [Stellar Horizon API - Testnet]
                    |
                    ▼
          [Stellar Testnet Network]
                    |
                    ▼
          [Freelancer Wallet - Anywhere in World]

## Components

### Frontend (React.js)
- **App.js** — Wallet connect, salary send, live price display,
  payment history
- **Stellar SDK** — Builds and signs transactions client-side
- **CoinGecko API** — Real-time XLM price in INR and USD
- **Horizon API** — Fetches account data and submits transactions

### Smart Contract Layer (/contracts)
- **payment.js** — Core contract functions:
  - executePayment() — sends XLM salary to freelancer
  - getBalance() — checks wallet balance
  - validateWalletAddress() — validates Stellar address format

### Backend (Node.js + Express)
- **index.js** — Express server for future features
  (invoice generation, payment scheduling)

## Data Flow

### Employer Pays Freelancer
User connects wallet with Public + Secret Key
→ Enters freelancer wallet address + salary amount
→ App shows live INR/USD equivalent
→ Confirmation popup shows exact amount + fee (<$0.001)
→ Employer confirms → SDK builds transaction
→ Signed in browser (key never sent to server)
→ Submitted to Stellar network
→ Freelancer receives payment in <5 seconds
→ Transaction history updates automatically

## Security
- Secret keys never leave the browser
- No keys stored in database or logs
- Confirmation popup prevents accidental payments
- Non-custodial — users control their own funds
- Testnet environment for safe testing

## Why Stellar for Freelancer Payments?
- Stellar was built for fast, low-cost global payments
- 3–5 second finality (faster than any bank)
- Fees under $0.001 (vs 20% on Upwork)
- Used in production by IBM and MoneyGram
- Supports USDC for stable salary payments
- Open network — no account approval needed

## Deployment
- **Frontend:** Vercel (https://stellarpay-five.vercel.app)
- **Backend:** Local (deployable to Railway/Render)