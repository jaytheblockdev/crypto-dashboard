// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const [ethBalance, setEthBalance] = useState(null);

  useEffect(() => {
    const fetchEthBalance = async () => {
      if (isConnected && address) {
        try {
          // Connect to an Ethereum node using your RPC URL
          const provider = new ethers.providers.JsonRpcProvider('YOUR_INFURA_OR_ALCHEMY_RPC_URL');
          const balance = await provider.getBalance(address);
          // Convert the balance from wei to ETH
          setEthBalance(ethers.utils.formatEther(balance));
        } catch (error) {
          console.error("Error fetching ETH balance:", error);
        }
      }
    };

    fetchEthBalance();
  }, [address, isConnected]);

  if (!isConnected) {
    return <p>Please connect your wallet to see your dashboard.</p>;
  }

  return (
    <div>
      <h2>Your Portfolio</h2>
      <p>ETH Balance: {ethBalance ? `${parseFloat(ethBalance).toFixed(4)} ETH` : 'Loading...'}</p>
      {/* We will add more features here later */}
    </div>
  );
};

export default Dashboard;
// src/components/Dashboard.js (add to previous code)
import { getCryptoPrice } from '../utils/api';

const Dashboard = () => {
  // ... existing code ...
  const [ethPrice, setEthPrice] = useState(null);

  useEffect(() => {
    // ... existing balance fetching code ...

    const fetchEthPrice = async () => {
      const price = await getCryptoPrice('ethereum');
      setEthPrice(price);
    };

    fetchEthPrice();
  }, [address, isConnected]);

  // ... existing return statement ...
  return (
    <div>
      <h2>Your Portfolio</h2>
      <p>ETH Balance: {ethBalance ? `${parseFloat(ethBalance).toFixed(4)} ETH` : 'Loading...'}</p>
      <p>ETH Price: {ethPrice ? `$${ethPrice}` : 'Loading...'}</p>
      {ethBalance && ethPrice && (
        <h3>Total ETH Value: ${parseFloat(ethBalance * ethPrice).toFixed(2)}</h3>
      )}
    </div>
  );
};

export default Dashboard;
// src/components/Dashboard.js (updated return statement)
import PortfolioChart from './PortfolioChart';

// ... existing code ...

return (
  <div>
    {/* ... existing dashboard info ... */}
    <h2>Portfolio Analytics</h2>
    {ethBalance && ethPrice && (
      <div style={{ width: '400px', margin: 'auto' }}>
        <PortfolioChart holdings={[{ name: 'ETH', value: ethBalance * ethPrice }]} />
      </div>
    )}
  </div>
);