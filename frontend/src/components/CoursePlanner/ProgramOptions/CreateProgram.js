import React, { useState, useRef } from 'react';
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
  const loading = useRef(false);

  const createProgram = () => {
    loading.current = true;
    const canProgram = checkCanProgram();
    if (!canProgram) {
      setValue('Program Oluşturulamıyor');
      loading.current = false;

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
        dispatch(setScenarios(createWithRequired(scenariosSlider)));
      } else {
        dispatch(setScenarios(createWithoutRequired(scenariosSlider)));
      }
    }
    loading.current = false;

    setValue('Program Oluşturuldu');
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

  const createWithRequired = (maxProgramsLength) => {
    let possibleScenarios = [];
    let requiredColumns = requiredCourses.filter((rc) => rc.courses.length > 0);
    let otherSelectedCourses = getOnlySelectedCourses(requiredColumns);
    let requiredCoursesCourses = [...requiredColumns.map((rc) => rc.courses)];
    let randomSelected = shuffle(otherSelectedCourses);

    let max = requiredCoursesCourses.length - 1;
    function helper(arr, i) {
      for (var j = 0, l = requiredCoursesCourses[i].length; j < l; j++) {
        if (possibleScenarios.length === maxProgramsLength) break;

        var a = arr.slice(0); // clone arr
        a.push(requiredCoursesCourses[i][j]);
        if (i == max) {
          let w = randomSelected.length;
          for (var r = 0; r < Math.pow(2, w); r++) {
            var subset = [...a];
            for (var g = 0; g < w; g++) {
              if (subset.length > courseRange[1]) break;
              if ((r & (1 << g)) > 0) subset.push(randomSelected[g]);
            }

            if (possibleScenarios.length === maxProgramsLength) break;

            if (
              subset.length <= courseRange[1] &&
              subset.length >= courseRange[0] &&
              canAddToScenarios(subset, possibleScenarios) &&
              canAddToPotentialCoursesWithout(subset)
            ) {
              possibleScenarios.push(subset);
            }
          }
        } else helper(a, i + 1);
      }
    }
    helper([], 0);

    return possibleScenarios;
  };

  const createWithoutRequired = (maxProgramsLength) => {
    let possibleScenarios = [];
    let randomSelected = shuffle(selectedCourses);
    let w = randomSelected.length;
    for (var r = 0; r < Math.pow(2, w); r++) {
      var subset = [];
      for (var g = 0; g < w; g++) {
        if (subset.length > courseRange[1]) break;
        if ((r & (1 << g)) > 0) subset.push(randomSelected[g]);
      }

      if (possibleScenarios.length === maxProgramsLength) break;

      if (
        subset.length <= courseRange[1] &&
        subset.length >= courseRange[0] &&
        canAddToScenarios(subset, possibleScenarios) &&
        canAddToPotentialCoursesWithout(subset)
      ) {
        possibleScenarios.push(subset);
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
      potentialCourses.length <= courseRange[1] &&
      potentialCourses.length >= courseRange[0] &&
      !isDuplicate
    ) {
      return true;
    }
    return false;
  };

  const canAddToPotentialCoursesWithout = (potentialCourses) => {
    if (
      coursesRangeMatch(potentialCourses) &&
      creditsMatch(potentialCourses) &&
      emptyDayMatch(potentialCourses) &&
      conflictMatch(potentialCourses)
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
      <Button
        color="blue"
        onClick={() => createProgram()}
        loading={loading.current}
        fluid
      >
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

function cartesian(
  arg,
  possibleScenarios,
  maxProgramsLength,
  canAddToPotentialCoursesWithout,
  canAddToScenarios,
  otherSelectedCourses
) {
  var r = [],
    max = arg.length - 1;
  function helper(arr, i) {
    for (var j = 0, l = arg[i].length; j < l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(arg[i][j]);
      if (i == max) {
        r.push(a);
        let n = otherSelectedCourses.length;
        for (var e = 0; i < Math.pow(2, n); e++) {
          var subset = [...a];
          for (var z = 0; z < n; z++) {
            if ((e & (1 << z)) > 0) subset.push(otherSelectedCourses[j]);
          }
          if (possibleScenarios.length === maxProgramsLength) break;
          console.log(subset);
          if (
            subset.length > 1 &&
            canAddToScenarios(subset, possibleScenarios) &&
            canAddToPotentialCoursesWithout(subset)
          ) {
            possibleScenarios.push(subset);
          }
        }
      } else helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
}

const betterCombine = (set) => {
  let n = set.length;
  var allSubsets = [];
  for (var i = 0; i < Math.pow(2, n); i++) {
    var subset = [];
    for (var j = 0; j < n; j++) {
      if ((i & (1 << j)) > 0) subset.push(set[j]);
    }
    allSubsets.push(subset);
  }
  return allSubsets;
};

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default CreateProgram;
