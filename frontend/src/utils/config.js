export const LESSON_PATH = (lesson, teacherName) => {
  return lesson.teacher && lesson.teacher.name
    ? `/lessons/${lesson.areaCode}/${lesson.digitCode}/${lesson.teacher.name}`
    : `/lessons/${lesson.areaCode}/${lesson.digitCode}/${teacherName}`;
};
export const TEACHER_PATH = (teacher) => {
  return `/teachers/${teacher.name}`;
};

export const USER_PATH = (user) => {
  return `/users/${user.username ? user.username : user}`;
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

export const QUESTION_PATH = (question) => {
  return `/questions/${
    question.questionId
      ? question.questionId
      : question.id
      ? question.id
      : question
  }`;
};
