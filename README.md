# 🌟 StellarPay

> A DeFi payments app built on the Stellar Testnet. Send XLM instantly with real-time balance and transaction history.

## 🔴 Live Demo
[https://stellarpay-five.vercel.app](https://stellarpay-five.vercel.app)

## 🎥 Demo Video
[Watch on YouTube](https://youtu.be/WaIkefcSuv0)

## ✨ Features
- 🔗 Connect Stellar testnet wallet
- 💸 Send XLM to any testnet address
- 📜 View transaction history
- 💰 Real-time XLM balance
- 🔗 Transaction links to Stellar Explorer

## 🏗️ Architecture
See [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js + Express
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

## 👥 Testnet Users
| Name | Wallet Address |
|------|---------------|
| User 1 | GAE5YJQQXWUUEADJCZSF3D5TGMYFIWCQTD4DLADXDS3DDXPDHHOIW4YZ |
| User 2 | GBQI6DPFRFZMTDO4KFUPB5D2F6WCQOZEGEBE7OTBHVXXLD76BJFQN4SR |
| User 3 | GCO527YCC6DNDK3K6FN654WXAINDGNB35FUFAN3LURDENIIBD7ZFAJN6 |
| User 4 | GDSFCL6ZLYDNYFYKCXDFLPOQSAOYFBICH6L6Z53SYO6S6BZL4UEPQD4M |
| User 5 | GBXAOA3SLGEUETC33VUBIS62TPDEHVO2MFMNV5LVTKTWBEJQRAX23LYI |

## 📊 User Feedback
- [Google Form](https://forms.gle/aTUWwF7845ED4kiK7)
- [View Excel Sheet](./user-feedback.xlsx)

## 🔄 Improvements Based on User Feedback
Based on collected feedback, we will implement:
1. **Confirmation popup before sending** — Users requested this to avoid accidental payments
   - Git commit: _to be added after implementation_
2. **QR code for wallet address** — Users want easier way to share address
3. **Show transaction fee before sending** — Users want transparency on fees
4. **Contact book for saved addresses** — Users want to save frequent addresses
5. **Show XLM price in INR/USD** — Users want real value context

## 📋 Submission Checklist
- ✅ Public GitHub repository
- ✅ Live demo on Vercel
- ✅ Demo video on YouTube
- ✅ 5+ testnet users onboarded
- ✅ Google Form feedback collected
- ✅ Excel feedback sheet
- ✅ Architecture document
- ✅ 10+ meaningful commits