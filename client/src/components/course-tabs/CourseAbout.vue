<template>
  <div class="bg-white rounded-xl p-6">
    <h2 class="text-2xl font-semibold mb-4">About this course</h2>
    <p class="text-gray-700">
      {{ about.description }}
    </p>
  </div>
</template>

<script setup>
defineProps({ about: Object })
</script>
