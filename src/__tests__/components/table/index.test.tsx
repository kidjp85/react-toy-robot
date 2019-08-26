import CompassIcon from '@react-yuki/icons/lib/Compass';
import { mockStore } from 'testHelpers';
import { buildContainerWrapper } from 'testHelpers/wrapper';
import { initialState } from 'app/reducers/robot';
import { ApplicationState } from 'app/reducers/types';
import Table from 'app/components/table';
import Robot from 'app/containers/Robot';
import ErrorMessage from 'app/containers/ErrorMessage';

describe('app/components/Table', () => {
  const state: ApplicationState = {
    robot: {
      ...initialState,
      isPlaced: true,
      coordinate: { x: 1, y: 1 },
      facing: { x: 1, y: 0 },
      rotateDeg: 90,
      commands: ['PLACE 1,1,EAST', 'MOVE'],
      errorMessage: ''
    }
  };

  const store = mockStore(state);

  const wrapper = buildContainerWrapper(store, Table, 'mount', {});

  describe('render', () => {
    test('it should render Robot component', () => {
      expect(wrapper.exists(Robot)).toBeTruthy();
    });

    test('it should render Compass icon', () => {
      expect(wrapper.exists(CompassIcon)).toBeTruthy();
    });

    test('it should render ErrorMessage component', () => {
      expect(wrapper.exists(ErrorMessage)).toBeTruthy();
    });
  });
});
