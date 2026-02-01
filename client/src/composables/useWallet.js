// client/src/composables/useWallet.js
import { ref } from 'vue'

const account = ref(null)
const chainId = ref(null)
const isConnected = ref(false)

export function useWallet() {
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask chưa được cài')
      return
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    account.value = accounts[0]
    chainId.value = await window.ethereum.request({
      method: 'eth_chainId',
    })

    isConnected.value = true
  }

  // HÀM CHUYỂN TIỀN
  const sendETH = async (toAddress, amountETH) => {
    if (!window.ethereum || !account.value) {
      alert('Chưa connect ví')
      return
    }

    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: account.value,
            to: toAddress,
            value: '0x' + BigInt(amountETH * 1e18).toString(16),
          },
        ],
      })

      console.log('Transaction hash:', txHash)
      return txHash
    } catch (err) {
      console.error('Send ETH error:', err)
      throw err
    }
  }

  return {
    account,
    chainId,
    isConnected,
    connectWallet,
    sendETH, // export
  }
}
