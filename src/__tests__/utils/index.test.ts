import {
  themed,
  arrayFromInterger,
  isRobotOnTable,
  isValidCoordinate,
  getCommandValues,
  getErrorMessage,
  getFacingDirection,
  getSquareSize,
  getTranslatePosition,
  createRobotTransition
} from 'app/utils';
import { ErrorMessagesParams, RobotTransitionParams } from 'app/utils/types';
import { ERRORS } from 'app/configs/constants';

describe('app/utils', () => {
  describe('themed', () => {
    test('it should return theme props', () => {
      const props = {
        theme: {
          size: ['red', 'blue']
        }
      };

      expect(themed('size')(props)).toEqual(['red', 'blue']);
    });
  });

  describe('arrayFromInterger', () => {
    test('it should return an array of interger', () => {
      expect(arrayFromInterger(4)).toEqual([0, 1, 2, 3]);
    });
  });

  describe('isRobotOnTable', () => {
    test('it should return false when robot is not placed on table', () => {
      expect(isRobotOnTable({ x: 5, y: 3 })).toBeFalsy();
    });

    test('it should return true when robot is placed on table', () => {
      expect(isRobotOnTable({ x: 4, y: 3 })).toBeTruthy();
    });
  });

  describe('isValidCoordinate', () => {
    test('it should return false when invalid coordinate value is provided', () => {
      expect(isValidCoordinate(-10)).toBeFalsy();
      expect(isValidCoordinate(10.5)).toBeFalsy();
    });

    test('it should return true when valid coordinate value is provided', () => {
      expect(isValidCoordinate(5)).toBeTruthy();
    });
  });

  describe('getCommandValues', () => {
    test('it should return an array of command values', () => {
      expect(getCommandValues('PLACE 1,1,NORTH')).toEqual(['PLACE', '1', '1', 'NORTH']);
    });
  });

  describe('getErrorMessage', () => {
    const params: ErrorMessagesParams = {
      inputedCommand: 'PLACE 1,1,NORTH',
      isPlaced: false,
      facing: { x: 0, y: 1 },
      coordinate: null
    };

    describe('empty command', () => {
      test('it should return no error message when command is empty', () => {
        const newParams = {
          ...params,
          inputedCommand: ''
        };

        const errors = getErrorMessage(newParams);

        expect(errors.inputError).toEqual('');
        expect(errors.placeError).toEqual('');
      });
    });

    describe('invalid command', () => {
      test('it should return invalid command error message', () => {
        const newParams = {
          ...params,
          inputedCommand: 'THIS IS INVALID COMMAND'
        };

        expect(getErrorMessage(newParams).inputError).toEqual(ERRORS.invalidCommand);
      });
    });

    describe('PLACE command', () => {
      test('it should return invalid PLACE command error message', () => {
        const newParams = {
          ...params,
          inputedCommand: 'PLACE 1,2'
        };

        expect(getErrorMessage(newParams).inputError).toEqual(ERRORS.invalidInitialCommand);
      });

      test('it should return invalid coordinate value error message', () => {
        const newParams = {
          ...params,
          inputedCommand: 'PLACE -1,2,NORTH'
        };

        expect(getErrorMessage(newParams).inputError).toEqual(ERRORS.wrongCoordinate);
      });

      test('it should return invalid facing direction value error message', () => {
        const newParams = {
          ...params,
          inputedCommand: 'PLACE 1,2,NORTHEAST'
        };

        expect(getErrorMessage(newParams).inputError).toEqual(ERRORS.wrongDirection);
      });

      test('it should return placing robot out of table error message', () => {
        const newParams = {
          ...params,
          inputedCommand: 'PLACE 5,2,NORTH'
        };

        expect(getErrorMessage(newParams).inputError).toEqual(ERRORS.wrongPlace);
      });
    });

    describe('LEFT RIGHT MOVE REPORT command', () => {
      test('it should return not initialzing error message', () => {
        const newParams = {
          ...params,
          inputedCommand: 'MOVE'
        };

        expect(getErrorMessage(newParams).inputError).toEqual(ERRORS.notInitialized);
      });

      test('it should return falling off error message', () => {
        const newParams = {
          ...params,
          isPlaced: true,
          inputedCommand: 'MOVE',
          coordinate: { x: 0, y: 0 },
          facing: { x: 0, y: -1 }
        };

        expect(getErrorMessage(newParams).placeError).toEqual(ERRORS.wrongMovingDirection);
      });
    });
  });

  describe('getFacingDirection', () => {
    test('it should return facing direction value', () => {
      expect(getFacingDirection({ x: 0, y: 1 })).toEqual('NORTH');
      expect(getFacingDirection({ x: 1, y: 0 })).toEqual('EAST');
      expect(getFacingDirection({ x: 0, y: -1 })).toEqual('SOUTH');
      expect(getFacingDirection({ x: -1, y: 0 })).toEqual('WEST');
    });
  });

  describe('getSquareSize', () => {
    test('it should return square size value', () => {
      expect(getSquareSize()).toEqual('20%');
      expect(getSquareSize('y')).toEqual('20%');
    });
  });

  describe('getTranslatePosition', () => {
    test('it should return default value', () => {
      expect(getTranslatePosition(null)).toEqual('translate(0%, 0%)');
    });

    test('it should return translate value', () => {
      expect(getTranslatePosition({ x: 3, y: 2 })).toEqual('translate(300%, 200%)');
    });
  });

  describe('createRobotTransition', () => {
    test('it should return initial transition value', () => {
      const params: RobotTransitionParams = {
        coordinate: { x: 2, y: 3 },
        prevCoordinate: null,
        prevIsPlaced: undefined,
        prevRotateDeg: undefined,
        rotateDeg: 90,
        isPlaced: true
      };

      expect(createRobotTransition(params)).toEqual({
        prevTransition: {
          transform: 'translate(200%, 100%) rotate(90deg) scale(5)'
        },
        currentTransition: {
          transform: 'translate(200%, 100%) rotate(90deg) scale(1)'
        }
      });
    });

    test('it should return next transition value', () => {
      const newParams = {
        coordinate: { x: 2, y: 4 },
        prevCoordinate: { x: 2, y: 3 },
        prevIsPlaced: true,
        prevRotateDeg: 90,
        rotateDeg: 90,
        isPlaced: true
      };

      expect(createRobotTransition(newParams)).toEqual({
        prevTransition: {
          transform: 'translate(200%, 100%) rotate(90deg) scale(1)'
        },
        currentTransition: {
          transform: 'translate(200%, 0%) rotate(90deg) scale(1)'
        }
      });
    });
  });
});
