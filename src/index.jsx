// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Import wagmi dependencies for wallet connection
import { WagmiConfig, createConfig, mainnet } from 'wagmi';
import { publicProvider } from '@wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// Configure chains and providers
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains: [mainnet] }),
    new WalletConnectConnector({
      chains: [mainnet],
      options: { projectId: 'YOUR_WALLETCONNECT_PROJECT_ID' },
    }),
  ],
  publicClient: publicProvider(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);