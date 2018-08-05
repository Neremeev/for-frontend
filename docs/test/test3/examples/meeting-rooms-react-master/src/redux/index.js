import { routerMiddleware } from 'react-router-redux';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import moment from 'moment';
import history from '../history'

const initialState = {
  selectedDate: moment()
};

const setDateReducer = (state = initialState.selectedDate, action) => {
  switch (action.type) {
    case 'BEFORE_DATE':
      return moment(state).subtract(1,'day');
    case 'AFTER_DATE':
      return moment(state).add(1,'day');
    case 'CHANGE_DATE':
      return action.value
    default:
      return state
  }
};

const reducers = combineReducers({
  selectedDate: setDateReducer
});

const middleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(middleware))
);

export default store;
