import { normalize, theme as defaultTheme } from '@react-yuki/ui';

export const colors = defaultTheme.colors;

export const theme = defaultTheme;

export const globalStyles = `
  ${normalize}

  html,
  body {
    background-color: ${theme.colors.white};
    font-family: ${theme.fonts.base};
    color: ${theme.colors.dark};
    font-size: 16px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    overflow-y: scroll;
    text-rendering: optimizeLegibility;
    text-size-adjust: 100%;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;

    * {
      box-sizing: border-box;
    }

    a, button {
      cursor: pointer;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    #root {
      width: 100%;
      height: 100%;
    }

    button {
      &:focus {
        outline: 0;
      }
    }
  }
`;
