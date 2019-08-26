import { mockStore } from 'testHelpers';
import { buildContainerWrapper } from 'testHelpers/wrapper';
import { initialState } from 'app/reducers/robot';
import { ApplicationState } from 'app/reducers/types';
import RobotContainer from 'app/containers/Robot';
import Robot from 'app/components/robot';

describe('app/containers/Robot', () => {
  const state: ApplicationState = {
    robot: {
      ...initialState,
      isPlaced: true,
      coordinate: { x: 1, y: 1 },
      facing: { x: 1, y: 0 },
      rotateDeg: 90,
      errorMessage: ''
    }
  };

  const store = mockStore(state);

  describe('props', () => {
    test('it should pass props from store to Robot component', () => {
      const wrapper = buildContainerWrapper(store, RobotContainer, 'mount', {});

      const props = wrapper.find(Robot).props();

      expect(props.isPlaced).toEqual(true);
      expect(props.coordinate).toEqual({ x: 1, y: 1 });
      expect(props.facing).toEqual({ x: 1, y: 0 });
      expect(props.rotateDeg).toEqual(90);
      expect(props.errorMessage).toEqual('');
    });
  });
});
