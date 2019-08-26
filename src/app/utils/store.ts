import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { ApplicationState } from 'app/reducers/types';
import { Dispatch, Thunk } from 'app/types';
import { Actions } from 'app/actions/types';
import reducer from 'app/reducers';

export default () => {
  const middlewares = [thunk as Thunk];

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger'); //eslint-disable-line

    middlewares.push(logger);
  }

  return createStore<ApplicationState, Actions, { dispatch: Dispatch }, {}>(
    reducer,
    {},
    compose<Dispatch>(applyMiddleware(...middlewares))
  );
};
