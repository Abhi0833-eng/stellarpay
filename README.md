# 💼 StellarPay — Decentralized Salary & Freelancer Payment System

> Enabling instant, borderless salary payments for freelancers using the Stellar blockchain — no middlemen, no delays, near-zero fees.

## 💡 Problem Statement
The global freelance economy is worth $455 billion, with 1.5 billion freelancers worldwide. Yet freelancers face:
- ⏳ 30–45 day payment delays via banks
- 💸 20% platform commission on Upwork/Fiverr
- 💸 3–5% fees on PayPal/wire transfers
- 🚫 No access to payments in underbanked regions

**StellarPay solves this** by enabling employers to pay freelancers directly on the Stellar network — settled in 5 seconds, fees under $0.001, no middlemen.

## 🎯 Real-World Use Case
A startup in the USA needs to pay a developer in India $500 for a project:
- ❌ Upwork: Takes $100 (20%) + 30 day hold
- ❌ PayPal: Takes $25 (5%) + 3–5 days
- ✅ StellarPay: Takes $0.001 + 5 seconds

## 🔴 Live Demo
[https://stellarpay-five.vercel.app](https://stellarpay-five.vercel.app)

## 🎥 Demo Video
[Watch on YouTube](https://youtu.be/WaIkefcSuv0)

## ✨ Features
- 🔗 Connect Stellar testnet wallet instantly
- 💸 Send salary payments to any freelancer globally
- 💱 Live INR/USD equivalent shown before every payment
- ✅ Confirmation popup to prevent accidental transfers
- 📜 Full payment history with Stellar Explorer links
- 🔒 Secret key stays in browser — fully non-custodial

## 🌐 Why Stellar?
- Transactions settle in 3–5 seconds (vs 3–5 days for banks)
- Fees under $0.001 per transaction (vs 20% on Upwork)
- Built for global, borderless payments
- Used by IBM, Deloitte, and MoneyGram in production
- Supports USDC stablecoin for stable salary payments

## 🏗️ Architecture
See [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Blockchain:** Stellar Testnet (Horizon API)
- **SDK:** @stellar/stellar-sdk
- **Price Feed:** CoinGecko API (live INR/USD)
- **Deployment:** Vercel

## 🚀 How to Run Locally
```bash
git clone https://github.com/Abhi0833-eng/stellarpay.git
cd stellarpay/client
npm install
npm start
```

## 👥 Testnet Users (Freelancer Payment Simulation)
| Name | Wallet Address | Scenario |
|------|---------------|----------|
| User 1 | GAE5YJQQXWUUEADJCZSF3D5TGMYFIWCQTD4DLADXDS3DDXPDHHOIW4YZ | Frontend developer paid by US startup |
| User 2 | GBQI6DPFRFZMTDO4KFUPB5D2F6WCQOZEGEBE7OTBHVXXLD76BJFQN4SR | UI/UX designer paid by UK agency |
| User 3 | GCO527YCC6DNDK3K6FN654WXAINDGNB35FUFAN3LURDENIIBD7ZFAJN6 | Backend developer paid by German firm |
| User 4 | GDSFCL6ZLYDNYFYKCXDFLPOQSAOYFBICH6L6Z53SYO6S6BZL4UEPQD4M | Content writer paid by Canadian client |
| User 5 | GBXAOA3SLGEUETC33VUBIS62TPDEHVO2MFMNV5LVTKTWBEJQRAX23LYI | Mobile developer paid by Singapore company |

## 📊 User Feedback
- [Google Form](https://forms.gle/aTUWwF7845ED4kiK7)
- [View Excel Sheet](./user-feedback.xlsx)

## 🔄 Improvements Based on User Feedback
1. **Confirmation popup before sending** — prevents accidental salary transfers
   - Git commit: https://github.com/Abhi0833-eng/stellarpay/commit/28dcb8e
2. **Live INR/USD price display** — freelancers see real value before accepting payment
   - Git commit: https://github.com/Abhi0833-eng/stellarpay/commit/1308895

## 📋 Submission Checklist
- ✅ Public GitHub repository
- ✅ Live demo on Vercel
- ✅ Demo video on YouTube
- ✅ 5+ testnet users onboarded
- ✅ Google Form feedback collected
- ✅ Excel feedback sheet
- ✅ Architecture document
- ✅ Smart contract in /contracts folder
- ✅ 10+ meaningful commits