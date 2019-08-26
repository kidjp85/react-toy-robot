import React from 'react';
import { buildComponent } from 'testHelpers';
import CommandList from 'app/components/command/CommandList';
import { CommandBlock } from 'app/components/styledComponents';

describe('app/components/command/CommandInput', () => {
  describe('render', () => {
    test('it should not render when command is empty ', () => {
      const component = buildComponent(<CommandList commands={[]} />);

      expect(component.exists(CommandBlock)).toBeFalsy();
    });

    test('it should render commands list', () => {
      const component = buildComponent(<CommandList commands={['PLACE 1,1,NORTH']} />);

      expect(component.exists(CommandBlock)).toBeTruthy();
    });
  });
});
