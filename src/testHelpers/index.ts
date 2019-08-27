import thunk from 'redux-thunk';
import createStore from 'redux-mock-store';
import { ShallowWrapper, ReactWrapper, shallow, mount } from 'enzyme';

export const middlewares = [thunk];

export const mockStore = createStore(middlewares);

export const buildComponent = (
  Component: JSX.Element,
  type = 'mount'
): ShallowWrapper | ReactWrapper => {
  switch (type) {
    case 'shallow': {
      return shallow(Component);
    }

    default: {
      return mount(Component);
    }
  }
};

export const spyFunc = jest.fn();
