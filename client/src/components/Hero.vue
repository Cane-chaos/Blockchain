<template>
  <section>
    <div class="text-white py-10 bg-gradient-to-r from-gray-800 to-gray-900">
      <div class="container-max text-center mx-auto">
        <h1 class="text-5xl md:text-6xl font-extrabold leading-tight mb-4">Achieve your career goals with Blockchain</h1>
        <p class="text-lg md:text-xl text-white/90 mb-4 max-w-2xl mx-auto">Subscribe to build job-ready skills from world-class instructors.</p>
          <div class="text-sm text-white/80 mb-4">0.50 ETH/month, cancel anytime</div>
        <div class="flex justify-center gap-4 mb-6">
          <router-link to="/profile" @click="$router.push('/checkout')" class="inline-flex items-center justify-center bg-white text-brand-500 px-8 py-3 rounded-lg font-semibold shadow hover:opacity-95">Start 7-day Free Trial</router-link>
          <router-link to="/CourseDetail" @click="$router.push('/courses')"  class="inline-flex items-center justify-center border border-white/70 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10">Learn More</router-link>
        </div>
         <div class="text-sm text-white/80 mb-4">or 12 ETH/year with 14-day money-back guarantee</div>
         <hr> 
      <div class="container-max mt-4 mb-5">
          <p class="text-center mb-2 ">Learn from 350+ top universities and companies</p>
        <div class="card">
          <div class="card-body mx-auto flex flex-wrap justify-center items-center gap-8 partner-row">
        <img src="https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png" alt="Google" style="height: 50px; width: 100px; margin-right: 30px;" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" style="height: 50px; width: 100px; margin-right: 30px;"  />
        <img src="https://logos-world.net/wp-content/uploads/2023/08/Duke-University-Logo.jpg" alt="Duke" style="height: 50px; width: 100px; margin-right: 30px;" />
        <img src="https://logos-world.net/wp-content/uploads/2022/02/Michigan-Wolverines-Logo-1996.png" alt="Michigan" style="height: 50px; width: 100px; margin-right: 30px;"  />
        <img src="https://www.healthcare-management-degree.net/wp-content/uploads/2019/02/johns-hopkins-university.png" alt="Johns Hopkins" style="height: 50px; width: 100px; margin-right: 30px;" />
        <img src="https://cdn.vanderbilt.edu/vu-news/files/20190417224211/vu06b.jpg" alt="Vanderbilt" style="height: 50px; width: 90px;" />
          </div>
        </div>
      </div>
      <hr>
      </div>
    </div>
  </section>
</template>
