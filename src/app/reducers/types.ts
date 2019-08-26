import { Facing, Coordinate } from 'app/types';

export interface RobotState {
  isPlaced: boolean;
  facing: Facing;
  coordinate: Coordinate;
  rotateDeg: number;
  commands: string[];
  errorMessage: string;
}

export interface ApplicationState {
  robot: RobotState;
}
