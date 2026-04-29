// StellarPay Smart Contract Simulation
// Stellar uses Soroban for smart contracts (Rust-based)
// This file demonstrates the payment contract logic

const StellarSdk = require('@stellar/stellar-sdk');

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

/**
 * Payment Contract
 * Sends XLM from sender to receiver on Stellar Testnet
 */
async function executePayment(senderSecret, receiverPublicKey, amount) {
  try {
    const senderKeypair = StellarSdk.Keypair.fromSecret(senderSecret);
    const senderPublicKey = senderKeypair.publicKey();

    // Load sender account
    const senderAccount = await server.loadAccount(senderPublicKey);

    // Build transaction
    const transaction = new StellarSdk.TransactionBuilder(senderAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(StellarSdk.Operation.payment({
        destination: receiverPublicKey,
        asset: StellarSdk.Asset.native(),
        amount: amount.toString(),
      }))
      .setTimeout(30)
      .build();

    // Sign transaction
    transaction.sign(senderKeypair);

    // Submit to network
    const result = await server.submitTransaction(transaction);
    console.log('✅ Payment successful! Tx Hash:', result.hash);
    return { success: true, hash: result.hash };

  } catch (error) {
    console.error('❌ Payment failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Get Account Balance Contract
 */
async function getBalance(publicKey) {
  try {
    const account = await server.loadAccount(publicKey);
    const xlm = account.balances.find(b => b.asset_type === 'native');
    const balance = xlm ? parseFloat(xlm.balance).toFixed(2) : '0';
    console.log(`💰 Balance for ${publicKey.slice(0,8)}...: ${balance} XLM`);
    return { success: true, balance };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Validate Wallet Address Contract
 */
function validateWalletAddress(publicKey) {
  try {
    StellarSdk.Keypair.fromPublicKey(publicKey);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid Stellar wallet address' };
  }
}

module.exports = { executePayment, getBalance, validateWalletAddress };