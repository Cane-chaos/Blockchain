<template>
  <section class="pt-24 bg-gradient-to-r from-gray-700 to-gray-900">
    <div class="bg-gradient-to-r from-gray-700 to-gray-900">
     
      <header class="bg-gradient-to-r from-gray-700 to-gray-900 border-b sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <h1 class="text-3xl font-bold text-white">Checkout</h1>
        </div>
      </header>

      <div class="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-10">
        
        <div class="lg:col-span-2 bg-gradient-to-r from-indigo-100 to-blue-200 p-8 rounded-lg shadow">
          <h2 class="text-2xl font-semibold mb-6">Billing information</h2>

          <div class="space-y-4 mb-8">
            <div>
              <label class="block text-sm font-medium mb-1">Name</label>
              <input v-model="name" type="text" class="w-full border rounded px-4 py-2" placeholder="Your name" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Wallet address</label>
              <input type="text" :value="walletAddress || 'Not connected'" disabled class="w-full border rounded px-4 py-2 bg-gray-100 text-gray-600" />
            </div>
          </div>

          <h3 class="text-xl font-semibold mb-4">Payment method</h3>

          <div class="border border-dark bg-gradient-to-r from-blue-200 to-pink-300 rounded-lg p-6 space-y-4 ">
            <div class="flex items-center gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" class="w-8 h-8" />
              <span class="font-medium">MetaMask (ETH)</span>
            </div>

            <button v-if="!walletAddress" @click="connectWallet" class=" bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded hover:bg-blue-700">
              Connect Wallet
            </button>

            <button v-else @click="pay" class="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
              Pay {{ course.price }} ETH
            </button>
          </div>
        </div>

        <aside class="bg-gradient-to-r from-indigo-100 to-blue-200 p-6 rounded-lg shadow h-fit">
          <h3 class="text-2xl font-semibold mb-4">Order summary</h3>

          <div class="space-y-2 text-sm">
            <p class="font-medium">{{ course.title }}</p>
            <p class="text-gray-500">{{ course.duration }}</p>
          </div>

          <div class="border-t border-gray-400 my-4"></div>

          <div class="flex justify-between font-semibold">
            <span>Total</span>
            <span>{{ course.price }} ETH</span>
          </div>

          <p class="text-xs text-gray-500 mt-4">
            Payment is processed on the Ethereum blockchain via MetaMask.
          </p>
        </aside>
      </div>
    </div>
  </section>

</template>

<script setup>
import { ref } from "vue"

const name = ref("")
const walletAddress = ref(null)

const course = {
  title: "Blockchain Fundamentals",
  price: "0.05",
  duration: "2 weeks • Beginner"
}

const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask not installed")
    return
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  })

  walletAddress.value = accounts[0]
}

const pay = async () => {
  alert(`
Payment demo success 🎉
From: ${walletAddress.value}
Course: ${course.title}
Amount: ${course.price} ETH`)
}
</script>
