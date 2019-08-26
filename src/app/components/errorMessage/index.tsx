import React, { memo } from 'react';
import { useTransition } from 'react-spring';
import { Flex, Text } from '@react-yuki/ui';
import WarningIcon from '@react-yuki/icons/lib/Warning';
import { ErrorMessageProps } from 'app/components/errorMessage/types';
import { ErrorMessageContainer } from 'app/components/styledComponents';
import { colors } from 'app/configs/styles';

const ErrorMessage = memo<ErrorMessageProps>(
  ({ errorMessage }) => {
    const transitions = useTransition(errorMessage, null, {
      from: { position: 'absolute', opacity: 0, top: '35%' },
      enter: {
        opacity: 0.75,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%'
      },
      leave: { opacity: 0, top: '65%' }
    });

    return (
      <>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <ErrorMessageContainer key={key} style={props}>
                <Flex alignItems="center" p={3} bg="dark" borderRadius={3} width={1}>
                  <WarningIcon
                    flex="none"
                    width={50}
                    height={50}
                    mr={3}
                    strokeWidth={2}
                    color={colors.red[5]}
                  />
                  <Text fontSize={[3, 3, 5, 5]} lineHeight="large" color="white">
                    {item}
                  </Text>
                </Flex>
              </ErrorMessageContainer>
            )
        )}
      </>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.errorMessage === nextProps.errorMessage) {
      return true;
    }

    return false;
  }
);

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
