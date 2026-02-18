<template>
  <div class="bg-white rounded-xl p-6">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
    <h2 class="text-2xl font-semibold mb-4">What you'll learn</h2>
    <ul class="grid sm:grid-cols-2 gap-3">
      <li v-for="(item, i) in learning" :key="i" class="flex gap-2">
        <span> <i class="fa-solid fa-square-check ms-2 text-green-500 "></i> {{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ learning: Array })
</script>
