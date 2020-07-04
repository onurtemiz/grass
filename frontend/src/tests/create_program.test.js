describe('when match functions called', () => {
  // test('getCoursesDays should work', () => {
  //   const courses = [
  //     { days: [0, 1, 2] },
  //     { days: [1, 1, 2] },
  //     { days: [3, 3, 3] },
  //     { days: [4, 4, 1] },
  //   ];
  //   const expected = [0, 1, 2, 3, 4];
  //   const days = getCoursesDays(courses);
  //   expect(days).toEqual(expect.arrayContaining(expected));
  // });

  // test('getTotalCoursesCredits should work', () => {
  //   const courses = [
  //     { credits: 3 },
  //     { credits: 4 },
  //     { credits: 2 },
  //     { credits: 5 },
  //   ];
  //   const expected = 14;
  //   const credits = getTotalCoursesCredits(courses);
  //   expect(credits).toEqual(expected);
  // });

  // test('getCoursesConflictLength should work', () => {
  //   const courses = [
  //     { id: 1, cellIds: [0, 1, 2, 3] },
  //     { id: 2, cellIds: [3, 4, 5, 6] },
  //     { id: 3, cellIds: [8, 0, 11, 23] },
  //     { id: 4, cellIds: [0, 5, 7, 8] },
  //   ];
  //   const expected = 5;
  //   const conflictsLength = getCoursesConflictLength(courses);
  //   expect(conflictsLength).toEqual(expected);
  // });

  // test('emptyDayMatch should work', () => {
  //   const courses = [
  //     { days: [0, 1, 2] },
  //     { days: [1, 1, 2] },
  //     { days: [3, 3, 3] },
  //     { days: [4, 4, 1] },
  //   ];
  //   const course = { days: [0, 1, 4] };
  //   const expected = true;
  //   const possibleMatch = emptyDayMatch(courses, course, true);
  //   expect(possibleMatch).toEqual(expected);
  // });

  // test('emptyDayMatch should work if tryemptyDay is false', () => {
  //   const courses = [
  //     { days: [0, 1, 2] },
  //     { days: [1, 1, 2] },
  //     { days: [3, 3, 3] },
  //     { days: [4, 4, 1] },
  //   ];
  //   const course = { days: [0, 1, 4] };
  //   const expected = true;
  //   const possibleMatch = emptyDayMatch(courses, course, false);
  //   expect(possibleMatch).toEqual(expected);
  // });

  // test('emptyDayMatch should give false if days not match', () => {
  //   const courses = [
  //     { days: [0, 1, 2] },
  //     { days: [1, 1, 2] },
  //     { days: [3, 3, 3] },
  //     { days: [4, 4, 1] },
  //   ];
  //   const course = { days: [0, 5, 4] };
  //   const expected = false;
  //   const possibleMatch = emptyDayMatch(courses, course, true);
  //   expect(possibleMatch).toEqual(expected);
  // });

  test.only('checkRequiredPresents should work', () => {
    const checkRequiredPresents = (potentialCourses, requiredColumns) => {
      let isPossible = true;
      requiredColumns.forEach((rc) => {
        let isColumnLessonPresent = false;
        let isOnly = true;
        let rcCoursesIds = rc.courses.map((rcCourse) => rcCourse.id);
        potentialCourses.forEach((pcCourse) => {
          if (rcCoursesIds.includes(pcCourse.id)) {
            if (isColumnLessonPresent) isOnly = false;

            isColumnLessonPresent = true;
          }
        });
        if (!isOnly || !isColumnLessonPresent) isPossible = false;
      });
      return isPossible;
    };
    const requiredColumns = [
      { courses: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      { courses: [{ id: 4 }, { id: 5 }, { id: 6 }] },
    ];
    const notOnlyPotentialCourses = [
      { id: 1 },
      { id: 2 },
      { id: 5 },
      { id: 769 },
    ];
    const onlyPotentialCourses = [{ id: 3 }, { id: 6 }, { id: 769 }];

    const notPresentCourses = [{ id: 3 }, { id: 769 }, { id: 1241 }];
    const notPresentNotOnlyCourses = [
      { id: 3 },
      { id: 2 },
      { id: 769 },
      { id: 1241 },
    ];

    const notOnlyFALSE = checkRequiredPresents(
      notOnlyPotentialCourses,
      requiredColumns
    );
    const onlyTRUE = checkRequiredPresents(
      onlyPotentialCourses,
      requiredColumns
    );
    const notPresentFALSE = checkRequiredPresents(
      notPresentCourses,
      requiredColumns
    );
    const notPresentNotOnlyFALSE = checkRequiredPresents(
      notPresentNotOnlyCourses,
      requiredColumns
    );
    expect(notOnlyFALSE).toEqual(false);
    expect(onlyTRUE).toEqual(true);
    expect(notPresentFALSE).toEqual(false);
    expect(notPresentNotOnlyFALSE).toEqual(false);
  });
});
