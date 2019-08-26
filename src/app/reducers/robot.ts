import { Reducer } from 'redux';
import { RobotState } from 'app/reducers/types';
import { ActionTypes, RobotActions, CommandTypes } from 'app/actions/types';
import { getCommandValues, getFacingDirection } from 'app/utils';
import { ORIENTATION, INITIAL_ROTATE_DEG } from 'app/configs/constants';

export const initialState: RobotState = {
  isPlaced: false,
  coordinate: null,
  facing: { x: 0, y: 1 },
  rotateDeg: 0,
  commands: [],
  errorMessage: ''
};

const robotReducer: Reducer<RobotState, RobotActions> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMAND: {
      const commandValues = getCommandValues(action.payload.command);

      const command = commandValues[0];

      switch (command) {
        case CommandTypes.PLACE: {
          const x = parseInt(commandValues[1], 10);

          const y = parseInt(commandValues[2], 10);

          const f = commandValues[3];

          return {
            ...state,
            facing: { ...state.facing, ...ORIENTATION[f] },
            coordinate: { x, y },
            rotateDeg: INITIAL_ROTATE_DEG[f],
            isPlaced: true,
            commands: [...state.commands, `${CommandTypes.PLACE} ${x},${y},${f}`]
          };
        }

        // Commands except PLACE should update state only when robot was placed

        case CommandTypes.MOVE: {
          return {
            ...state,
            ...(state.isPlaced &&
              state.coordinate !== null && {
                coordinate: {
                  x: state.coordinate.x + state.facing.x,
                  y: state.coordinate.y + state.facing.y
                },
                commands: [...state.commands, CommandTypes.MOVE]
              })
          };
        }

        case CommandTypes.LEFT: {
          return {
            ...state,
            ...(state.isPlaced && {
              facing: {
                x: state.facing.y !== 0 ? -state.facing.y : 0,
                y: state.facing.x
              },
              rotateDeg: state.rotateDeg - 90,
              commands: [...state.commands, CommandTypes.LEFT]
            })
          };
        }

        case CommandTypes.RIGHT: {
          return {
            ...state,
            ...(state.isPlaced && {
              facing: {
                x: state.facing.y,
                y: state.facing.x !== 0 ? -state.facing.x : 0
              },
              rotateDeg: state.rotateDeg + 90,
              commands: [...state.commands, CommandTypes.RIGHT]
            })
          };
        }

        case CommandTypes.REPORT: {
          const facingDirection = getFacingDirection(state.facing);

          return {
            ...state,
            ...(state.isPlaced &&
              state.coordinate !== null && {
                commands: [
                  ...state.commands,
                  `OUTPUT: ${state.coordinate.x},${state.coordinate.y},${facingDirection}`
                ]
              })
          };
        }

        default: {
          return state;
        }
      }
    }

    case ActionTypes.INPUT_ERROR: {
      return {
        ...initialState,
        errorMessage: action.payload.message
      };
    }

    case ActionTypes.PLACE_ERROR: {
      return {
        ...state,
        errorMessage: action.payload.message
      };
    }

    case ActionTypes.CLEAR_ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: ''
      };
    }

    case ActionTypes.RESET: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default robotReducer;
