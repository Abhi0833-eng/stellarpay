# 🏗️ StellarPay Architecture

## Overview
StellarPay is a DeFi payments application built on the Stellar Testnet that allows users to send XLM instantly.

## System Architecture

[User Browser]
|
▼
[React Frontend - Vercel]
|
▼
[Stellar Horizon API - Testnet]
|
▼
[Stellar Testnet Network]

## Components

### Frontend (React.js)
- **App.js** — Main component handling wallet connect, send payment, transaction history
- **Stellar SDK** — @stellar/stellar-sdk for transaction building and signing
- **Horizon API** — Direct calls to horizon-testnet.stellar.org for account data

### Backend (Node.js + Express)
- **index.js** — Express server (ready for future API endpoints)
- **Port 5000** — Local development server

### Blockchain Layer
- **Network:** Stellar Testnet
- **API:** Horizon REST API (https://horizon-testnet.stellar.org)
- **Operations:** Payment, Account creation
- **Asset:** XLM (native Stellar token)

## Data Flow

### Wallet Connect Flow

User enters Public Key
→ App fetches account from Horizon API
→ Displays balance and account info
→ Fetches last 5 payment transactions

### Send Payment Flow

User enters destination + amount + secret key
→ App loads source account from Horizon
→ Builds transaction with Payment operation
→ Signs transaction with secret key (in browser memory only)
→ Submits to Horizon API
→ Updates balance and transaction history

## Security Considerations
- Secret keys never leave the browser
- No keys stored in database or logs
- All transactions on testnet only
- Input validation on wallet addresses

## Deployment
- **Frontend:** Vercel (https://stellarpay-five.vercel.app)
- **Backend:** Local (ready for Railway/Render deployment)