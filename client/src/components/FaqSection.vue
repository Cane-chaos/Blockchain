<template>
  <section class="max-w-5xl mx-auto px-2 py-4">
    <h2 class="text-2xl font-bold text-white mb-6">
      Frequently asked questions
    </h2>

    <div class="bg-white rounded-xl border divide-y mb-6">
      <div v-for="(item, index) in faqs" :key="index" class="p-6">
        <button class="w-full flex justify-between items-center text-left focus:outline-none focus:ring-0" @click="toggle(index)">
          <span class="font-semibold text-gray-900">
            {{ item.question }}
          </span>

          <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': openIndex === index }"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div v-if="openIndex === index" class="mt-4 text-gray-700 text-sm leading-relaxed">
          <p v-html="item.answer"></p>
        </div>
      </div>

    </div>

    <div class="text-center">
      <a class="text-white font-medium hover:underline">
        Show all frequently asked questions
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(0)

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const faqs = [
  {
    question:
      "Can I try Coursera Plus first, to make sure it's right for me?",
    answer: `<p> Yes! We have two options, depending on which payment plan you choose.</p>
      <p> If you opt to make monthly payments, you can take advantage of a <strong> 7-day free trial </strong> to experience learning before you decide to purchase.</p>
      <p> If you opt to make an annual payment, you'll have up to <strong>14 days</strong> to submit a refund request.</p>`
  },
  {
    question: "What is included in Coursera Plus?",
    answer:
      "Coursera Plus includes unlimited access to thousands of courses, projects, and certificates from top universities and companies."
  },
  {
    question: "Will I save money with Coursera Plus?",
    answer:
      "Yes. Learners typically save money if they complete more than one course or certificate per year."
  }
]
</script>
