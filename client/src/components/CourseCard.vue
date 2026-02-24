<template>
  <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden border border-gray-100">
    <div class="h-44 w-full overflow-hidden">
      <img :src="course.image" :alt="course.title" class="w-full h-full object-cover" />
    </div>
    <div class="p-5 text-center">
      <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ course.title }}</h3>
      <p class="text-sm text-start text-gray-600 mb-2">Instructor: {{ course.instructor }}</p>
      <p class="text-sm text-start text-gray-600 mb-2">Time: {{ course.duration }}</p>
    <button v-if="course.level == 'Beginner'" class="btn btn-sm btn-primary">{{ course.level }}</button>
     <button v-else class="btn btn-sm btn-primary">Beginner</button>
      <div class="flex items-center justify-between gap-4">
        <div class="text-blue-600 font-bold">{{ course.price }}</div>
        <router-link :to="`/courses/${course.id}`" class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-md hover:bg-brand-600">View Details</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ course: Object })
</script>
