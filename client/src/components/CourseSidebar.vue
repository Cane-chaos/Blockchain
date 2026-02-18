<template>
  <div>
    <div class="bg-white rounded-xl p-6 shadow">
      <div class="text-sm text-gray-500">Full course</div>
      <div class="text-2xl font-bold mt-2">{{ course.priceDisplay }}</div>
      <div class="mt-4">
        <button @click="$router.push('/checkout')"
          class="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold">Enroll for {{ course.price }} </button>
      </div>

      <ul class="mt-4 text-sm text-gray-600 space-y-2">
        <li><strong>{{ course.totalHours }}</strong> hours on-demand video</li>
        <li><strong>{{ course.articles }}</strong> articles</li>
        <li><strong>{{ course.quizzes }}</strong> quizzes</li>
        <li>Certificate of completion</li>
      </ul>

      <div class="mt-4 text-xs text-gray-500">30-day money-back guarantee</div>
    </div>

    <div class="bg-white rounded-xl p-4 shadow mt-4 text-sm text-gray-700">
      <div class="font-medium mb-2">Skills you'll gain</div>
      <div class="flex flex-wrap gap-2">
        <span v-for="(s, i) in course.skills" :key="i" class="px-3 py-1 bg-gray-100 rounded-full text-xs">{{ s }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({ course: Object })

function enrollNow() {
  alert('Start checkout flow or connect wallet')
}
</script>
