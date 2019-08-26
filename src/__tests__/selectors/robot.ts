import { createSelector } from 'reselect';
import reducer, { initialState } from 'app/reducers/robot';
import { ApplicationState } from 'app/reducers/types';
import { ActionTypes } from 'app/actions/types';
import {
  selectCommmands,
  selectCoordinate,
  selectErrorMessage,
  selectFacing,
  selectIsPlaced,
  selectRobotState,
  selectRotateDeg
} from 'app/selectors/robot';
import { ERRORS } from 'app/configs/constants';

describe('app/selectors/robot', () => {
  const state: ApplicationState = {
    robot: initialState
  };

  describe('selectRobotState', () => {
    const selector = createSelector(
      selectRobotState(),
      robotState => robotState
    );

    test('it should return initial value', () => {
      expect(selector(state)).toEqual(initialState);
    });
  });

  describe('selectCoordinate', () => {
    const newState = {
      robot: reducer(state.robot, {
        type: ActionTypes.ADD_COMMAND,
        payload: {
          command: 'PLACE 1,3,SOUTH'
        }
      })
    };

    const selector = createSelector(
      selectCoordinate(),
      coordinate => coordinate
    );

    test('it should return new coordinate', () => {
      expect(selector(newState)).toEqual({ x: 1, y: 3 });
    });
  });

  describe('selectFacing', () => {
    const newState = {
      robot: reducer(state.robot, {
        type: ActionTypes.ADD_COMMAND,
        payload: {
          command: 'PLACE 1,3,EAST'
        }
      })
    };

    const selector = createSelector(
      selectFacing(),
      facing => facing
    );

    test('it should return new facing direction', () => {
      expect(selector(newState)).toEqual({ x: 1, y: 0 });
    });
  });

  describe('selectRotateDeg', () => {
    const newState = {
      robot: reducer(state.robot, {
        type: ActionTypes.ADD_COMMAND,
        payload: {
          command: 'PLACE 1,3,WEST'
        }
      })
    };

    const selector = createSelector(
      selectRotateDeg(),
      rotateDeg => rotateDeg
    );

    test('it should return new rotate degree', () => {
      expect(selector(newState)).toEqual(270);
    });
  });

  describe('selectIsPlaced', () => {
    const newState = {
      robot: reducer(state.robot, {
        type: ActionTypes.ADD_COMMAND,
        payload: {
          command: 'PLACE 1,3,WEST'
        }
      })
    };

    const selector = createSelector(
      selectIsPlaced(),
      isPlaced => isPlaced
    );

    test('it should return new robot placing status', () => {
      expect(selector(newState)).toEqual(true);
    });
  });

  describe('selectCommmands', () => {
    const newState = {
      robot: reducer(
        {
          ...state.robot,
          commands: ['PLACE 1,1,SOUTH'],
          coordinate: { x: 1, y: 1 },
          isPlaced: true
        },
        {
          type: ActionTypes.ADD_COMMAND,
          payload: {
            command: 'REPORT'
          }
        }
      )
    };

    const selector = createSelector(
      selectCommmands(),
      commands => commands
    );

    test('it should return new commands list', () => {
      expect(selector(newState)).toEqual(['PLACE 1,1,SOUTH', 'OUTPUT: 1,1,NORTH']);
    });
  });

  describe('selectErrorMessage', () => {
    const newState = {
      robot: reducer(state.robot, {
        type: ActionTypes.INPUT_ERROR,
        payload: {
          message: ERRORS.wrongDirection
        }
      })
    };
    const selector = createSelector(
      selectErrorMessage(),
      errorMessage => errorMessage
    );

    test('it should return new error message', () => {
      expect(selector(newState)).toEqual(ERRORS.wrongDirection);
    });
  });
});
