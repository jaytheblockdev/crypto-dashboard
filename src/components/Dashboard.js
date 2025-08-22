// src/components/Dashboard.js
import React from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { getCryptoPrice } from '../utils/api';
import PortfolioChart from './PortfolioChart';

const Dashboard = () => {
  const { address, isConnected } = useAccount();

  // 1. Fetch ETH Balance using useQuery
  const {
    data: ethBalance,
    isLoading: isEthBalanceLoading,
    isError: isEthBalanceError,
  } = useQuery({
    queryKey: ['ethBalance', address], // The query key must be unique
    queryFn: async () => {
      const provider = new ethers.providers.JsonRpcProvider('YOUR_INFURA_OR_ALCHEMY_RPC_URL');
      const balance = await provider.getBalance(address);
      return ethers.utils.formatEther(balance);
    },
    enabled: isConnected, // Only run the query when the wallet is connected
  });

  // 2. Fetch ETH Price using useQuery
  const {
    data: ethPrice,
    isLoading: isEthPriceLoading,
    isError: isEthPriceError,
  } = useQuery({
    queryKey: ['ethPrice'],
    queryFn: () => getCryptoPrice('ethereum'),
  });

  if (!isConnected) {
    return <p>Please connect your wallet to see your dashboard.</p>;
  }

  // Handle Loading States
  if (isEthBalanceLoading || isEthPriceLoading) {
    return <p>Loading your portfolio data...</p>;
  }

  // Handle Error States
  if (isEthBalanceError || isEthPriceError) {
    return <p>Error fetching data. Please try again later.</p>;
  }

  const totalEthValue = ethBalance && ethPrice ? parseFloat(ethBalance * ethPrice).toFixed(2) : null;
  const holdings = totalEthValue ? [{ name: 'ETH', value: parseFloat(totalEthValue) }] : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Your Portfolio</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-400">ETH Balance:</span>
            <span className="text-xl font-medium">{parseFloat(ethBalance).toFixed(4)} ETH</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-400">ETH Price:</span>
            <span className="text-xl font-medium">${ethPrice}</span>
          </div>
          <div className="pt-4 border-t border-gray-700 mt-4">
            <h3 className="text-xl font-bold text-green-400">Total ETH Value: ${totalEthValue}</h3>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 col-span-1 md:col-span-2">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Portfolio Analytics</h2>
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
          <PortfolioChart holdings={holdings} />
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Recent Transactions</h2>
        <p className="text-gray-400">This section is coming soon...</p>
      </div>
    </div>
  );
};

export default Dashboard;