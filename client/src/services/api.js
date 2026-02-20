import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  timeout: 15000
});

export async function getCourses() {
  const res = await api.get("/api/courses");
  return res.data.data;
}

export async function getCourseById(id) {
  const res = await api.get(`/api/courses/${id}`);
  return res.data.data;
}

// optional hybrid storage
export async function enrollBackup({ wallet, courseId, txHash }) {
  const res = await api.post("/api/user/enroll", { wallet, courseId, txHash });
  return res.data;
}

export async function getEnrollments(wallet) {
  const res = await api.get("/api/user/enrollments", { params: { wallet } });
  return res.data.data;
}