// src/App.js
import './App.css';
import WalletConnect from './components/WalletConnect';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto Dashboard</h1>
        <WalletConnect />
      </header>
      <Dashboard />
    </div>
  );
}

export default App;