<template>
  <section class="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="max-w-5xl mx-auto px-6">
      <div class="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
        <input type="text" placeholder="Search...." class="flex-grow px-4 py-3 text-gray-700 focus:outline-none" />
        <button class="bg-blue-600 px-6 py-3 text-white font-semibold">
          <i class="fa-solid fa-magnifying-glass me-2"></i>
        </button>
      </div>

      <div class="flex flex-wrap gap-4 mt-6">
        <button v-for="c in categories" :key="c" class="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">{{ c }}</button>
      </div>

      <div class="mt-12">
        <h3 class="text-xl font-bold mb-6">What subscribers are achieving through learning</h3>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(t, i) in testimonials" :key="i"
            class="bg-gray-700 p-6 rounded-lg shadow hover:scale-105 transition">
            <p class="text-gray-300 mb-4">"{{ t.quote }}"</p>
            <p class="font-semibold text-purple-400">— {{ t.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  "Popular", "Business", "Computer Science", "Data Science",
  "Health", "Information Technology", "Arts and Humanities"
]

const testimonials = [
  { name: "Abigail P.", quote: "I have a full-time job and 3 kids. Coursera Plus gave me the flexibility to achieve my goals." },
  { name: "Shi Jie F.", quote: "Blockchain Plus keeps me motivated to learn. With each course, I’m getting more value." },
  { name: "Inés K.", quote: "I appreciate the flexibility. I can try any course and switch without extra cost." }
]
</script>
