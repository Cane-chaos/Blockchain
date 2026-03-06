<template>
  <section class="pt-24 bg-gradient-to-r from-gray-700 to-gray-900">
    <div class="bg-gradient-to-r from-gray-700 to-gray-900">
     
      <header class="bg-gradient-to-r from-gray-700 to-gray-900 border-b sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <h1 class="text-3xl font-bold text-white">Checkout</h1>
        </div>
      </header>

      <div v-if="course" class="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-10">
        
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

            <button v-else @click="pay" :disabled="isLoading" class="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50">
              {{ isLoading ? 'Processing...' : `Pay ${course.price} ETH` }}
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
      <div v-else class="text-center py-20 text-white">
        <p>Đang tải thông tin thanh toán...</p>
      </div>
    </div>
  </section>

</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useRouter } from "vue-router"
import { walletAddress, connectWallet, initWallet } from '../stores/wallet'
import Web3 from "web3"
import deploymentInfo from "../deployment-info.json"

const route = useRoute()
const name = ref("")
const isLoading = ref(false)
const course = ref(null)
const router = useRouter()

const pay = async () => {
  if (!walletAddress.value) {
    alert("Vui lòng kết nối ví trước!")
    return
  }

  if (!window.ethereum) {
    alert("Chưa cài đặt MetaMask!")
    return
  }

  try {
    isLoading.value = true
    
    // Khởi tạo Web3 qua MetaMask
    const web3 = new Web3(window.ethereum)
    
    const contract = new web3.eth.Contract(
      deploymentInfo.contractABI, 
      deploymentInfo.contractAddress
    )
    
    // Kiểm tra xem khoá học đã được tạo trên Smart Contract chưa
    const courseOnChain = await contract.methods.courses(course.value.id).call();
    
    if (!courseOnChain.exists) {
        console.log("Khoá học chưa có trên Blockchain. Đang tự động tạo...");
        const amountInWei = web3.utils.toWei(course.value.price, 'ether');
        
        // Gọi hàm createCourse (ai cũng gọi được vì đã bỏ onlyOwner)
        await contract.methods.createCourse(course.value.id, course.value.title, amountInWei).send({
           from: walletAddress.value,
           gas: 3000000 
        });
        console.log("Tạo khoá học thành công! Tiếp tục thanh toán...");
    }

    // Giá thành Wei
    const amountInWei = web3.utils.toWei(course.value.price, 'ether')
    
    // Gửi transaction buyCourse!
    const tx = await contract.methods.buyCourse(course.value.id).send({
      from: walletAddress.value,
      value: amountInWei,
      gas: 3000000
    })
    
    // Lưu lịch sử mua hàng vào MongoDB Web2 Backend
    try {
       const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
       await fetch(`${apiUrl}/enrollments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
             wallet: walletAddress.value,
             courseId: course.value.id,
             txHash: tx.transactionHash
          })
       });
    } catch (dbErr) {
       console.error("Lỗi lưu Database Backend:", dbErr);
    }
    
    alert(`🎉 Mua khóa học thành công!`)
    //Chuyển sang trang học
    router.push(`/learn/${course.value.id}`)
  } catch (error) {
    console.error("Transaction Error:", error)
    alert(`❌ Giao dịch thất bại:\n${error.message}`)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  initWallet();
  const id = route.params.id;
  if (id) {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
      const res = await fetch(`${apiUrl}/courses/${id}`);
      const result = await res.json();
      if (result.data) {
        course.value = {
          ...result.data,
          duration: "4 weeks • Beginner" // Placeholder nếu Backend chưa có fields này
        };
      }
    } catch (e) {
      console.error(e);
    }
  }
});
</script>
