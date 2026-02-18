<template>
  <header class="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
    <nav ref=""
      class="flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-gray-500 to-dark-500 backdrop-blur-xl border border-white/30 shadow-lg shadow-black">
      <router-link to="/" class="text-2xl font-semibold text-white whitespace-nowrap">
        Blockchain Academy
      </router-link>

      <div class="flex-1 flex justify-center">
        <div class="flex items-center gap-6 text-sm text-white relative">
          <router-link to="/" class="hover:text-gray-300"> Home </router-link>

          <div class="relative">
            <button @click.stop="toggleExplore" class="flex items-center gap-1 hover:text-gray-300 focus:outline-none focus:ring-0">
              Explore
              <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div v-if="open" ref="dropdown" @click.stop class="fixed top-full left-1/2 -translate-x-1/2 px-10 w-[920px] bg-white border rounded-xl shadow-2xl p-6 grid grid-cols-3 gap-6 z-50">
              <div>
                <h4 class="font-semibold mb-3 text-black text-xl">Explore roles</h4>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li class="hover:text-indigo-600 cursor-pointer">Data Analyst</li>
                  <li class="hover:text-indigo-600 cursor-pointer">Project Manager</li>
                  <li class="hover:text-indigo-600 cursor-pointer">Cyber Security Analyst</li>
                  <li class="hover:text-indigo-600 cursor-pointer">Data Scientist</li>
                  <li class="hover:text-indigo-600 cursor-pointer">UI / UX Designer</li>
                  <li class="text-indigo-600 cursor-pointer">View all</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold mb-3">Explore categories</h4>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li class="hover:text-indigo-600 cursor-pointer">Artificial Intelligence</li>
                  <li class="hover:text-indigo-600 cursor-pointer">Business</li>
                  <li class="hover:text-indigo-600 cursor-pointer">Data Science</li>
                  <li class="hover:text-indigo-600 cursor-pointer">Information Technology</li>
                  <li class="hover:text-indigo-600 cursor-pointer">Healthcare</li>
                  <li class="text-indigo-600 cursor-pointer">View all</li>
                </ul>
              </div>

              <div>
                <h4 class="font-semibold mb-3">Certificates & Degrees</h4>
                <ul class="space-y-2 text-sm text-gray-700">
                  <li class="hover:text-indigo-600 cursor-pointer">Professional Certificates</li>
                  <li class="hover:text-indigo-600 cursor-pointer">Online Degrees</li>
                  <li class="hover:text-indigo-600 cursor-pointer">Specializations</li>
                  <li class="text-indigo-600 cursor-pointer">View all</li>
                </ul>

                <div class="mt-4">
                  <h5 class="text-sm font-medium text-gray-500 mb-2">Trending skills</h5>
                  <div class="flex flex-wrap gap-2 text-black">
                    <span class="px-3 py-1 bg-gray-100 rounded-full text-xs">Python</span>
                    <span class="px-3 py-1 bg-gray-100 rounded-full text-xs">AI</span>
                    <span class="px-3 py-1 bg-gray-100 rounded-full text-xs">SQL</span>
                    <span class="px-3 py-1 bg-gray-100 rounded-full text-xs">Machine Learning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <router-link to="/profile" class="hover:text-gray-300">Profile</router-link>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center bg-white/90 rounded-lg px-3 py-2 gap-2 w-72">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input v-model="q" @keyup.enter="onSearch" placeholder="What do you want to learn?" class="bg-transparent outline-none text-sm flex-1 text-gray-800" />
        </div>

        <WalletButton />
      </div>
    </nav>
  </header>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import WalletButton from "@/components/WalletButton.vue";
const open = ref(false);
const dropdown = ref(null);
const q = ref("");

const toggleExplore = () => {
  open.value = !open.value;
};

const handleClickOutside = (e) => {
  if (dropdown.value && !dropdown.value.contains(e.target)) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

function onSearch() {
  if (!q.value) return;
  window.location.href = `/explore?q=${encodeURIComponent(q.value)}`;
}
</script>

<style scoped>
header {
  box-shadow: 0 1px 0 rgba(16, 24, 40, 0.04);
}
</style>
