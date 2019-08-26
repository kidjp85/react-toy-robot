import { mockStore } from 'testHelpers';
import { buildContainerWrapper } from 'testHelpers/wrapper';
import { initialState } from 'app/reducers/robot';
import { ApplicationState } from 'app/reducers/types';
import ErrorMessageContainer from 'app/containers/ErrorMessage';
import ErrorMessage from 'app/components/errorMessage';
import { ERRORS } from 'app/configs/constants';

describe('app/containers/ErrorMessage', () => {
  const state: ApplicationState = {
    robot: {
      ...initialState,
      errorMessage: ERRORS.wrongDirection
    }
  };

  const store = mockStore(state);

  describe('props', () => {
    test('it should pass props from store to Robot component', () => {
      const wrapper = buildContainerWrapper(store, ErrorMessageContainer, 'mount', {});

      const props = wrapper.find(ErrorMessage).props();

      expect(props.errorMessage).toEqual(ERRORS.wrongDirection);
    });
  });
});
