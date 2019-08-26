import { TableDimension, Orientation, RotateDeg } from 'app/types';

export const TABLE_DIMENSION: TableDimension = {
  x: 5,
  y: 5
};

export const ORIENTATION: Orientation = {
  NORTH: { x: 0, y: 1 },
  EAST: { x: 1, y: 0 },
  SOUTH: { x: 0, y: -1 },
  WEST: { x: -1, y: 0 }
};

export const INITIAL_ROTATE_DEG: RotateDeg = {
  NORTH: 0,
  EAST: 90,
  SOUTH: 180,
  WEST: 270
};

export const FACING_DIRECTIONS = Object.keys(ORIENTATION);

export const COMMANDS = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];

export const ERRORS = {
  invalidCommand: `Invalid command format. Available commands are ${COMMANDS.join(' | ')}.`,
  invalidInitialCommand: `Invalid PLACE command format. The valid PLACE command should be 'PLACE X,Y,F'.`,
  notInitialized: `The robot is not placed on the table yet. Place it first with 'PLACE X,Y,F'`,
  wrongPlace: `The robot was placed out of the table`,
  wrongDirection: `Invalid facing direction value. Available directions should be ${FACING_DIRECTIONS.join(
    ' | '
  )}.`,
  wrongCoordinate: `Invalid coordinate value. It must be non-negative interger.`,
  wrongMovingDirection: `The robot can't move forward on that direction, it may fall off the table.`
};

export const DESCRIPTIONS = [
  'The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.',
  'There are no other obstructions on the table surface.',
  'The robot is free to roam around the surface of the table, but must be prevented from falling to destruction.',
  'Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.'
];

export const INSTRUCTIONS = [
  'PLACE X,Y,F - will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.',
  'MOVE - will move the toy robot one unit forward in the direction it is currently facing.',
  'LEFT | RIGHT - will rotate the robot 90 degrees in the specified direction without changing the position of the robot.',
  'REPORT - will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.'
];
