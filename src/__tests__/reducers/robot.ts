import { ActionTypes, Actions } from 'app/actions/types';
import reducer, { initialState } from 'app/reducers/robot';
import { RobotState } from 'app/reducers/types';
import { ERRORS } from 'app/configs/constants';

describe('app/reducers/robot', () => {
  let state: RobotState = initialState;

  describe(`${ActionTypes.ADD_COMMAND} action`, () => {
    test('it should return initial state', () => {
      expect(reducer(undefined, {} as Actions)).toEqual(initialState); //eslint-disable-line

      expect(
        reducer(state, {
          type: ActionTypes.ADD_COMMAND,
          payload: {
            command: ''
          }
        })
      ).toEqual(initialState);
    });

    test('it should not handle any command except PLACE when the robot is not placed on table', () => {
      expect(
        reducer(initialState, {
          type: ActionTypes.ADD_COMMAND,
          payload: {
            command: 'MOVE'
          }
        })
      ).toEqual(initialState);

      expect(
        reducer(initialState, {
          type: ActionTypes.ADD_COMMAND,
          payload: {
            command: 'LEFT'
          }
        })
      ).toEqual(initialState);

      expect(
        reducer(initialState, {
          type: ActionTypes.ADD_COMMAND,
          payload: {
            command: 'RIGHT'
          }
        })
      ).toEqual(initialState);

      expect(
        reducer(initialState, {
          type: ActionTypes.ADD_COMMAND,
          payload: {
            command: 'REPORT'
          }
        })
      ).toEqual(initialState);
    });

    /**
      Use the sequence of commands from example for testing

      PLACE 1,2,EAST
      MOVE
      MOVE
      LEFT
      MOVE
      REPORT
      Output: 3,3,NORTH

    */

    test('it should handle PLACE command', () => {
      state = reducer(state, {
        type: ActionTypes.ADD_COMMAND,
        payload: {
          command: 'PLACE 1,2,EAST'
        }
      });

      expect(state).toEqual({
        ...initialState,
        coordinate: { x: 1, y: 2 },
        isPlaced: true,
        facing: { x: 1, y: 0 },
        rotateDeg: 90,
        commands: ['PLACE 1,2,EAST']
      });
    });

    test('it should handle MOVE command', () => {
      const prevState = state;

      state = reducer(state, {
        type: ActionTypes.ADD_COMMAND,
        payload: {
          command: 'MOVE'
        }
      });

      state = reducer(state, {
        type: ActionTypes.ADD_COMMAND,
        payload: {
          command: 'MOVE'
        }
      });

      expect(state).toEqual({
        ...prevState,
        coordinate: { x: 3, y: 2 },
        commands: ['PLACE 1,2,EAST', 'MOVE', 'MOVE']
      });
    });

    test('it should handle LEFT command', () => {
      const prevState = state;

      state = reducer(state, {
        type: ActionTypes.ADD_COMMAND,
        payload: {
          command: 'LEFT'
        }
      });

      state = reducer(state, {
        type: ActionTypes.ADD_COMMAND,
        payload: {
          command: 'MOVE'
        }
      });

      expect(state).toEqual({
        ...prevState,
        coordinate: { x: 3, y: 3 },
        facing: { x: 0, y: 1 },
        rotateDeg: 0,
        commands: ['PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE']
      });
    });

    test('it should handle REPORT command', () => {
      const prevState = state;

      state = reducer(state, {
        type: ActionTypes.ADD_COMMAND,
        payload: {
          command: 'REPORT'
        }
      });

      expect(state).toEqual({
        ...prevState,
        commands: ['PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'OUTPUT: 3,3,NORTH']
      });
    });

    test('it should handle RIGHT command', () => {
      const prevState = state;

      state = reducer(state, {
        type: ActionTypes.ADD_COMMAND,
        payload: {
          command: 'RIGHT'
        }
      });

      expect(state).toEqual({
        ...prevState,
        facing: { x: 1, y: 0 },
        rotateDeg: 90,
        commands: ['PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'OUTPUT: 3,3,NORTH', 'RIGHT']
      });
    });
  });

  describe(`${ActionTypes.INPUT_ERROR} action`, () => {
    test('should return new error message', () => {
      const newState = {
        ...initialState,
        commands: ['PLACE 1,1,NORTH']
      };

      expect(
        reducer(newState, {
          type: ActionTypes.INPUT_ERROR,
          payload: {
            message: ERRORS.invalidCommand
          }
        })
      ).toEqual({
        ...newState,
        commands: [],
        errorMessage: ERRORS.invalidCommand
      });
    });
  });

  describe(`${ActionTypes.PLACE_ERROR} action`, () => {
    test('should return new error message', () => {
      expect(
        reducer(initialState, {
          type: ActionTypes.PLACE_ERROR,
          payload: {
            message: ERRORS.wrongMovingDirection
          }
        })
      ).toEqual({
        ...initialState,
        errorMessage: ERRORS.wrongMovingDirection
      });
    });
  });

  describe(`${ActionTypes.CLEAR_ERROR_MESSAGE} action`, () => {
    const newState = {
      ...initialState,
      errorMessage: ERRORS.invalidCommand
    };

    test('should clear error message', () => {
      expect(
        reducer(newState, {
          type: ActionTypes.CLEAR_ERROR_MESSAGE
        })
      ).toEqual({
        ...newState,
        errorMessage: ''
      });
    });
  });

  describe(`${ActionTypes.RESET} action`, () => {
    test('should reset to initial state', () => {
      expect(
        reducer(state, {
          type: ActionTypes.RESET
        })
      ).toEqual(initialState);
    });
  });
});
