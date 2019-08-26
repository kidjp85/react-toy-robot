import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  addCommand,
  reset,
  showInputError,
  showPlaceError,
  clearErrorMessage
} from 'app/actions/robot';
import { ApplicationState } from 'app/reducers/types';

export enum ActionTypes {
  ADD_COMMAND = '@robot/ADD_COMMAND',
  RESET = '@@robot/RESET',
  INPUT_ERROR = '@@robot/INPUT_ERROR',
  PLACE_ERROR = '@@robot/PLACE_ERROR',
  CLEAR_ERROR_MESSAGE = '@@robot/CLEAR_ERROR_MESSAGE'
}

export enum CommandTypes {
  PLACE = 'PLACE',
  MOVE = 'MOVE',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  REPORT = 'REPORT'
}

export type AddCommand = ReturnType<typeof addCommand>;

export type Reset = ReturnType<typeof reset>;

export type ShowInputError = ReturnType<typeof showInputError>;

export type ShowPlaceError = ReturnType<typeof showPlaceError>;

export type ClearErrorMessage = ReturnType<typeof clearErrorMessage>;

export type RobotActions = AddCommand | Reset | ShowInputError | ShowPlaceError | ClearErrorMessage;

export type Actions = RobotActions;

export type ThunkReturn<R> = ThunkAction<R, ApplicationState, null, Actions>;

export type AsyncActionCreator<R> = ActionCreator<ThunkReturn<R>>;
