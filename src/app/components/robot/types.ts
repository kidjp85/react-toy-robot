import { RobotState } from 'app/reducers/types';

export interface RobotProps extends Pick<RobotState, 'coordinate' | 'rotateDeg' | 'isPlaced'> {}
