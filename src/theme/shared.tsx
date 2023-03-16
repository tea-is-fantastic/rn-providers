import type { Theme } from './theme';
import type { PartialTheme } from './theme';
import type { Theme as NavTheme } from '@react-navigation/native/lib/typescript/src/types';
import { DefaultTheme } from '@react-navigation/native';
import type { MD3Theme as PaperTheme } from 'react-native-paper/lib/typescript/src/types';
import { DefaultTheme as DefaultPaper } from 'react-native-paper/lib/typescript/src/core/theming';
import { MyDefaultTheme, useThemeStore } from './exported';

export const generateTheme = (input?: PartialTheme): Theme => {
  return {
    palette: {
      ...MyDefaultTheme.palette,
      ...(input?.palette || {}),
    },
  };
};

export const generateNavTheme = (input: Theme): NavTheme => {
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: input.palette.primaryColor || MyDefaultTheme.palette.primaryColor,
    },
  };
};

export const generatePaperTheme = (input: Theme): PaperTheme => {
  return {
    ...DefaultPaper,
    colors: {
      ...DefaultPaper.colors,
      primary: input.palette.primaryColor || MyDefaultTheme.palette.primaryColor,
      secondary: input.palette.secondaryColor || MyDefaultTheme.palette.secondaryColor,
      tertiary: input.palette.tertiaryColor || MyDefaultTheme.palette.tertiaryColor,
    },
  };
};

export const generateRNThemes = (
  input?: PartialTheme,
): { nav: NavTheme; paper: PaperTheme } => {
  const generated = generateTheme(input);
  useThemeStore.setState(generated);
  return {
    paper: generatePaperTheme(generated),
    nav: generateNavTheme(generated),
  };
};

