// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { getCryptoPrice } from '../utils/api';
import PortfolioChart from './PortfolioChart';

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const [ethBalance, setEthBalance] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected && address) {
        try {
          // Fetch ETH Balance
          const provider = new ethers.providers.JsonRpcProvider('YOUR_INFURA_OR_ALCHEMY_RPC_URL');
          const balance = await provider.getBalance(address);
          setEthBalance(ethers.utils.formatEther(balance));

          // Fetch ETH Price
          const price = await getCryptoPrice('ethereum');
          setEthPrice(price);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [address, isConnected]);

  const totalEthValue = ethBalance && ethPrice ? parseFloat(ethBalance * ethPrice).toFixed(2) : null;
  const holdings = ethBalance && ethPrice ? [{ name: 'ETH', value: parseFloat(totalEthValue) }] : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Portfolio Card */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Your Portfolio</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-400">ETH Balance:</span>
            <span className="text-xl font-medium">{ethBalance ? `${parseFloat(ethBalance).toFixed(4)} ETH` : 'Loading...'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-400">ETH Price:</span>
            <span className="text-xl font-medium">{ethPrice ? `$${ethPrice}` : 'Loading...'}</span>
          </div>
          {totalEthValue && (
            <div className="pt-4 border-t border-gray-700 mt-4">
              <h3 className="text-xl font-bold text-green-400">Total ETH Value: ${totalEthValue}</h3>
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Chart Card */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 col-span-1 md:col-span-2">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Portfolio Analytics</h2>
        {holdings.length > 0 ? (
          <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
            <PortfolioChart holdings={holdings} />
          </div>
        ) : (
          <p className="text-gray-400">Loading chart data...</p>
        )}
      </div>

      {/* Placeholder Card (for future features like transactions) */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Recent Transactions</h2>
        <p className="text-gray-400">This section is coming soon...</p>
      </div>
    </div>
  );
};

export default Dashboard;