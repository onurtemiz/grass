export const LESSON_PATH = (lesson) => {
  return `/lessons/${lesson.areaCode.toLowerCase()}/${lesson.digitCode}/${
    lesson.parentName
  }`;
};
export const TEACHER_PATH = (teacher) => {
  return `/teachers/${teacher.name}`;
};

export const USER_PATH = (user) => {
  return `/users/${user.username ? user.username : user}`;
};

export const CLUB_PATH = (club) => {
  return `/community/${club.name ? club.name : club}`;
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
