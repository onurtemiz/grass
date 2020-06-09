export const LESSON_PATH = (lesson, teacherName) => {
  return `/lessons/${lesson.areaCode}/${lesson.digitCode}/${teacherName}`;
};
export const TEACHER_PATH = (teacher) => {
  return `/teachers/${teacher.name}`;
};

export const CLUB_PATH = (club) => {
  return `/clubs/${club.shortName ? club.shortName : club}`;
};

export const CAMPUS_PATH = (campus) => {
  return `/campuses/${campus.name ? campus.name : campus}`;
};

export const DORM_PATH = (dorm) => {
  return `/dorms/${dorm.name ? dorm.name : dorm}`;
};
