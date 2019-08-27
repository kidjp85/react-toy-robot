import React, { SFC, ComponentClass, isValidElement, ReactElement } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { buildComponent } from 'testHelpers';

export const buildContainerWrapper = <P, T>(
  store: Store,
  Container: SFC<P> | ComponentClass<P, T> | ReactElement<P>,
  type = 'mount',
  props: P
) => {
  const content = isValidElement(Container) ? Container : <Container {...props} />;

  const wrapper = <Provider store={store}>{content}</Provider>;

  return buildComponent(wrapper, type);
};
