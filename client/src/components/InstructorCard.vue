<template>
  <div class="flex items-center gap-4 bg-white">
    <img :src="instructor.avatar" alt="" class="w-14 h-14 rounded-full object-cover" />
    <div>
      <div class="font-semibold">{{ instructor.name }}</div>
      <div class="text-sm text-gray-500">{{ instructor.title }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  instructor: {
    type: Object,
    default: () => ({ name: 'Instructor', title: '', avatar: 'https://via.placeholder.com/120' })
  }
})
</script>
