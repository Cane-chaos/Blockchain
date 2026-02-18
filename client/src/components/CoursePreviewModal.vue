<template>
  <div class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
    
    <div class="absolute inset-0" @click="$emit('close')"/>

    <div class="relative w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden z-10">
      <iframe :src="youtubeUrl" class="w-full h-full" frameborder="0" allow="autoplay; encrypted-media"
        allowfullscreen/>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  youtubeId: String
})

const youtubeUrl = computed(() =>
  `https://www.youtube.com/embed/${props.youtubeId}?autoplay=1`
)
</script>
