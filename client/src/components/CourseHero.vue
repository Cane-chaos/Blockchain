<template>
  <div class="bg-gradient-to-r from-gray-700 to-gray-900">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div
      class="max-w-7xl mx-auto px-12 py-10 grid lg:grid-cols-3 gap-6 items-center rounded-xl border border-white/30 shadow-lg shadow-black">
      <div class="lg:col-span-2">
        <h1 class="text-3xl md:text-4xl font-extrabold text-white">{{ course.title }}</h1>
        <p class="text-gray-600 mt-3 text-white">{{ course.subtitle }}</p>
        <div class="mt-4 flex items-center gap-4 text-sm text-gray-600 text-white">
          <div>{{ course.level }}</div>
          <div>•</div>
          <div>{{ course.duration }}</div>
          <div>•</div>
          <div>{{ course.language }}</div>
        </div>
        <div class="mt-6 flex items-center gap-3 text-white">
          <button class=" bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-3 rounded-lg font-semibold"
            @click="$router.push(`/checkout/${course.id}`)">Enroll</button>
          <button class="border px-6 py-3 rounded-lg hover:scale-105 transition font-semibold hover:bg-blue-500/30"
            @click="$emit('preview')">
            Preview course
          </button>
        </div>
        <div class="mt-4 text-sm text-white">{{ course.enrolled }} learners • {{ course.rating }} <i
            class="fa-solid fa-star text-yellow-500"></i> ({{ course.reviews.length }})</div>
      </div>

      <div class="lg:col-span-1">
        <img :src="course.cover" alt="" class="w-full rounded-lg shadow" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({ course: Object })

function enroll() {
  alert('Enroll clicked — implement checkout flow')
}
defineEmits(["preview"])
</script>
