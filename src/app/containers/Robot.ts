import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  selectCoordinate,
  selectFacing,
  selectRotateDeg,
  selectIsPlaced,
  selectErrorMessage
} from 'app/selectors/robot';
import Robot from 'app/components/robot';

export default connect(
  createSelector(
    selectIsPlaced(),
    selectCoordinate(),
    selectFacing(),
    selectRotateDeg(),
    selectErrorMessage(),
    (isPlaced, coordinate, facing, rotateDeg, errorMessage) => ({
      isPlaced,
      coordinate,
      facing,
      rotateDeg,
      errorMessage
    })
  )
)(Robot);
