import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Progress } from 'semantic-ui-react';
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
  const scenarios = useSelector((state) => state.courses.scenarios);
  const tryEmptyDay = useSelector((state) => state.courses.tryEmptyDay);
  const selectedCourses = useSelector((state) => state.courses.selectedCourses);
  const [value, setValue] = useState('Program Oluştur');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      createWithParams(
        requiredCourses,
        dispatch,
        createWithRequired,
        scenariosSlider,
        createWithoutRequired
      );
    }
  }, [loading]);

  const createProgram = async () => {
    const canProgram = checkCanProgram();
    if (!canProgram) {
      setValue('Program Oluşturulamıyor');
      return;
    }
    setLoading(true);
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

    let stackedSelectedCourses = stackedCourses([
      ...otherSelectedCourses,
    ]).map((stack) => [, ...stack.courses]);

    loopTwoTimesStack(
      requiredCoursesCourses,
      stackedSelectedCourses,
      possibleScenarios,
      maxProgramsLength
    );

    return possibleScenarios;
  };

  const createWithoutRequired = (maxProgramsLength) => {
    let possibleScenarios = [];
    let stackedSelectedCourses = stackedCourses(
      selectedCourses
    ).map((stack) => [, ...stack.courses]);

    loopOverStack(stackedSelectedCourses, possibleScenarios, maxProgramsLength);
    return possibleScenarios;
  };

  const loopTwoTimesStack = (
    requiredStack,
    optionalStack,
    scenario,
    length
  ) => {
    let max = requiredStack.length - 1;
    function helper(arr, i) {
      for (var j = 0, l = requiredStack[i].length; j < l; j++) {
        if (scenario.length === length) break;

        var a = arr.slice(0);
        a.push(requiredStack[i][j]);
        if (i == max) {
          loopOverStack(optionalStack, scenario, length, a);
        } else helper(a, i + 1);
      }
    }
    helper([], 0);
  };

  const loopOverStack = (loopedStack, scenario, length, aditional) => {
    let max = loopedStack.length - 1;
    function helper(arr, i) {
      for (var j = 0, l = loopedStack[i].length; j < l; j++) {
        if (scenario.length === length) break;

        var a = arr.slice(0);
        if (loopedStack[i][j]) a.push(loopedStack[i][j]);
        if (i == max) {
          if (aditional) a = [...a, ...aditional];
          if (canAddToScenarios(a)) {
            scenario.push(a);
          }
        } else helper(a, i + 1);
      }
    }
    helper([], 0);
  };

  const stackedCourses = (courses) => {
    let stacked = [];
    courses.sort(compareNames).forEach((sc) => {
      let presentsInStacked = stacked.find(
        (stack) => stack.shortName === `${sc.areaCode}${sc.digitCode}`
      );
      if (presentsInStacked) {
        presentsInStacked.courses.push(sc);
      } else {
        stacked.push({
          courses: [sc],
          shortName: `${sc.areaCode}${sc.digitCode}`,
        });
      }
    });
    return stacked;
  };

  const canAddToScenarios = (potentialCourses) => {
    if (
      between(potentialCourses.length, courseRange[0], courseRange[1], true) &&
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

  function createWithParams(
    requiredCourses,
    dispatch,
    createWithRequired,
    scenariosSlider,
    createWithoutRequired
  ) {
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
    setLoading(false);
    setValue('Program Oluşturuldu');
  }

  return (
    <div>
      <Button
        color="blue"
        onClick={() => createProgram()}
        loading={loading}
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

function between(n, a, b, inclusive) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return inclusive ? n >= min && n <= max : n > min && n < max;
}

export default CreateProgram;
