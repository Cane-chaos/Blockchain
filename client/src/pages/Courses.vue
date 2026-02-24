<template>
  <section class="pt-24 bg-gradient-to-r from-gray-700 to-gray-900">
    <div class="bg-gradient-to-r from-gray-700 to-gray-900  p-10 text-white">
      <h1 class="text-3xl font-bold mb-8">All Courses</h1>

      <div v-if="courses.length > 0" class="grid md:grid-cols-3 gap-6">
        <div v-for="course in courses" :key="course.id"
          class="bg-gradient-to-r from-gray-700 to-gray-600 border border-white/30 shadow-lg shadow-black rounded-xl overflow-hidden shadow hover:scale-105 transition">
          <img :src="course.image" class="h-40 w-full object-cover" />

          <div class="p-5 space-y-3">
            <h3 class="text-lg font-semibold">{{ course.title }}</h3>
            <p class="text-sm text-gray-400">{{ course.instructor || 'Instructor' }}</p>
            <router-link :to="`/courses/${course.id}`" class="inline-block mt-3  bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 rounded hover:bg-purple-700">
              View Detail
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-20">
        <p class="text-gray-400 text-lg">Đang tải danh sách khóa học từ Server...</p>
      </div>
    </div>
  </section>

</template>

<script setup>
import { ref, onMounted } from 'vue'

const courses = ref([])

onMounted(async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
    const res = await fetch(`${apiUrl}/courses`);
    const result = await res.json();
    if (result.data) {
      courses.value = result.data;
    }
  } catch (error) {
    console.error("Lỗi khi tải danh sách khóa học:", error);
  }
})
</script>
