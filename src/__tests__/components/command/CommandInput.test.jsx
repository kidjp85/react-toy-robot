import React from 'react';
import { buildComponent } from 'testHelpers';
import CommandInput from 'app/components/command/CommandInput';

describe('app/components/command/CommandInput', () => {
  const handleCommand = jest.fn();

  const reset = jest.fn();

  const clearErrorMessage = jest.fn();

  const component = buildComponent(
    <CommandInput
      handleCommand={handleCommand}
      reset={reset}
      clearErrorMessage={clearErrorMessage}
    />
  );

  describe('event handlers', () => {
    test('it should handle onChange function', () => {
      component.find('input').simulate('change', { target: { value: 'PLACE 1,1,NORTH' } });

      expect(component.find('input').prop('value')).toEqual('PLACE 1,1,NORTH');
    });

    test('it should handle submit function', () => {
      component.find('input').simulate('change', { target: { value: 'PLACE 1,1,NORTH' } });

      component.find('form').simulate('submit');

      expect(clearErrorMessage).toHaveBeenCalledTimes(1);

      expect(handleCommand).toHaveBeenCalledTimes(1);
    });

    test('it should handle reset function', () => {
      const runButton = component.find('button').last();

      runButton.simulate('click');

      expect(reset).toHaveBeenCalledTimes(1);
    });
  });
});
