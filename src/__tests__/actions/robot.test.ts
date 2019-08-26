import { ActionTypes } from 'app/actions/types';
import * as actions from 'app/actions/robot';
import { mockStore } from 'testHelpers';
import { initialState } from 'app/reducers/robot';
import { ERRORS } from 'app/configs/constants';

describe('app/actions/robot', () => {
  const store = mockStore({
    robot: initialState
  });

  afterEach(() => {
    store.clearActions();
    jest.resetAllMocks();
  });

  describe('addCommand', () => {
    test(`it should return action: ${ActionTypes.ADD_COMMAND}`, () => {
      expect(actions.addCommand('PLACE 1,1,NORTH')).toEqual({
        type: ActionTypes.ADD_COMMAND,
        payload: {
          command: 'PLACE 1,1,NORTH'
        }
      });
    });
  });

  describe('showInputingError', () => {
    test(`it should return action: ${ActionTypes.INPUT_ERROR}`, () => {
      expect(actions.showInputError(ERRORS.invalidCommand)).toEqual({
        type: ActionTypes.INPUT_ERROR,
        payload: {
          message: ERRORS.invalidCommand
        }
      });
    });
  });

  describe('showPlacingError', () => {
    test(`it should return action: ${ActionTypes.PLACE_ERROR}`, () => {
      expect(actions.showPlaceError(ERRORS.invalidCommand)).toEqual({
        type: ActionTypes.PLACE_ERROR,
        payload: {
          message: ERRORS.invalidCommand
        }
      });
    });
  });

  describe('reset', () => {
    test(`it should return action: ${ActionTypes.RESET}`, () => {
      expect(actions.reset()).toEqual({
        type: ActionTypes.RESET
      });
    });
  });

  describe('clearErrorMessage', () => {
    test(`it should return action: ${ActionTypes.CLEAR_ERROR_MESSAGE}`, () => {
      expect(actions.clearErrorMessage()).toEqual({
        type: ActionTypes.CLEAR_ERROR_MESSAGE
      });
    });
  });

  describe('handleCommand', () => {
    test('it should handle input error', async () => {
      await store.dispatch<any>(actions.handleCommand('PLACE 1,1,SOUTHEAST'));

      const receivedActions = store.getActions();

      expect(receivedActions[0]).toEqual({
        type: ActionTypes.INPUT_ERROR,
        payload: {
          message: ERRORS.wrongDirection
        }
      });
    });

    test('it should handle place error', async () => {
      const newStore = mockStore({
        robot: {
          ...initialState,
          isPlaced: true,
          commands: ['PLACE 0,0,SOUTH'],
          coordinate: { x: 0, y: 0 },
          facing: { x: 0, y: -1 },
          rotateDeg: 180
        }
      });

      await newStore.dispatch<any>(actions.handleCommand('MOVE'));

      const receivedActions = newStore.getActions();

      expect(receivedActions[0]).toEqual({
        type: ActionTypes.PLACE_ERROR,
        payload: {
          message: ERRORS.wrongMovingDirection
        }
      });
    });

    test('it should add new command', async () => {
      await store.dispatch<any>(actions.handleCommand('PLACE 1,1,SOUTH'));

      const receivedActions = store.getActions();

      expect(receivedActions[0]).toEqual({
        type: ActionTypes.ADD_COMMAND,
        payload: {
          command: 'PLACE 1,1,SOUTH'
        }
      });
    });
  });
});
