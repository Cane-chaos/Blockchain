// đơn giản dùng fetch local JSON; khi có backend đổi URL tương ứng
export async function fetchCourses() {
  const res = await fetch('/src/services/courses.json');
  if (!res.ok) throw new Error('Cannot load courses');
  return res.json();
}

export async function fetchCourseById(id) {
  const courses = await fetchCourses();
  return courses.find(c => String(c.id) === String(id) || c.slug === id);
}
