// src/utils/api.js
import axios from 'axios';

export const getCryptoPrice = async (tokenId) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`);
    return response.data[tokenId]?.usd;
  } catch (error) {
    console.error("Error fetching price from CoinGecko:", error);
    return null;
  }
};