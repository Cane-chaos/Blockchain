<template>
  <section class="pt-24">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Chưa kết nối ví -->
      <div v-if="!walletAddress" class="text-center py-20">
        <p class="text-xl font-semibold text-gray-700 mb-4">Vui lòng kết nối ví MetaMask để tiếp tục</p>
        <router-link to="/courses" class="text-indigo-600 hover:underline">← Quay lại danh sách khoá học</router-link>
      </div>

      <!-- Đang kiểm tra quyền truy cập -->
      <div v-else-if="isLoading" class="text-center py-20 text-gray-500">
        <i class="fa-solid fa-spinner fa-spin mr-2"></i> Đang kiểm tra quyền truy cập...
      </div>

      <!-- Lỗi -->
      <div v-else-if="error" class="text-center py-20">
        <p class="text-red-500 text-lg mb-4">{{ error }}</p>
        <router-link to="/courses" class="text-indigo-600 hover:underline">← Quay lại danh sách khoá học</router-link>
      </div>

      <!-- Có quyền truy cập -->
      <div v-else-if="course">
        <h1 class="text-3xl font-bold mb-6">{{ course.title }}</h1>

        <div class="bg-gray-100 p-6 rounded">
          <p class="text-lg">Chào mừng bạn đến khóa học 🎓</p>
          <p class="text-gray-600 mt-2">Nội dung học sẽ hiển thị ở đây</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>

import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { walletAddress, initWallet } from "../stores/wallet"
import Web3 from "web3"
import deploymentInfo from "../deployment-info.json"

const route = useRoute()
const router = useRouter()

const course = ref(null)
const isLoading = ref(false)
const error = ref(null)

onMounted(async () => {
  await initWallet()

  // Guard: chưa kết nối ví → dừng lại, template sẽ hiện thông báo
  if (!walletAddress.value) return

  const id = route.params.id
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api"

  try {
    isLoading.value = true

    // ✅ Kiểm tra quyền sở hữu trực tiếp từ Smart Contract (nguồn chân lý)
    const web3 = new Web3(window.ethereum)
    const contract = new web3.eth.Contract(
      deploymentInfo.contractABI,
      deploymentInfo.contractAddress
    )
    const isBought = await contract.methods.isPurchased(walletAddress.value, id).call()

    if (!isBought) {
      router.push(`/checkout/${id}`)
      return
    }

    // Load thông tin khoá học từ API
    const res = await fetch(`${apiUrl}/courses/${id}`)
    const data = await res.json()
    course.value = data.data

  } catch (err) {
    console.error("LearnCourse error:", err)
    error.value = "Có lỗi xảy ra khi tải khoá học. Vui lòng thử lại."
  } finally {
    isLoading.value = false
  }
})

</script>