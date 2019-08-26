import React from 'react';
import Robot from 'app/components/robot';
import { buildComponent } from 'testHelpers';
import { RobotContainer } from 'app/components/styledComponents';

describe('app/component/robot', () => {
  describe('render', () => {
    test('it should not render component when robot is not placed', () => {
      const component = buildComponent(<Robot isPlaced={false} coordinate={null} rotateDeg={0} />);

      expect(component.exists(RobotContainer)).toBeFalsy();
    });

    test('it should render component when robot is placed', () => {
      const component = buildComponent(
        <Robot isPlaced={true} coordinate={{ x: 1, y: 1 }} rotateDeg={0} />
      );

      expect(component.exists(RobotContainer)).toBeTruthy();
    });
  });
});
