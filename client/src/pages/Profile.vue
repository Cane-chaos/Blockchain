<template>
  <div class="bg-gradient-to-r from-gray-700 to-gray-900 py-8 min-h-screen">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
    <section class="pt-24">
      <div class="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-4">

        <div class="col-span-12 md:col-span-4 space-y-6">
          <div class="bg-gradient-to-r from-indigo-100 to-blue-200 rounded-xl shadow p-6 text-center">
            <div class="flex justify-center my-4">
              <div class="w-24 h-24 rounded-full bg-pink-600 text-white flex items-center justify-center text-4xl font-bold">H</div>
            </div>

            <h2 class="text-xl font-semibold">Hiền Phan</h2>

            <button class="mt-4 border border-pink-700 text-dark bg-white
                   px-4 py-2 rounded-lg text-sm hover:bg-pink-100">
              <i class="fa-solid fa-link me-1"></i> Share profile link
            </button>
            
            <div class="mt-6 text-left">
              <p class="text-sm font-semibold mb-1">Connected Wallet:</p>
              <p class="text-xs text-gray-700 break-all bg-white p-2 rounded border border-gray-300">
                {{ walletAddress || 'Not connected' }}
              </p>
            </div>
          </div>
        </div>

        <div class="col-span-12 md:col-span-8 space-y-10">
          <section>
            <h2 class="text-2xl font-bold mb-4 text-white">My Enrolled Courses</h2>

            <div v-if="isLoading" class="text-white">
              <i class="fa-solid fa-spinner fa-spin mr-2"></i> Loading your courses from blockchain...
            </div>
            
            <div v-else-if="!walletAddress" class="bg-gradient-to-r from-indigo-100 to-blue-200 rounded-xl shadow p-6 text-center text-dark">
              Please connect your MetaMask wallet to view your purchased courses.
            </div>

            <div v-else-if="myCourses.length === 0" class="bg-gradient-to-r from-indigo-100 to-blue-200 rounded-xl shadow p-6 text-center text-dark">
              You haven't enrolled in any courses yet.
              <br>
              <router-link to="/courses" class="text-indigo-600 hover:underline mt-2 inline-block">Browse available courses</router-link>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div v-for="course in myCourses" :key="course.id" class="bg-white rounded-xl shadow overflow-hidden flex flex-col">
                <img :src="course.image" :alt="course.title" class="w-full h-40 object-cover" />
                <div class="p-6 flex-1 flex flex-col">
                  <h3 class="font-bold text-lg mb-2 text-dark">{{ course.title }}</h3>
                  <p class="text-gray-500 text-sm mb-4">Instructor: {{ course.instructor || 'Web3 Master' }}</p>
                  <div class="mt-auto">
                    <router-link :to="`/learn/${course.id}`" class="block text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 w-full">
                      Go to Course
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import Web3 from "web3"
import { walletAddress, initWallet } from '../stores/wallet'
import deploymentInfo from "../deployment-info.json"

const myCourses = ref([])
const isLoading = ref(true)

const loadUserCourses = async () => {
  if (!walletAddress.value) {
    isLoading.value = false
    myCourses.value = []
    return
  }

  try {
    isLoading.value = true
    
    // 1. Fetch all available courses from DB
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
    const res = await fetch(`${apiUrl}/courses`);
    const dbResult = await res.json();
    const allCourses = dbResult.data || [];

    // 2. Init Web3 and Contract
    const web3 = new Web3(window.ethereum)
    const contract = new web3.eth.Contract(
      deploymentInfo.contractABI, 
      deploymentInfo.contractAddress
    )

    // 3. Loop and verify ownership
    const ownedCourses = [];
    for (const course of allCourses) {
      if (course.id) {
         try {
           const isBought = await contract.methods.isPurchased(walletAddress.value, course.id).call();
           if (isBought) {
             ownedCourses.push(course);
           }
         } catch (err) {
           console.warn(`Error checking ownership for course ${course.id}:`, err)
         }
      }
    }
    
    myCourses.value = ownedCourses;
  } catch (error) {
    console.error("Failed to load user courses:", error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  initWallet()
  loadUserCourses()
})

// Reload if user switches account
watch(walletAddress, () => {
  loadUserCourses()
})
</script>
