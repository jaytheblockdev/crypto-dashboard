// src/components/WalletConnect.js
import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { mainnet } from 'wagmi/chains';

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <p>Connected to: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => connect({ connector: new InjectedConnector({ chains: [mainnet] }) })}>
        Connect MetaMask
      </button>
      <button onClick={() => connect({ connector: new WalletConnectConnector({ chains: [mainnet], options: { projectId: 'YOUR_WALLETCONNECT_PROJECT_ID' } }) })}>
        Connect WalletConnect
      </button>
    </div>
  );
};

export default WalletConnect;