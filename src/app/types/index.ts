import { Store } from 'redux';
import { ThunkMiddleware, ThunkAction } from 'redux-thunk';
import { ApplicationState } from 'app/reducers/types';
import { Actions } from 'app/actions/types';

export type Direction = 'NORTH' | 'SOUTH' | 'WEST' | 'EAST';

export interface CoordinateObject {
  x: number;
  y: number;
}

export type Coordinate = CoordinateObject | null;

export interface TableDimension extends CoordinateObject {}

export interface Facing extends CoordinateObject {}

export type Orientation = Record<Direction | string, CoordinateObject>;

export type RotateDeg = Record<Direction | string, number>;

export interface AppStore extends Store<ApplicationState, Actions> {}

export interface Thunk extends ThunkMiddleware<ApplicationState, Actions> {}

export interface ThunkDispatch<S, E, A extends Actions> {
  <R>(asyncAction: ThunkAction<R, S, E, A>): R;
  <T extends A>(action: T): T;
}

export type Dispatch = ThunkDispatch<ApplicationState, {}, Actions>;
