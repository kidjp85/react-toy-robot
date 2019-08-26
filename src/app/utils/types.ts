import * as CSS from 'csstype';
import { CoordinateObject, Coordinate, Facing } from 'app/types';
import { RobotState } from 'app/reducers/types';

export interface ThemeProps {
  theme: {
    [key: string]: string | string[];
  };
}

export interface ErrorMessages {
  placeError: string;
  inputError: string;
}

export interface ErrorMessagesParams
  extends Pick<RobotState, 'facing' | 'isPlaced' | 'coordinate'> {
  inputedCommand: string;
}

export interface RobotTransitionParams extends Pick<RobotState, 'rotateDeg' | 'coordinate'> {
  prevRotateDeg?: number;
  prevIsPlaced?: boolean;
  prevCoordinate?: Coordinate;
}

export interface RobotTransition {
  prevTransition: CSS.Properties;
  currentTransition: CSS.Properties;
}

export type IsRobotOnTable = (coordinate: CoordinateObject) => boolean;

export type GetCommandList = (command: string) => string[];

export type GetSquareSize = (type?: 'x' | 'y') => string;

export type GetErrorMessages = (params: ErrorMessagesParams) => ErrorMessages;

export type GetFacingDirection = (facing: Facing) => string | undefined;

export type GetTranslatePosition = (coordinate?: Coordinate) => string;

export type CreateRobotTransition = (params: RobotTransitionParams) => RobotTransition;
