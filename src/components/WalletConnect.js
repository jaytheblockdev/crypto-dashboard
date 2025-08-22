// src/components/WalletConnect.js
import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center space-x-4">
        <span className="bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-full">
          Connected
        </span>
        <button
          onClick={() => disconnect()}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => connect({ connector: new MetaMaskConnector() })}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
      >
        Connect MetaMask
      </button>
      <button
        onClick={() => connect({ connector: new WalletConnectConnector() })}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
      >
        Connect WalletConnect
      </button>
    </div>
  );
};

export default WalletConnect;