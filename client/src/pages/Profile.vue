<template>
  <div class="bg-gradient-to-r from-gray-700 to-gray-900 py-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
      integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
    <section class="pt-24">
      <div class="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-4">

        <div class="col-span-12 md:col-span-4 space-y-6">
          <div class="bg-gradient-to-r from-indigo-100 to-blue-200 rounded-xl shadow p-6 text-center">
            <div class="flex justify-center my-4">
              <div class="w-24 h-24 rounded-full bg-pink-600 text-white flex items-center justify-center text-4xl font-bold">H</div>
            </div>

            <h2 class="text-xl font-semibold">Hiền Phan</h2>

            <button class="mt-4 border border-pink-700 text-dark bg-white
                   px-4 py-2 rounded-lg text-sm hover:bg-pink-100">
              <i class="fa-solid fa-link me-1"></i> Share profile link
            </button>

            <p class="mt-4 text-sm text-dark/10 cursor-pointer">Update profile visibility</p>
          </div>

          <div class="bg-gradient-to-r from-indigo-100 to-blue-200 rounded-xl shadow p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-semibold">Work preferences</h3>
            </div>

            <p class="text-sm text-dark mb-2">Desired roles</p>

            <ul class="space-y-2 text-sm">
              <li><i class="fa-solid fa-user me-2"></i>Data Scientist</li>
              <li><i class="fa-solid fa-user me-2"></i>IT Project Manager</li>
              <li><i class="fa-solid fa-user me-2"></i>Data Scientist</li>
              <li><i class="fa-solid fa-user me-2"></i>IT Project Manager</li>
            </ul>
          </div>

          <div class="bg-gradient-to-r from-indigo-100 to-blue-200 rounded-xl shadow p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-semibold">Additional info</h3>
            </div>
            <p class="text-sm text-dark mb-2">Help recruiters get to know you better by describing what makes you a great candidate and sharing other links.</p>
            <button class="border border-pink-700 text-dark bg-white px-4 py-2 rounded-lg text-sm hover:bg-pink-100">+ Add a additional info</button>
          </div>
        </div>

        <div class="col-span-12 md:col-span-8 space-y-10">
          <section>
            <h2 class="text-2xl font-bold mb-4 text-white">Experience</h2>

            <div class="bg-gradient-to-r from-indigo-100 to-blue-200 rounded-xl shadow p-6 mb-6">
              <div class="flex justify-between items-center">
                <h3 class="font-semibold">Projects</h3>
                <span class="text-gray text-sm cursor-pointer">Browse Projects</span>
              </div>

              <div class="mt-4 bg-white p-4 rounded-lg text-sm text-dark">Showcase your skills to recruiters with job-relevant projects. Add projects here to demonstrate your technical expertise and ability to solve real-world problems.
              </div>
            </div>

            <div class="bg-gradient-to-r from-indigo-100 to-blue-200 rounded-xl shadow p-6">
              <div class="flex justify-between items-center">
                <h3 class="font-semibold">Work history</h3>
                <button class="border border-pink-700 text-dark bg-white px-4 py-2 rounded-lg text-sm hover:bg-pink-100">+ Add work experience</button>
              </div>

              <div class="mt-4 bg-white p-4 rounded-lg text-sm text-dark">Add your past work experience here. If you’re just starting out, you can add internships or volunteer experience instead.
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-2xl font-bold mb-4 text-white">Education</h2>

            <div class="bg-gradient-to-r from-indigo-100 to-blue-200 rounded-xl shadow p-6 flex justify-between items-center">
              <h3 class="font-semibold">Credentials <i class="fa-solid fa-circle-info  ms-2"></i></h3>
              <button class="border border-pink-700 text-dark bg-white px-4 py-2 rounded-lg text-sm hover:bg-pink-100">+ Add</button>
            </div>
          </section>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
// truyền props hoặc lấy dữ liệu từ API thật
</script>
