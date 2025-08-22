// src/App.js
import './App.css';
import WalletConnect from './components/WalletConnect';
import Dashboard from './components/Dashboard';
import { useAccount } from 'wagmi';

function App() {
  const { isConnected } = useAccount();

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Crypto Dashboard
        </h1>
        <WalletConnect />
      </header>
      <main>
        {isConnected ? <Dashboard /> : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)]">
            <h2 className="text-xl text-gray-400">
              Connect your wallet to get started.
            </h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;