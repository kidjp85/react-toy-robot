import React from 'react';
import { Text } from '@react-yuki/ui';
import { buildComponent } from 'testHelpers';
import ErrorMessage from 'app/components/errorMessage';
import { ErrorMessageContainer } from 'app/components/styledComponents';
import { ERRORS } from 'app/configs/constants';

describe('app/component/errorMessage', () => {
  describe('render', () => {
    test('it should not render component when there is no error message', () => {
      const component = buildComponent(<ErrorMessage errorMessage="" />);

      expect(component.exists(ErrorMessageContainer)).toBeFalsy();
    });

    test('it should render component when there is error message', () => {
      const component = buildComponent(<ErrorMessage errorMessage={ERRORS.invalidCommand} />);

      expect(component.exists(ErrorMessageContainer)).toBeTruthy();

      expect(component.find(Text).html()).toContain(ERRORS.invalidCommand);
    });
  });
});
