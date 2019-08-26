export interface CommandProps {
  commands: string[];
  handleCommand: (command: string) => void;
  clearErrorMessage: () => void;
  reset: () => void;
}

export interface CommandInputProps
  extends Pick<CommandProps, 'handleCommand' | 'reset' | 'clearErrorMessage'> {}

export interface CommandListProps extends Pick<CommandProps, 'commands'> {}
