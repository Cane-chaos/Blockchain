<template>
  <div class="space-y-3">
    <div v-for="(m, idx) in modules" :key="idx" class="border rounded-lg overflow-hidden bg-white">
      <button @click="toggle(idx)" class="w-full text-left px-4 py-3 flex items-center justify-between">
        <div>
          <div class="font-semibold">{{ m.title }}</div>
          <div class="text-sm text-gray-500">{{ m.lessons.length }} lessons • {{ m.duration }}</div>
        </div>
        <svg :class="{ 'transform rotate-180': open === idx }" class="w-5 h-5 text-gray-500 transition-transform"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-show="open === idx" class="px-4 pb-4 mt-3">
        <ul class="space-y-2">
          <li v-for="(l, i) in m.lessons" :key="i" class="flex items-center gap-3 text-sm text-gray-700">
            <svg class="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10l-4-2-4 2V5z" />
            </svg>
            <div>
              <div class="font-medium">{{ l.title }}</div>
              <div class="text-xs text-gray-500">{{ l.length }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ modules: Array })
const open = ref(null)
function toggle(i) { open.value = open.value === i ? null : i }
</script>
