import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';

const CreateProgram = () => {
  const hoursRange = useSelector((state) => state.courses.hoursRange);
  const creditsRange = useSelector((state) => state.courses.creditsRange);
  const requiredCourses = useSelector((state) => state.courses.requiredCourses);
  const conflict = useSelector((state) => state.courses.conflict);
  const tryEmptyDay = useSelector((state) => state.courses.tryEmptyDay);
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const scenarios = useSelector((state) => state.courses.scenarios);
  const [value, setValue] = useState('Program Oluştur');

  const createProgram = () => {
    const canProgram = checkCanProgram();
    if (!canProgram) {
      setValue('cant');
      return;
    } else {
      const requiredColumnsWithCourses = requiredCourses.filter((rc) => {
        if (rc.courses.length > 0) {
          return true;
        } else {
          return false;
        }
      });
      if (requiredColumnsWithCourses.length > 0) {
        // createWithRequired();
      } else {
        createWithoutRequired();
      }
      setValue('can');
    }
  };

  const createWithoutRequired = () => {
    let possibleScenarios = [];
    for (let i = 0; i < selectedCourses.length; i++) {
      let potentialCourses = [selectedCourses[i]];
      for (let j = 0; j < selectedCourses.length; j++) {
        if (selectedCourses[j].id === selectedCourses[i]) {
          continue;
        }
        if (canAddToPotentialCourses(potentialCourses, selectedCourses[j])) {
          potentialCourses.push(selectedCourses[j]);
        } else {
          continue;
        }
      }
      if (potentialCourses.length > 1) possibleScenarios.push(potentialCourses);
    }
    return possibleScenarios;
  };

  const canAddToPotentialCourses = (potentialCourses, course) => {
    if (
      hoursMatch(potentialCourses, course) &&
      creditsMatch(potentialCourses, course) &&
      emptyDayMatch(potentialCourses, course) &&
      conflictMatch(potentialCourses, course)
    ) {
      return true;
    }
    return false;
  };

  const conflictMatch = (potentialCourses, course) => {
    const possibleConflictLength = getPossibleConflictLength(
      potentialCourses,
      course
    );
    if (conflict.makeConflict) {
      return possibleConflictLength > conflict.conflictRange ? false : true;
    }
    return possibleConflictLength > 0 ? false : true;
  };

  const emptyDayMatch = (potentialCourses, course) => {
    if (!tryEmptyDay) {
      return true;
    }
    let currentDays = getCoursesDays(potentialCourses);
    course.days.forEach((courseDay) => {
      if (!currentDays.includes(courseDay)) {
        return false;
      }
    });
    return true;
  };

  const creditsMatch = (potentialCourses, course) => {
    const currentCredits = getTotalCoursesCredits(potentialCourses);
    return currentCredits + Number(course.credits) > creditsRange[1]
      ? false
      : true;
  };

  const hoursMatch = (potentialCourses, course) => {
    const currentHours = getTotalCoursesHours(potentialCourses);
    return currentHours + course.hours.length > hoursRange[1] ? false : true;
  };

  const checkCanProgram = () => {
    const selectedCoursesCredits = getTotalCoursesCredits(selectedCourses);
    const selectedCoursesHours = getTotalCoursesHours(selectedCourses);
    if (
      !(selectedCoursesCredits >= creditsRange[0]) ||
      !(selectedCoursesHours >= hoursRange[0])
    ) {
      return false;
    }
    return true;
  };

  const getCoursesConflictLength = (courses) => {
    let conflicts = 0;
    for (let i = 0; i < courses.length; i++) {
      for (let j = i; j < courses.length; j++) {
        const isSame = courses[i].id === courses[j];
        if (isSame) continue;
        console.log('j', j);

        console.log('courses[j+1]', courses[j]);

        console.log('courses', courses);
        const commons = courses[i].cellIds.filter((value) =>
          courses[j].cellIds.includes(value)
        );
        conflicts += commons.length;
      }
    }
    return conflicts;
  };

  const getPossibleConflictLength = (possibleCourses, course) => {
    const after = getCoursesConflictLength([...possibleCourses, course]);
    return after;
  };

  const getTotalCoursesCredits = (courses) => {
    return courses.reduce((total, c) => {
      return total + Number(c.credits);
    }, 0);
  };

  const getTotalCoursesHours = (courses) => {
    return courses.reduce((total, c) => {
      return total + c.hours.length;
    }, 0);
  };

  const getCoursesDays = (courses) => {
    let days = [];
    courses.forEach((c) => {
      c.days.forEach((courseDay) => {
        if (!days.includes(courseDay)) {
          days.push(courseDay);
        }
      });
    });
    return days;
  };

  return (
    <div>
      <Button color="blue" onClick={() => createProgram()}>
        {value}
      </Button>
    </div>
  );
};

export default CreateProgram;
