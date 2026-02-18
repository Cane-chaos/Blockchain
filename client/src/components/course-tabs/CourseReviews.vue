<template>
  <div class="bg-white rounded-xl p-6">
    <h2 class="text-2xl font-semibold mb-4">Student reviews</h2>
    <div v-if="reviews.length === 0" class="text-gray-500">
      No reviews yet.
    </div>

    <div v-for="(r, i) in reviews" :key="i" class="mb-4 border-b pb-4">
      <div class="font-semibold">{{ r.user }}</div>
      <div class="text-yellow-500"><i class="fa-solid fa-star"></i> {{ r.rating }}/5</div>
      <p class="text-gray-700">{{ r.comment }}</p> 
    </div>
  </div>
</template>

<script setup>
defineProps({ reviews: Array })
</script>
