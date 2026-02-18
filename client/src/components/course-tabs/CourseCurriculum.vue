<template>
  <div class="bg-white rounded-xl p-6">
    <h2 class="text-2xl font-semibold mb-6">Modules</h2>

    <div v-for="(m, i) in curriculum" :key="i" class="mb-4 border rounded-xl overflow-hidden">
      <!-- Header -->
      <button class="w-full flex justify-between items-center p-4
               bg-gray-100 hover:bg-gray-200 transition" @click="toggle(i)">
        <span class="font-medium text-left">
          {{ m.title }}
        </span>

        <svg class="w-5 h-5 transition-transform duration-300" :class="{ 'rotate-180': openIndex === i }" fill="none"
          stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Content -->
      <div v-if="openIndex === i" class="p-4 border-t">
        <ul class="space-y-2 text-gray-700">
          <li v-for="(l, j) in m.lessons" :key="j" class="flex items-center gap-2">
            <i class="fa-solid fa-square-check text-emerald-500"></i>
            {{ l }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue"

defineProps({
  curriculum: Array
})

const openIndex = ref(null)

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>