import React from 'react';
import { Text } from '@react-yuki/ui';
import { buildComponent } from 'testHelpers';
import InfoBox from 'app/components/infoBox';
import { PageHeading } from 'app/components/styledComponents';
import { DESCRIPTIONS } from 'app/configs/constants';

describe('app/component/infoBox', () => {
  describe('render', () => {
    const component = buildComponent(<InfoBox title="description" content={DESCRIPTIONS} />);

    test('it should render title', () => {
      expect(component.find(PageHeading).html()).toContain('description');
    });

    test('it should render content', () => {
      expect(
        component
          .find(Text)
          .first()
          .html()
      ).toContain(DESCRIPTIONS[0]);
    });
  });
});
