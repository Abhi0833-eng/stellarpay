# 🌍 StellarPay — Cross-Border Remittance on Stellar

> Empowering migrant workers to send money home instantly with near-zero fees using the Stellar blockchain.

## 💡 Problem Statement
Migrant workers worldwide send over $800 billion home annually, but lose 5–8% to banks and services like Western Union. A $500 transfer costs $25–40 in fees and takes 3–5 days.

**StellarPay solves this** by using the Stellar network to send money in under 5 seconds with fees under $0.01.

## 🎯 Real-World Use Case
A worker in the UAE wants to send money to their family in India:
- ❌ Traditional: 5% fee + 3 days wait
- ✅ StellarPay: 0.001% fee + 5 seconds

## 🔴 Live Demo
[https://stellarpay-five.vercel.app](https://stellarpay-five.vercel.app)

## 🎥 Demo Video
[Watch on YouTube](https://youtu.be/WaIkefcSuv0)

## ✨ Features
- 🔗 Connect Stellar testnet wallet
- 💸 Send XLM cross-border instantly
- 💱 See real INR equivalent value before sending
- ✅ Confirmation popup to prevent mistakes
- 📜 View full transaction history
- 🔗 Transaction links to Stellar Explorer

## 🌐 Why Stellar?
- Stellar settles transactions in 3–5 seconds
- Fees are less than $0.001 per transaction
- Built specifically for cross-border payments
- Supports multiple currencies via anchors

## 🏗️ Architecture
See [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Blockchain:** Stellar Testnet (Horizon API)
- **SDK:** @stellar/stellar-sdk
- **Deployment:** Vercel

## 🚀 How to Run Locally
```bash
git clone https://github.com/Abhi0833-eng/stellarpay.git
cd stellarpay/client
npm install
npm start
```

## 👥 Testnet Users (Migrant Worker Simulation)
| Name | Wallet Address | Scenario |
|------|---------------|----------|
| User 1 | GAE5YJQQXWUUEADJCZSF3D5TGMYFIWCQTD4DLADXDS3DDXPDHHOIW4YZ | Worker in UAE sending to India |
| User 2 | GBQI6DPFRFZMTDO4KFUPB5D2F6WCQOZEGEBE7OTBHVXXLD76BJFQN4SR | Worker in UK sending to India |
| User 3 | GCO527YCC6DNDK3K6FN654WXAINDGNB35FUFAN3LURDENIIBD7ZFAJN6 | Worker in USA sending to India |
| User 4 | GDSFCL6ZLYDNYFYKCXDFLPOQSAOYFBICH6L6Z53SYO6S6BZL4UEPQD4M | Worker in Canada sending to India |
| User 5 | GBXAOA3SLGEUETC33VUBIS62TPDEHVO2MFMNV5LVTKTWBEJQRAX23LYI | Worker in Singapore sending to India |

## 📊 User Feedback
- [Google Form](https://forms.gle/aTUWwF7845ED4kiK7)
- [View Excel Sheet](./user-feedback.xlsx)

## 🔄 Improvements Based on User Feedback
1. **Confirmation popup before sending** — prevents accidental transfers
   - Git commit: https://github.com/Abhi0833-eng/stellarpay/commit/28dcb8e
2. **INR equivalent display** — users want to see real value in local currency

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