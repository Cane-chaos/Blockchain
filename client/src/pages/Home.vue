<template>
  <div class="bg-gradient-to-r from-gray-800 to-gray-900">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
    <section class="pt-24">
      <Hero />
    </section>
    <VideoSection thumbnail="https://via.placeholder.com/800x450?text=Blockchain+Video" video="https://www.youtube.com/embed/gdiao7L9GjE?si=Bm0nUuHK5VkrYa_-" />
    <ExploreSection />
    <section class=" max-w-6xl mx-auto px-6 py-12 ">
      <h2 class="text-2xl font-bold mb-6 text-white">Available Courses</h2>
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        <CourseCard v-for="course in visibleCourses" :key="course.id" :course="course" />

        <div v-if="!expanded" class="flex items-center justify-center rounded-xl border-2 border-dashed border-indigo-400 text-indigo-400 cursor-pointer hover:bg-indigo-500/10 transition mt-3" @click="expandCourses">
          <span class="text-1xl font-bold text-white"><i class="fa-solid fa-angles-down me-2"></i>More...</span>
        </div>

        <div v-if="expanded" class="text-center flex items-center justify-center flex items-center justify-center rounded-xl border-2 border-dashed border-indigo-400 text-indigo-400 cursor-pointer hover:bg-indigo-500/10 transition mt-3">
          <RouterLink to="/courses" class="text-white"><i class="fa-solid fa-right-from-bracket ms-2"></i> View all courses</RouterLink>
        </div>
      </div>

    </section>
    <TestimonialsSection />
    <CareerSkills />
    <LearningPathSection />
    <FaqSection />
  </div>
</template>

<script setup>
import Hero from "@/components/Hero.vue"
import CourseCard from "@/components/CourseCard.vue"
import courses from "@/services/courses.json"
import CareerSkills from '@/components/CareerSkills.vue'
import VideoSection from '@/components/VideoSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import FaqSection from '@/components/FaqSection.vue'
import LearningPathSection from '@/components/LearningPathSection.vue'

import { ref, computed } from 'vue'

const expanded = ref(false)

const visibleCourses = computed(() => {
  return expanded.value
    ? courses.slice(0, 5)   
    : courses.slice(0, 2)   
})

function expandCourses() {
  expanded.value = true
}
</script>
