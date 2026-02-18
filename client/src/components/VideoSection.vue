<template>
  <section class="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
    <div class="card mb-3 flex flex-col items-center justify-center">
      <div class="relative video-container" style="width: 900px;">
        <iframe :src="videoUrl" class="w-full h-64 rounded-lg shadow-lg object-cover transform transition group-hover:scale-105 group-hover:shadow-xl hover-animate"
          style="height: 500px;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
        </iframe>
      </div>
      <div class="card-body flex flex-col items-center justify-center">
        <div>
          <h2 class="text-3xl font-bold mb-4 mt-4 text-center">Explore case studies</h2>
          <p class="text-gray-300 mb-6 text-center">
            See how learners and companies apply blockchain skills in real projects.
          </p>
        </div>
      </div>
      <button class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-md font-semibold shadow hover:opacity-95">
        Explore case studies
      </button>
    </div>

    <div class="max-w-7xl mx-auto px-6 mt-12 flex flex-col items-center justify-center">
      <h3 class="text-center text-gray-400 mb-6">Trusted by</h3>
      <div class="overflow-hidden">
        <div class="flex gap-12 animate-marquee">
          <img v-for="(p, i) in partners" :key="i" :src="p.logo" :alt="p.name" class="h-10 opacity-80" />
          <!-- <img v-for="(p,i) in partners" :key="'dup'+i" :src="p.logo" :alt="p.name" class="h-10 opacity-80" /> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  video: { type: String, default: 'https://www.youtube.com/embed/gdiao7L9GjE' }
})

const videoUrl = props.video + '?autoplay=1'

const partners = [
  { name: 'Google', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png' },
  { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
  { name: 'Duke', logo: 'https://logos-world.net/wp-content/uploads/2023/08/Duke-University-Logo.jpg' },
  { name: 'Michigan', logo: 'https://logos-world.net/wp-content/uploads/2022/02/Michigan-Wolverines-Logo-1996.png' },
  { name: 'Johns Hopkins', logo: 'https://www.healthcare-management-degree.net/wp-content/uploads/2019/02/johns-hopkins-university.png' },
  { name: 'Vanderbilt', logo: 'https://cdn.vanderbilt.edu/vu-news/files/20190417224211/vu06b.jpg' }
]
</script>

<style scoped>
@keyframes marquee-reset-smooth {
  0% {
    transform: translateX(100%);
    opacity: 1;
  }

  90% {
    transform: translateX(-100%);
    opacity: 1;
  }

  91% {
    transform: translateX(-100%);
    opacity: 0;
  }

  92% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(100%);
    opacity: 1;
  }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee-reset-smooth 12s linear infinite;
}
</style>
