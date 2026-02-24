import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import CourseDetail from "@/pages/CourseDetail.vue";
import Profile from "@/pages/Profile.vue";
import Explore from "@/pages/Explore.vue";
import Courses from "@/pages/Courses.vue";

const routes = [
  { path: "/", name: "Home", component: Home },

  { path: "/explore", name: "Explore", component: Explore },
  { path: "/profile", name: "Profile", component: Profile },

  {
    path: "/courses/:id",
    name: "CourseDetail",
    component: CourseDetail,
    props: true,
  },
  {
    path: "/courses",
    name: "Courses",
    component: Courses,
  },
  {
    path: "/checkout/:id",
    name: "Checkout",
    component: () => import("@/pages/Checkout.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return {
      top: 0,
      behavior: "smooth",
    };
  },
});
export default router;
