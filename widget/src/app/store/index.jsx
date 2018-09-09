// import { createStore, combineReducers } from 'redux';
// import { reducer as reduxFormReducer } from 'redux-form';
//
// const reducer = combineReducers({
//   form: reduxFormReducer, // mounted under "form"
// });
// const store = (window.devToolsExtension
//   ? window.devToolsExtension()(createStore)
//   : createStore)(reducer);
//
// export default store;

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './middlewares';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
