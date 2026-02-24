<template>
  <section class="pt-24 bg-gradient-to-r from-gray-700 to-gray-900">
    <div class="bg-gradient-to-r from-gray-700 to-gray-900">
      <div v-if="course">
        <CourseHero :course="course" @preview="handlePreview" />

        <CoursePreviewModal v-if="showPreview" :youtubeId="course.previewVideo" @close="showPreview = false" />

        <StickyEnroll v-if="showSticky" :course="course" :activeTab="activeTab" @jump="scrollTo" />

        <div class="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
          <main class="lg:col-span-2 space-y-16">
            
            <section id="about">
              <CourseAbout :about="course.about" />
            </section>

            <section id="outcomes">
              <CourseOutcomes :learning="course.about.learning" />
            </section>

            <section id="modules">
              <CourseCurriculum :curriculum="course.curriculum" />
            </section>

            <section id="reviews">
              <CourseReviews :reviews="course.reviews" />
            </section>
          </main>

          <aside>
            <CourseSidebar :course="course" />
          </aside>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"

import CourseHero from "@/components/CourseHero.vue"
import CourseSidebar from "@/components/CourseSidebar.vue"
import StickyEnroll from "@/components/StickyEnroll.vue"

import CourseAbout from "@/components/course-tabs/CourseAbout.vue"
import CourseOutcomes from "@/components/course-tabs/CourseOutcomes.vue"
import CourseCurriculum from "@/components/course-tabs/CourseCurriculum.vue"
import CourseReviews from "@/components/course-tabs/CourseReviews.vue"
import CourseTabs from "../components/course-tabs/CourseTabs.vue"
import CoursePreviewModal from "@/components/CoursePreviewModal.vue"

const route = useRoute()
const course = ref(null)
const activeTab = ref("about")

watchEffect(async () => {
  const id = route.params.id
  if (id) {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
      const res = await fetch(`${apiUrl}/courses/${id}`);
      const result = await res.json();
      if (result.data) {
        // Gắn placeholder data để UI CourseDetail không bị lỗi
        course.value = {
          ...result.data,
          subtitle: `Learn ${result.data.title} from scratch`,
          language: 'English',
          level: 'Beginner',
          duration: '4 weeks',
          enrolled: Math.floor(Math.random() * 100000),
          rating: 4.7,
          totalHours: 24,
          articles: 10,
          quizzes: 5,
          cover: result.data.image || "https://placehold.co/800x450",
          instructors: [
            { id: 1, name: 'Senior Instructor', title: 'Blockchain Expert', avatar: 'https://placehold.co/120' }
          ],
          reviews: [
            { id: 1, name: 'Student', rating: 5, text: 'Very good course!' }
          ],
          curriculum: [],
          about: {
            learning: ["Blockchain fundamentals", "Web3 Integration", "Smart Contracts"]
          }
        };
      }
    } catch (e) {
      console.error(e)
    }
  }
})


const SCROLL_OFFSET = 160

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return

  const y =
    el.getBoundingClientRect().top +
    window.pageYOffset -
    SCROLL_OFFSET

  window.scrollTo({
    top: y,
    behavior: "smooth",
  })

  activeTab.value = id
}

const onScroll = () => {
  showSticky.value = window.scrollY > 340

  const ids = ["about", "outcomes", "modules", "reviews"]
  for (const id of ids) {
    const el = document.getElementById(id)
    if (!el) continue

    const rect = el.getBoundingClientRect()
    if (rect.top <= 160 && rect.bottom > 160) {
      activeTab.value = id
      break
    }
  }
}


onMounted(() => {
  window.addEventListener("scroll", onScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll)
})

const showSticky = ref(false)
const showPreview = ref(false)

const handlePreview = () => {
  console.log("PREVIEW CLICKED")
  showPreview.value = true
}
</script>
