<template>
  <footer class="relative bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 py-10 border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.4)]">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
    <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
      <div>
        <h3 class="text-white font-bold mb-4">Blockchain Academy</h3>
        <p class="text-sm">Learn blockchain, smart contracts, and Web3 development from world-class instructors.</p>
      </div>

      <div>
        <h3 class="text-white font-bold mb-4">Quick Links</h3>
        <ul class="space-y-2 text-sm ms-2">
          <li><router-link to="/" class="hover:text-white"> <i class="fa-solid fa-house me-2"></i>Home</router-link></li>
          <li><router-link to="/profile" class="hover:text-white"><i class="fa-solid fa-circle-user me-2"></i>Profile</router-link></li>
          <li><router-link to="/courses"><i class="fa-solid fa-lines-leaning me-2"></i>Courses</router-link></li>
        </ul>
      </div>

      <div>
        <h3 class="text-white font-bold mb-4">Contact</h3>
        <p class="text-sm"><i class="fa-solid fa-envelope"></i> support@blockchainacademy.com</p>
        <p class="text-sm"><i class="fa-solid fa-globe text-blue-500"></i> www.blockchainacademy.com</p>
      </div>
    </div>
    <div class="mt-8 text-center text-sm text-gray-500">© 2026 Blockchain Academy. All rights reserved.</div>
  </footer>
</template>
