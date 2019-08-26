import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectErrorMessage } from 'app/selectors/robot';
import ErrorMessage from 'app/components/errorMessage';

export default connect(
  createSelector(
    selectErrorMessage(),
    errorMessage => ({
      errorMessage
    })
  )
)(ErrorMessage);
