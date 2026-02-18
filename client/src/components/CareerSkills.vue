<template>
  <section class="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-10 items-center">

      <div class="col-span-12 md:col-span-4 flex justify-center">
        <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12" alt="Instructor"
          class="rounded-2xl shadow-lg max-h-[420px] object-cover" style="height: 1000px ;" />
      </div>

      <div class="col-span-12 md:col-span-8">
        <h2 class="text-4xl font-bold mb-4">
          Say Goodbye to Frustration
        </h2>

        <p class="text-gray-300 mb-10 max-w-2xl">
          Our proven system transforms these roadblocks into stepping stones.
          Here's exactly how we solve each challenge.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div v-for="(item, index) in features" :key="index" class="relative bg-gray-700 rounded-2xl p-6
                   shadow-lg border border-white/10
                   hover:shadow-purple-500/20 transition">
                   
            <div class="absolute inset-0 rounded-2xl
                     bg-gradient-to-br from-purple-500/20 to-transparent
                     opacity-0 hover:opacity-100 transition"></div>

            <div class="relative">
              <div class="w-12 h-12 rounded-xl bg-purple-600
                       flex items-center justify-center text-xl mb-4">
                <div class="w-12 h-12 rounded-xl bg-purple-600
         flex items-center justify-center text-xl mb-4">
                  <span v-html="item.icon"></span>
                </div>
              </div>

              <h3 class="text-lg font-semibold mb-2">
                {{ item.title }}
              </h3>

              <p class="text-gray-400 text-sm">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: '<i class="fa-solid fa-graduation-cap"></i>',
    title: 'Master Design Principles',
    desc: 'Master typography, color, spacing & hierarchy with design frameworks.'
  },
  {
    icon: '<i class="fa-solid fa-mobile-screen-button"></i>',
    title: 'Mobile-First Design Mastery',
    desc: 'Build mobile-first with Grid & Flexbox — perfect on every screen.'
  },
  {
    icon: '<i class="fa-solid fa-sack-dollar"></i>',
    title: 'Winning Pricing Strategies',
    desc: 'Use pricing tools, proposals & scripts to charge premium rates.'
  },
  {
    icon: '<i class="fa-solid fa-chart-line"></i>',
    title: 'Build Converting Websites',
    desc: 'Learn UX, conversion tactics & design psychology for real results.'
  }
]
</script>
