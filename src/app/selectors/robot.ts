import { createSelector } from 'reselect';
import { ApplicationState, RobotState } from 'app/reducers/types';
import { Coordinate, Facing } from 'app/types';

export const selectRobotState = () => (state: ApplicationState) => state.robot;

export const selectCoordinate = () =>
  createSelector<ApplicationState, RobotState, Coordinate>(
    selectRobotState(),
    robotState => robotState.coordinate
  );

export const selectFacing = () =>
  createSelector<ApplicationState, RobotState, Facing>(
    selectRobotState(),
    robotState => robotState.facing
  );

export const selectRotateDeg = () =>
  createSelector<ApplicationState, RobotState, number>(
    selectRobotState(),
    robotState => robotState.rotateDeg
  );

export const selectCommmands = () =>
  createSelector<ApplicationState, RobotState, string[]>(
    selectRobotState(),
    robotState => robotState.commands
  );

export const selectErrorMessage = () =>
  createSelector<ApplicationState, RobotState, string>(
    selectRobotState(),
    robotState => robotState.errorMessage
  );

export const selectIsPlaced = () =>
  createSelector<ApplicationState, RobotState, boolean>(
    selectRobotState(),
    robotState => robotState.isPlaced
  );
