<template>
  <div class="sticky top-0 z-50 bg-gradient-to-r from-gray-700 to-gray-900 border-b shadow-sm ">

    <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
      <h2 class="font-semibold text-xl truncate text-white">{{ course.title }}</h2>

      <div class="text-white font-bold whitespace-nowrap text-2xl">{{ course.price }}</div>
    </div>

    <div class="border-t ">
      <div class="max-w-7xl mx-auto px-6 flex gap-8">
        <button v-for="tab in tabs" :key="tab.id" @click="jumpTo(tab.id)" class="py-3 font-medium transition relative focus:outline-none focus:ring-0" 
        :class="activeTab === tab.id? 'text-gray-100' : 'text-white hover:text-blue-200'">
          {{ tab.label }}

          <span v-if="activeTab === tab.id" class="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-orange-600" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  course: Object,
  activeTab: String
})

const emit = defineEmits(["jump"])

const tabs = [
  { id: "about", label: "About" },
  { id: "outcomes", label: "Outcomes" },
  { id: "modules", label: "Modules" },
  { id: "reviews", label: "Reviews" },
]

const jumpTo = (id) => {
  emit("jump", id)
}
</script>
