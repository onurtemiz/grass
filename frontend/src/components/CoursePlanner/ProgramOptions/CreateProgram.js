import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import lodash, { keys } from 'lodash';
import { setScenarios } from '../../../reducers/courseReducer';
import { compareNames } from '../../../utils/utils';
const CreateProgram = () => {
  const dispatch = useDispatch();
  const courseRange = useSelector((state) => state.courses.courseRange);
  const scenariosSlider = useSelector((state) => state.courses.scenariosSlider);
  const creditsRange = useSelector((state) => state.courses.creditsRange);
  const requiredCourses = useSelector((state) => state.courses.requiredCourses);
  const conflict = useSelector((state) => state.courses.conflict);
  const tryEmptyDay = useSelector((state) => state.courses.tryEmptyDay);
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const [value, setValue] = useState('Program Oluştur');
  const [isLoading, setIsLoading] = useState(false);

  const createProgram = () => {
    setIsLoading(true);
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
        dispatch(
          setScenarios(
            createWithRequired(courseRange[0], courseRange[1], scenariosSlider)
          )
        );
      } else {
        dispatch(
          setScenarios(
            createWithoutRequired(
              courseRange[0],
              courseRange[1],
              scenariosSlider
            )
          )
        );
      }
      setValue('can');
    }
    setIsLoading(false);
  };

  const getOnlySelectedCourses = (requiredColumns) => {
    let onlys = [];
    let requiredColumnsIds = requiredColumns.map((rcColumn) => {
      let rcColumnIds = rcColumn.courses.map((rcCourse) => rcCourse.id);
      return rcColumnIds;
    });
    requiredColumnsIds = lodash.flatten(requiredColumnsIds);
    selectedCourses.forEach((sc) => {
      if (!requiredColumnsIds.includes(sc.id)) {
        onlys.push(sc);
      }
    });
    return onlys;
  };

  const createWithRequired = (
    minCoursesLength,
    maxCoursesLength,
    maxProgramsLength
  ) => {
    let possibleScenarios = [];
    let requiredColumns = requiredCourses.filter((rc) => rc.courses.length > 0);
    let otherSelectedCourses = getOnlySelectedCourses(requiredColumns);
    let allScenarios = cartesian([...requiredColumns.map((rc) => rc.courses)]);
    for (let t = 0; t < allScenarios.length; t++) {
      if (possibleScenarios.length === maxProgramsLength) break;
      for (let i = 0; i < otherSelectedCourses.length; i++) {
        for (let q = minCoursesLength; q < maxCoursesLength + 1; q++) {
          if (possibleScenarios.length === maxProgramsLength) break;
          let potentialCourses = [...allScenarios[t], otherSelectedCourses[i]];
          let j = i;
          while (
            potentialCourses.length !== q &&
            j !== otherSelectedCourses.length &&
            j + q - potentialCourses.length <= otherSelectedCourses.length
          ) {
            if (
              otherSelectedCourses[i].id !== otherSelectedCourses[j].id &&
              canAddToPotentialCourses(
                potentialCourses,
                otherSelectedCourses[j]
              )
            ) {
              potentialCourses.push(otherSelectedCourses[j]);
            }
            j++;
          }
          if (
            potentialCourses.length > 1 &&
            canAddToScenarios(potentialCourses, possibleScenarios)
          ) {
            possibleScenarios.push(potentialCourses);
          }
        }
      }
    }

    return possibleScenarios;
  };

  const createWithoutRequired = (
    minCoursesLength,
    maxCoursesLength,
    maxProgramsLength
  ) => {
    let possibleScenarios = [];
    for (let i = 0; i < selectedCourses.length; i++) {
      for (let q = minCoursesLength; q < maxCoursesLength + 1; q++) {
        if (possibleScenarios.length === maxProgramsLength) break;
        let potentialCourses = [selectedCourses[i]];
        let j = i;
        while (
          potentialCourses.length !== q &&
          j !== selectedCourses.length &&
          j + q - potentialCourses.length <= selectedCourses.length
        ) {
          if (
            selectedCourses[i].id !== selectedCourses[j].id &&
            canAddToPotentialCourses(potentialCourses, selectedCourses[j])
          ) {
            potentialCourses.push(selectedCourses[j]);
          }
          j++;
        }
        if (
          potentialCourses.length > 1 &&
          canAddToScenarios(potentialCourses, possibleScenarios)
        ) {
          possibleScenarios.push(potentialCourses);
        }
      }
    }
    return possibleScenarios;
  };

  const canAddToScenarios = (potentialCourses, possibleScenarios) => {
    let isDuplicate = false;
    possibleScenarios.forEach((ps) => {
      let isSame = arraysEqual(ps, potentialCourses);
      if (isSame) {
        isDuplicate = true;
      }
    });

    if (
      potentialCourses.length < courseRange[1] &&
      potentialCourses.length >= courseRange[0] &&
      !isDuplicate
    ) {
      return true;
    }
    return false;
  };

  const canAddToPotentialCourses = (potentialCourses, course) => {
    if (
      coursesRangeMatch(potentialCourses) &&
      creditsMatch([...potentialCourses, course]) &&
      emptyDayMatch([...potentialCourses, course]) &&
      conflictMatch([...potentialCourses, course])
    ) {
      return true;
    }
    return false;
  };

  const conflictMatch = (potentialCourses) => {
    const possibleConflictLength = getPossibleConflictLength(potentialCourses);
    if (conflict.makeConflict) {
      return possibleConflictLength > conflict.conflictRange ? false : true;
    }
    return possibleConflictLength > 0 ? false : true;
  };

  const emptyDayMatch = (potentialCourses) => {
    if (!tryEmptyDay) {
      return true;
    }
    let currentDays = getCoursesDays(potentialCourses);
    if (currentDays === 5) {
      return false;
    }
    return true;
  };

  const creditsMatch = (potentialCourses) => {
    const currentCredits = getTotalCoursesCredits(potentialCourses);
    return currentCredits > creditsRange[1] ? false : true;
  };

  const coursesRangeMatch = (potentialCourses) => {
    return potentialCourses.length + 1 > courseRange[1] ? false : true;
  };

  const checkCanProgram = () => {
    const selectedCoursesCredits = getTotalCoursesCredits(selectedCourses);
    if (
      !(selectedCoursesCredits >= creditsRange[0]) ||
      !(selectedCourses.length >= courseRange[0])
    ) {
      return false;
    }
    return true;
  };

  const getCoursesConflictLength = (courses) => {
    let allCellIds = [];
    let unionCellIds = [];
    courses.forEach((course) => {
      allCellIds.push(course.cellIds);
      unionCellIds = lodash.union(unionCellIds, course.cellIds);
    });
    allCellIds = lodash.flatten(allCellIds);
    return allCellIds.length - unionCellIds.length;
  };

  const getPossibleConflictLength = (possibleCourses) => {
    const after = getCoursesConflictLength(possibleCourses);
    return after;
  };

  const getTotalCoursesCredits = (courses) => {
    return courses.reduce((total, c) => {
      return total + Number(c.credits);
    }, 0);
  };

  const getCoursesDays = (courses) => {
    let unionDays = [];
    courses.forEach((c) => {
      unionDays = lodash.union(unionDays, c.days);
    });

    return unionDays.length;
  };

  return (
    <div>
      <Button color="blue" onClick={() => createProgram()} loading={isLoading}>
        {value}
      </Button>
    </div>
  );
};

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.
  let sortedA = a.sort(compareNames);
  let sortedB = b.sort(compareNames);

  for (var i = 0; i < a.length; ++i) {
    if (sortedA[i] !== sortedB[i]) return false;
  }
  return true;
}

function cartesian(arg) {
  var r = [],
    max = arg.length - 1;
  function helper(arr, i) {
    for (var j = 0, l = arg[i].length; j < l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(arg[i][j]);
      if (i == max) r.push(a);
      else helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
}

export default CreateProgram;
