import React, { memo, useState, ChangeEvent, useCallback } from 'react';
import { Flex, Input, Button, Box } from '@react-yuki/ui';
import { CommandInputProps } from 'app/components/command/types';

const CommandInput = memo<CommandInputProps>(({ handleCommand, reset, clearErrorMessage }) => {
  const [command, updateCommand] = useState('');

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    updateCommand(e.target.value.toUpperCase());
  }, []);

  const handleSubmit = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      if (command.length === 0) return;

      clearErrorMessage();

      handleCommand(command);

      updateCommand('');
    },
    [command, clearErrorMessage, handleCommand]
  );

  return (
    <Flex width={1} flexDirection="column" flex="none">
      <Box as="form" onSubmit={handleSubmit} width={1}>
        <Flex flexDirection="column">
          <Input
            value={command}
            onChange={onChange}
            placeholder="Tell the robot what to do ..."
            height="50px"
            fontSize={4}
          />
          <Flex mt={4}>
            <Button
              m={0}
              border={0}
              bg="orange.3"
              color="white"
              flex="none"
              type="submit"
              role="button"
              height="50px"
              width="48%"
              mr="2%"
            >
              Run
            </Button>
            <Button
              m={0}
              border={0}
              bg="blue.3"
              color="white"
              flex="none"
              ml="2%"
              role="button"
              height="50px"
              width="48%"
              onClick={reset}
            >
              Reset
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
});

CommandInput.displayName = 'CommandInput';

export default CommandInput;
