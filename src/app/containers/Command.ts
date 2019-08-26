import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectCommmands } from 'app/selectors/robot';
import { handleCommand, reset, clearErrorMessage } from 'app/actions/robot';
import Command from 'app/components/command';

export default connect(
  createSelector(
    selectCommmands(),
    commands => ({
      commands
    })
  ),
  { handleCommand, clearErrorMessage, reset }
)(Command);
