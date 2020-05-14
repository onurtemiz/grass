import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import lessonReducer from './reducers/lessonReducer';
import teacherReducer from './reducers/teacherReducer';
import filterReducer from './reducers/filterReducer';
const reducer = combineReducers({
  teachers: teacherReducer,
  lessons: lessonReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
