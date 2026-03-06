<template>
  <section class="pt-24">
    <div class="max-w-6xl mx-auto px-6">

      <h1 class="text-3xl font-bold mb-6">
        {{ course?.title }}
      </h1>

      <div v-if="course">

        <div class="bg-gray-100 p-6 rounded">
          <p class="text-lg">
            Chào mừng bạn đến khóa học 🎓
          </p>

          <p class="text-gray-600 mt-2">
            Nội dung học sẽ hiển thị ở đây
          </p>
        </div>

      </div>

      <div v-else>
        Đang tải khóa học...
      </div>

    </div>
  </section>
</template>

<script setup>

import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { walletAddress } from "../stores/wallet"

const route = useRoute()
const router = useRouter()

const course = ref(null)

onMounted(async () => {

  const id = route.params.id

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api"

  // kiểm tra user đã mua khóa học chưa
  const check = await fetch(`${apiUrl}/enrollments/check?wallet=${walletAddress.value}&courseId=${id}`)
  const result = await check.json()

  if (!result.enrolled) {
    alert("Bạn chưa mua khóa học này!")
    router.push(`/checkout/${id}`)
    return
  }

  // load thông tin khóa học
  const res = await fetch(`${apiUrl}/courses/${id}`)
  const data = await res.json()

  course.value = data.data

})

</script>