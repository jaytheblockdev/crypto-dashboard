// vite.config.js
import react from '@vitejs/plugin-react';

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