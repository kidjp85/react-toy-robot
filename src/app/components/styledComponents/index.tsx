import React, { SFC } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { animated } from 'react-spring';
import { Flex, Heading, FlexBoxProps, HeadingProps } from '@react-yuki/ui';

import { globalStyles } from 'app/configs/styles';
import { getSquareSize } from 'app/utils';

export const GlobalStyles = createGlobalStyle`${globalStyles}`;

export const Container: SFC<FlexBoxProps> = ({ children, ...rest }) => (
  <Flex {...rest} width={1} maxWidth="1440px" mx="auto" px={[3, 4, 4, 4]} py={[3, 4, 5, 5]}>
    {children}
  </Flex>
);

export const heightByWidth = (percentage: number = 100) => css`
  &:before {
    display: block;
    padding-top: ${percentage}%;
    content: '';
  }
`;

export const RobotContainer = styled(animated.div)`
  position: absolute;
  display: flex;
  width: ${getSquareSize()};
  align-items: center;
  justify-content: center;

  ${heightByWidth()}
`;

export const ErrorMessageContainer = styled(animated.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Square = styled(Flex)<FlexBoxProps>`
  width: ${getSquareSize()};

  ${heightByWidth()};
`;

export const CommandBlock = styled(Flex)<FlexBoxProps>`
  ${heightByWidth(70)}
`;

export const PageHeading: SFC<HeadingProps> = ({ children, ...styles }) => (
  <Heading
    width={1}
    m={0}
    mb={3}
    fontSize={[5, 7, 8, 8]}
    fontWeight={[3, 2, 2, 2]}
    letterSpacing="medium"
    color="red.3"
    {...styles}
  >
    {children}
  </Heading>
);
