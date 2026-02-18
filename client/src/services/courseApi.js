import courses from './courses.json'

export async function fetchCourseBySlug(slug) {
  const course = courses.find(c => c.slug === slug)
  if (!course) return null

  return {
    ...course,
    subtitle: `Learn ${course.title} from scratch`,
    language: 'English',
    enrolled: Math.floor(Math.random() * 100000),
    rating: 4.7,
    totalHours: 24,
    articles: 10,
    quizzes: 5,
    instructors: [
      {
        id: 1,
        name: course.instructor,
        title: 'Senior Instructor',
        avatar: 'https://via.placeholder.com/120'
      }
    ],
    reviews: [
      { id: 1, name: 'Student', rating: 5, text: 'Very good course!' }
    ],
    faqs: [
      { q: 'Do I need experience?', a: 'Basic JS is enough.' }
    ]
  }
}
