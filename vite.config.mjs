// vite.config.js
import react from '@vitejs/plugin-react';
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default {
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'ethers',
      'wagmi',
      '@wagmi/core',
      '@walletconnect/ethereum-provider',
      'axios',
      'react-chartjs-2',
      'chart.js',
    ],
  },
};