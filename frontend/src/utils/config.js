export const LESSON_PATH = (lesson, teacherName) => {
  return `/lessons/${lesson.areaCode}/${lesson.digitCode}/${teacherName}`;
};
export const TEACHER_PATH = (teacher) => {
  return `/teachers/${teacher.name}`;
};

export const CLUB_PATH = (club) => {
  return `/clubs/${club.shortName ? club.shortName : club}`;
};
