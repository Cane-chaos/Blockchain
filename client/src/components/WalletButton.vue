<template>
  <div v-if="walletAddress" class="flex items-center gap-2">
    <div class="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm font-medium flex items-center gap-2">
      <div class="w-2 h-2 rounded-full bg-green-500"></div>
      {{ formatAddress(walletAddress) }}
    </div>
    <button @click="disconnect" class="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition shadow-sm" title="Disconnect Wallet">
      <i class="fa-solid fa-arrow-right-from-bracket"></i>
    </button>
  </div>
  <button v-else 
    @click="connect"
    class="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:from-indigo-400 hover:to-purple-400 transition shadow-md shadow-indigo-500/30">
    Connect Wallet
  </button>
</template>

<script setup>
import { onMounted } from 'vue';
import { walletAddress, connectWallet, disconnectWallet, initWallet } from '../stores/wallet';

const connect = () => {
  connectWallet();
};

const disconnect = () => {
  if (confirm("Ngắt kết nối ví khỏi website? (Bạn vẫn cần khóa phiên trong MetaMask để an toàn tuyệt đối)")) {
    disconnectWallet();
  }
};

// Rút gọn địa chỉ ví để hiển thị cho đẹp
const formatAddress = (addr) => {
  if (!addr) return '';
  return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
};

onMounted(() => {
  initWallet();
});
</script>
