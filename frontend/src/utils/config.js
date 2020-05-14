export const LESSON_PATH = (lesson) =>
  `/lessons/${lesson.areaCode}/${lesson.digitCode}/${lesson.sectionCode}`;
export const TEACHER_PATH = (teacher) => {
  return `/teachers/${teacher.name}`;
};
