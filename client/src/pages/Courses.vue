<template>
  <section class="pt-24 bg-gradient-to-r from-gray-700 to-gray-900">
    <div class="bg-gradient-to-r from-gray-700 to-gray-900  p-10 text-white">
      <h1 class="text-3xl font-bold mb-8">All Courses</h1>

      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="course in courses" :key="course.id"
          class="bg-gradient-to-r from-gray-700 to-gray-600 border border-white/30 shadow-lg shadow-black rounded-xl overflow-hidden shadow hover:scale-105 transition">
          <img :src="course.image" class="h-40 w-full object-cover" />

          <div class="p-5 space-y-3">
            <h3 class="text-lg font-semibold">{{ course.title }}</h3>
            <p class="text-sm text-gray-400">{{ course.instructor }}</p>
            <router-link :to="`/courses/${course.slug}`" class="inline-block mt-3  bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 rounded hover:bg-purple-700">
              View Detail
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>
import courses from '@/services/courses.json'
</script>
