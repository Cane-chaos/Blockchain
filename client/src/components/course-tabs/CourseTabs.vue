<template>
  <div class="sticky top-0 bg-white z-40 border-b ">
    <div class="max-w-6xl mx-auto px-6 flex gap-8 ">
      <button v-for="tab in tabs" :key="tab.id" @click="$emit('jump', tab.id)" class="py-4 font-medium" 
      :class="activeTab === tab.id? 'text-blue-600 border-b-2 border-blue-600': 'text-gray-500'">{{ tab.label }}</button>
    </div>
  </div>
</template>

<script setup>
defineProps({ activeTab: String })

const tabs = [
  { id: "about", label: "About" },
  { id: "outcomes", label: "Outcomes" },
  { id: "modules", label: "Modules" },
  { id: "reviews", label: "Reviews" },
]
</script>
