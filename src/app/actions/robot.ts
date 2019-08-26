import { action } from 'typesafe-actions';
import { ActionTypes, AsyncActionCreator } from 'app/actions/types';
import { getErrorMessage } from 'app/utils';

export const addCommand = (command: string) => action(ActionTypes.ADD_COMMAND, { command });

export const reset = () => action(ActionTypes.RESET);

export const showInputError = (message: string) => action(ActionTypes.INPUT_ERROR, { message });

export const showPlaceError = (message: string) => action(ActionTypes.PLACE_ERROR, { message });

export const clearErrorMessage = () => action(ActionTypes.CLEAR_ERROR_MESSAGE);

export const handleCommand: AsyncActionCreator<void> = (command: string) => (
  dispatch,
  getState
) => {
  const {
    robot: { facing, coordinate, isPlaced }
  } = getState();

  const { inputError, placeError } = getErrorMessage({
    inputedCommand: command,
    isPlaced,
    facing,
    coordinate
  });

  if (inputError.length) {
    dispatch(showInputError(inputError));

    return;
  }

  if (placeError.length) {
    dispatch(showPlaceError(placeError));

    return;
  }

  dispatch(addCommand(command));
};
