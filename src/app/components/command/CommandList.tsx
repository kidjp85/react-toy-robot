import React, { memo } from 'react';
import { useTransition, animated, UseTransitionResult } from 'react-spring';
import { Text, Flex } from '@react-yuki/ui';
import ArrowRightIcon from '@react-yuki/icons/lib/ArrowRight';
import { useScrollToBottom } from '@react-yuki/hooks';
import { CommandListProps } from 'app/components/command/types';
import { colors } from 'app/configs/styles';
import { CommandBlock } from 'app/components/styledComponents';

const CommandsList = memo<CommandListProps>(
  ({ commands }) => {
    if (commands.length === 0) {
      return null;
    }

    const { ref } = useScrollToBottom<string[]>(commands);

    const transitions = useTransition(commands, command => command, {
      initial: { opacity: 0, transform: 'translate(0%, 100%)' },
      from: { opacity: 0, transform: 'translate(0%, 100%)' },
      enter: { opacity: 1, transform: 'translate(0%, 0%)' }
    });

    const renderCommand = ({ item, props }: UseTransitionResult<string, object>, idx: number) => (
      <animated.div key={`command-list-${idx}`} style={props}>
        <Flex width={1} mb={idx === commands.length - 1 ? 0 : 3} alignItems="center">
          <ArrowRightIcon
            flex="none"
            width={12}
            height={12}
            strokeWidth={3}
            color={colors.orange[3]}
            mr={2}
          />
          <Text fontWeight={4} fontSize={3} color="white">
            {item}
          </Text>
        </Flex>
      </animated.div>
    );

    return (
      <CommandBlock width={1} mt={4} borderRadius={3} position="relative" bg="dark" opacity={0.8}>
        <Flex
          ref={ref}
          py={4}
          px={3}
          flexDirection="column"
          overflow="scroll"
          position="absolute"
          top={0}
          left={0}
          width={1}
          height="100%"
        >
          {transitions.map(renderCommand)}
        </Flex>
      </CommandBlock>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.commands.length === nextProps.commands.length) {
      return true;
    }

    return false;
  }
);

CommandsList.displayName = 'CommandsList';

export default CommandsList;
