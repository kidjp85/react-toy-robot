import { mockStore } from 'testHelpers';
import { buildContainerWrapper } from 'testHelpers/wrapper';
import { initialState } from 'app/reducers/robot';
import { ApplicationState } from 'app/reducers/types';
import CommandContainer from 'app/containers/Command';
import Command from 'app/components/command';

describe('app/containers/Command', () => {
  const state: ApplicationState = {
    robot: {
      ...initialState,
      commands: ['PLACE 1,1,NORTH', 'MOVE']
    }
  };

  const store = mockStore(state);

  describe('props', () => {
    test('it should pass props from store to Robot component', () => {
      const wrapper = buildContainerWrapper(store, CommandContainer, 'mount', {});

      const props = wrapper.find(Command).props();

      expect(props.commands).toEqual(['PLACE 1,1,NORTH', 'MOVE']);
    });
  });
});
