import React, { useState, useEffect } from 'react';
import * as StellarSdk from '@stellar/stellar-sdk';

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

function App() {
  const [publicKey, setPublicKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [txStatus, setTxStatus] = useState('');
  const [txHash, setTxHash] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [xlmPrice, setXlmPrice] = useState(null);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=inr,usd')
      .then(r => r.json())
      .then(data => setXlmPrice(data.stellar))
      .catch(() => {});
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://horizon-testnet.stellar.org/accounts/${publicKey}`);
      if (!res.ok) throw new Error('Account not found on testnet');
      const data = await res.json();
      setAccount(data);
      fetchTransactions(publicKey);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const fetchTransactions = async (pk) => {
    try {
      const res = await fetch(`https://horizon-testnet.stellar.org/accounts/${pk}/payments?limit=5&order=desc`);
      const data = await res.json();
      setTransactions(data._embedded?.records || []);
    } catch (err) {
      console.log('Could not fetch transactions');
    }
  };

  const getXLMBalance = () => {
    if (!account) return '0';
    const xlm = account.balances.find(b => b.asset_type === 'native');
    return xlm ? parseFloat(xlm.balance).toFixed(2) : '0';
  };

  const getINRValue = (xlmAmount) => {
    if (!xlmPrice || !xlmAmount) return null;
    return (parseFloat(xlmAmount) * xlmPrice.inr).toFixed(2);
  };

  const sendPayment = async () => {
    setShowConfirm(false);
    setTxStatus('Sending...');
    setError('');
    setTxHash('');
    try {
      const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);
      const sourceAccount = await server.loadAccount(publicKey);
      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(StellarSdk.Operation.payment({
          destination: destination,
          asset: StellarSdk.Asset.native(),
          amount: amount,
        }))
        .setTimeout(30)
        .build();

      transaction.sign(sourceKeypair);
      const result = await server.submitTransaction(transaction);
      setTxHash(result.hash);
      setTxStatus('✅ Payment sent successfully!');

      const updated = await fetch(`https://horizon-testnet.stellar.org/accounts/${publicKey}`);
      setAccount(await updated.json());
      fetchTransactions(publicKey);
    } catch (err) {
      setTxStatus('');
      setError('Payment failed: ' + (err.response?.data?.extras?.result_codes?.operations?.[0] || err.message));
    }
  };

  return (
    <div style={{ maxWidth: '620px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '0 20px' }}>
      <h1 style={{ color: '#1a1a2e' }}>🌍 StellarPay</h1>
      <p style={{ color: '#555' }}>Cross-border remittance on Stellar — instant, near-zero fees</p>

      {xlmPrice && (
        <div style={{ background: '#e3f2fd', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', marginBottom: '8px' }}>
          💱 Live XLM Price: <strong>₹{xlmPrice.inr} INR</strong> | <strong>${xlmPrice.usd} USD</strong>
        </div>
      )}

      {/* Connect Wallet */}
      <div style={{ background: '#f5f5f5', padding: '24px', borderRadius: '12px', marginTop: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Connect Wallet</h2>
        <input type="text" placeholder="Public Key (G...)" value={publicKey}
          onChange={e => setPublicKey(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Secret Key (S...) — stays in browser only"
          value={secretKey} onChange={e => setSecretKey(e.target.value)}
          style={{ ...inputStyle, marginTop: '10px' }} />
        <button onClick={connectWallet} disabled={!publicKey || loading} style={btnStyle}>
          {loading ? 'Loading...' : 'Connect Wallet'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Account Info */}
      {account && (
        <div style={{ background: '#e8f5e9', padding: '24px', borderRadius: '12px', marginTop: '16px' }}>
          <h2 style={{ marginTop: 0 }}>✅ Wallet Connected</h2>
          <p><strong>Address:</strong> {account.id.slice(0, 10)}...{account.id.slice(-6)}</p>
          <p><strong>XLM Balance:</strong> {getXLMBalance()} XLM</p>
          {xlmPrice && (
            <p style={{ color: '#2e7d32', fontSize: '14px' }}>
              ≈ ₹{getINRValue(getXLMBalance())} INR | ${(parseFloat(getXLMBalance()) * xlmPrice.usd).toFixed(2)} USD
            </p>
          )}
        </div>
      )}

      {/* Send Payment */}
      {account && (
        <div style={{ background: '#f0f4ff', padding: '24px', borderRadius: '12px', marginTop: '16px' }}>
          <h2 style={{ marginTop: 0 }}>💸 Send Remittance</h2>
          <input type="text" placeholder="Recipient Wallet Address (G...)"
            value={destination} onChange={e => setDestination(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Amount (XLM)"
            value={amount} onChange={e => setAmount(e.target.value)}
            style={{ ...inputStyle, marginTop: '10px' }} />
          {amount && xlmPrice && (
            <p style={{ fontSize: '13px', color: '#555', margin: '6px 0 0' }}>
              ≈ ₹{getINRValue(amount)} INR | ${(parseFloat(amount) * xlmPrice.usd).toFixed(2)} USD
            </p>
          )}

          <button onClick={() => setShowConfirm(true)} disabled={!destination || !amount || !secretKey}
            style={{ ...btnStyle, background: '#28a745' }}>
            Send Payment
          </button>

          {showConfirm && (
            <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '8px', padding: '16px', marginTop: '12px' }}>
              <p style={{ margin: '0 0 6px', fontWeight: 'bold' }}>⚠️ Confirm Remittance</p>
              <p style={{ margin: '0 0 4px', fontSize: '14px' }}>
                Send <strong>{amount} XLM</strong> to <strong>{destination.slice(0, 8)}...{destination.slice(-6)}</strong>
              </p>
              {xlmPrice && (
                <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#555' }}>
                  ≈ ₹{getINRValue(amount)} INR | Fee: &lt;$0.001
                </p>
              )}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={sendPayment} style={{ ...btnStyle, background: '#28a745', marginTop: 0, flex: 1 }}>✅ Confirm</button>
                <button onClick={() => setShowConfirm(false)} style={{ ...btnStyle, background: '#dc3545', marginTop: 0, flex: 1 }}>❌ Cancel</button>
              </div>
            </div>
          )}

          {txStatus && <p style={{ color: 'green', marginTop: '10px' }}>{txStatus}</p>}
          {txHash && (
            <p style={{ fontSize: '13px', wordBreak: 'break-all' }}>
              <strong>Tx Hash:</strong>{' '}
              <a href={`https://stellar.expert/explorer/testnet/tx/${txHash}`} target="_blank" rel="noreferrer">{txHash.slice(0, 20)}...</a>
            </p>
          )}
        </div>
      )}

      {/* Transaction History */}
      {account && transactions.length > 0 && (
        <div style={{ background: '#fff8e1', padding: '24px', borderRadius: '12px', marginTop: '16px', marginBottom: '40px' }}>
          <h2 style={{ marginTop: 0 }}>📜 Transaction History</h2>
          {transactions.map((tx, i) => (
            <div key={i} style={{ borderBottom: '1px solid #eee', padding: '10px 0', fontSize: '13px' }}>
              <p style={{ margin: '4px 0' }}>
                <strong>Type:</strong> {tx.type === 'payment' ? (tx.from === publicKey ? '⬆️ Sent' : '⬇️ Received') : tx.type}
              </p>
              <p style={{ margin: '4px 0' }}>
                <strong>Amount:</strong> {tx.amount ? parseFloat(tx.amount).toFixed(2) + ' XLM' : 'N/A'}
                {tx.amount && xlmPrice && <span style={{ color: '#777' }}> ≈ ₹{getINRValue(tx.amount)} INR</span>}
              </p>
              <p style={{ margin: '4px 0' }}>
                <strong>To/From:</strong> {tx.from === publicKey ? tx.to?.slice(0, 8) + '...' : tx.from?.slice(0, 8) + '...'}
              </p>
              <a href={`https://stellar.expert/explorer/testnet/tx/${tx.transaction_hash}`}
                target="_blank" rel="noreferrer" style={{ color: '#6c63ff', fontSize: '12px' }}>
                View on Explorer
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px', borderRadius: '8px',
  border: '1px solid #ccc', fontSize: '14px', boxSizing: 'border-box'
};

const btnStyle = {
  marginTop: '12px', width: '100%', padding: '12px',
  background: '#6c63ff', color: '#fff', border: 'none',
  borderRadius: '8px', fontSize: '16px', cursor: 'pointer'
};

export default App;