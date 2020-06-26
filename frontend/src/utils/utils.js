import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export function compareNames(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export const useInfinite = (target, addInfFunc, filterFunc) => {
  const count = useSelector((state) => state[`${target}`].count);
  const start = useSelector((state) => state[`${target}`].start);
  const hasMore = useSelector((state) => state[`${target}`].hasMore);
  const targets = useSelector((state) => state[`${target}`][`${target}`]);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [currentTarget, setCurrentTarget] = useState([]);
  const [ready, setReady] = useState(false);
  const [noResult, setNoResult] = useState(true);
  const first = useRef(false);
  const fetching = useRef(false);
  useEffect(() => {
    dispatch(addInfFunc(0, count, filter, first, fetching));
  }, [filter]);

  useEffect(() => {
    setCurrentTarget(filterFunc(targets, filter));
  }, [targets]);

  const loadFunc = () => {
    if (!fetching.current) {
      dispatch(addInfFunc(start, count, filter, first, fetching));
    }
  };

  useEffect(() => {
    if (first.current && currentTarget.length === 0) {
      setNoResult(true);
    } else if (currentTarget.length !== 0 && first.current) {
      setNoResult(false);
    }
    if (!first.current) {
      setReady(false);
    } else {
      setReady(true);
    }
  }, [currentTarget, first]);

  return { loadFunc, currentTarget, hasMore, ready, noResult };
};
