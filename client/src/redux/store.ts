import { createStore, compose, applyMiddleware, Store } from 'redux';
import rootReducer from '@/redux/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@/saga/index';
import { PostStateType } from './reducers/postReducer';

type ApplicationState = {
  post: PostStateType;
};

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const enhancers = [applyMiddleware(...middlewares)];
const store: Store<ApplicationState> = createStore(
  rootReducer,
  composeEnhancers(...enhancers)
);
sagaMiddleware.run(rootSaga);

export default store;
