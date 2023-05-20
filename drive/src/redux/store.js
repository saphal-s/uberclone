import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const reducers = combineReducers({
  // login reducer
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;
