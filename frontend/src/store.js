import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import lessonReducer from './reducers/lessonReducer';
import teacherReducer from './reducers/teacherReducer';
import filterReducer from './reducers/filterReducer';
import userReducer from './reducers/userReducer';
import commentReducer from './reducers/commentReducer';
import allReducer from './reducers/allReducer';
import usersReducer from './reducers/usersReducer';
import clubReducer from './reducers/clubReducer';
const reducer = combineReducers({
  teachers: teacherReducer,
  lessons: lessonReducer,
  filter: filterReducer,
  user: userReducer,
  comments: commentReducer,
  all: allReducer,
  users: usersReducer,
  clubs: clubReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
