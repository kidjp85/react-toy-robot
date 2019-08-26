import React, { SFC } from 'react';
import { Flex } from '@react-yuki/ui';
import { CommandProps } from 'app/components/command/types';
import CommandInput from 'app/components/command/CommandInput';
import CommandList from 'app/components/command/CommandList';

const Command: SFC<CommandProps> = ({ commands, handleCommand, reset, clearErrorMessage }) => (
  <Flex flex="none" width={[1, 1, 1 / 2, 1 / 2]} pr={[0, 0, 5, 5]} flexDirection="column">
    <CommandInput
      handleCommand={handleCommand}
      clearErrorMessage={clearErrorMessage}
      reset={reset}
    />
    <CommandList commands={commands} />
  </Flex>
);

Command.displayName = 'Command';

export default Command;
