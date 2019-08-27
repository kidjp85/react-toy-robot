import {
  TABLE_DIMENSION,
  FACING_DIRECTIONS,
  ERRORS,
  COMMANDS,
  ORIENTATION
} from 'app/configs/constants';
import {
  ThemeProps,
  IsRobotOnTable,
  GetCommandList,
  GetErrorMessages,
  ErrorMessages,
  GetFacingDirection,
  GetTranslatePosition,
  CreateRobotTransition,
  GetSquareSize
} from 'app/utils/types';

export const themed = <P>(key: string) => (props: ThemeProps & P) => props.theme[key];

export const arrayFromInterger = (range: number) => Array.from(Array(range).keys(), i => i);

export const isRobotOnTable: IsRobotOnTable = ({ x, y }) =>
  x > -1 && x < TABLE_DIMENSION.x && y > -1 && y < TABLE_DIMENSION.y;

export const isValidCoordinate = (x: number) => Number.isInteger(x) && Math.sign(x) >= 0;

export const getCommandValues: GetCommandList = command => command.split(/[\s,]+/);

export const getErrorMessage: GetErrorMessages = ({
  inputedCommand,
  isPlaced,
  facing,
  coordinate
}) => {
  const commandValues = getCommandValues(inputedCommand);

  const command = commandValues[0];

  const errors: ErrorMessages = {
    placeError: '',
    inputError: ''
  };

  if (command) {
    // Error for invalid command
    if (!COMMANDS.includes(command)) {
      errors.inputError = ERRORS.invalidCommand;

      return errors;
    } else if (command === 'PLACE') {
      // Error for invalid initial command
      if (commandValues.length < 4) {
        errors.inputError = ERRORS.invalidInitialCommand;

        return errors;
      } else {
        const x = parseInt(commandValues[1], 10);

        const y = parseInt(commandValues[2], 10);

        const f = commandValues[3];

        if (!isValidCoordinate(x) || !isValidCoordinate(y)) {
          errors.inputError = ERRORS.wrongCoordinate;

          return errors;
        }

        if (!FACING_DIRECTIONS.includes(f)) {
          errors.inputError = ERRORS.wrongDirection;

          return errors;
        }

        if (!isRobotOnTable({ x, y })) {
          errors.inputError = ERRORS.wrongPlace;

          return errors;
        }
      }
    } else {
      // Error for robot not being replaced
      if (!isPlaced) {
        errors.inputError = ERRORS.notInitialized;

        return errors;
      }

      // Error for falling off table
      if (command === 'MOVE' && coordinate !== null) {
        const nextX = coordinate.x + facing.x;

        const nextY = coordinate.y + facing.y;

        if (!isRobotOnTable({ x: nextX, y: nextY })) {
          errors.placeError = ERRORS.wrongMovingDirection;

          return errors;
        }
      }
    }
  }

  return errors;
};

export const getFacingDirection: GetFacingDirection = ({ x, y }) => {
  const keys = Object.keys(ORIENTATION);

  return keys.find(k => {
    const value = ORIENTATION[k];

    return value.x === x && value.y === y;
  });
};

export const getSquareSize: GetSquareSize = (type = 'x') => `${(1 / TABLE_DIMENSION[type]) * 100}%`;

export const getTranslatePosition: GetTranslatePosition = coordinate => {
  const { y } = TABLE_DIMENSION;

  if (!coordinate || coordinate === null) return `translate(0%, 0%)`;

  return `translate(${coordinate.x * 100}%, ${(y - (coordinate.y + 1)) * 100}%)`;
};

export const createRobotTransition: CreateRobotTransition = params => {
  const { coordinate, prevCoordinate, prevIsPlaced, rotateDeg, prevRotateDeg } = params;

  const scaleSize = prevIsPlaced ? '1' : '5';

  const deg = prevIsPlaced ? prevRotateDeg : rotateDeg;

  const translateCoordinate = prevIsPlaced ? prevCoordinate : coordinate;

  return {
    prevTransition: {
      transform: `${getTranslatePosition(
        translateCoordinate
      )} rotate(${deg}deg) scale(${scaleSize})`
    },
    currentTransition: {
      transform: `${getTranslatePosition(coordinate)} rotate(${rotateDeg}deg) scale(1)`
    }
  };
};
