import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import lessonReducer from './reducers/lessonReducer';
import teacherReducer from './reducers/teacherReducer';

const reducer = combineReducers({
  teachers: teacherReducer,
  lessons: null,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
