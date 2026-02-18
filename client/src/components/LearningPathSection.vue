<template>
  <section class="bg-gradient-to-r from-gray-800 to-gray-900 py-24">
    <div class="max-w-6xl mx-auto px-6 text-center">
      <h2 class="text-4xl font-bold text-white mb-4">
        Choose Your Learning Path
      </h2>
      <p class="text-gray-400 mb-16">
        Ready to become a professional blockchain developer?
      </p>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-gray-700 rounded-2xl p-10 text-left shadow-xl border border-white/20 hover:shadow-purple-500/20 transition">
          <h3 class="text-white text-2xl font-semibold mb-2">Individual</h3>
          <p class="text-gray-400 mb-6">
            Perfect for solo learners
          </p>
          <p class="text-white text-5xl font-bold mb-6">0.10 ETH</p>
          <button
            class="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:bg-purple-700 transition" @click="$router.push('/checkout')">
            Start Your Journey
          </button>

          <ul class="mt-8 space-y-3 text-gray-300">
            <li>✔ Full course access</li>
            <li>✔ Certificate</li>
            <li>✔ Lifetime updates</li>
          </ul>
        </div>

        <div class="bg-gray-700 rounded-2xl p-10 text-left shadow-xl border border-white/20 hover:shadow-purple-500/20 transition">
          <h3 class="text-white text-2xl font-semibold mb-2">Team</h3>
          <p class="text-gray-400 mb-6">
            For teams & companies
          </p>
          <p class="text-white text-5xl font-bold mb-6">0.50 ETH</p>
          <button
            class="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:bg-purple-700 transition" @click="$router.push('/checkout')">
            Get Team Access
          </button>

          <ul class="mt-8 space-y-3 text-gray-300">
            <li>✔ Everything in Individual</li>
            <li>✔ Up to 5 members</li>
            <li>✔ Priority support</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
