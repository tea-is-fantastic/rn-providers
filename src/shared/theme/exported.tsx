import type { Theme } from './theme';
import { create } from 'zustand';
import type { Palette } from './palette';

export const MyDefaultTheme: Theme = {
  palette: {
    splashColor: '#669999',
    iconColor: '#009688',
    primaryColor: '#009688',
    primaryDarkColor: '#00695f',
    primaryLightColor: '#00dec9',
    secondaryColor: '#ff5252',
    secondaryDarkColor: '#eb0000',
    secondaryLightColor: '#fe7474',
    tertiaryColor: '#fed801',
    tertiaryDarkColor: '#b19700',
    tertiaryLightColor: '#fedf33',
    quaternaryColor: '#00BCD4',
    quaternaryDarkColor: '#008394',
    quaternaryLightColor: '#10e4ff',
    disabledColor: '#919191',
    disabledDarkColor: '#515151',
    disabledLightColor: '#C1C1C1',
    backgroundColor: '#eeeeee',
    cardColor: '#ffffff',
    textColor: '#1C1B1F',
    successColor: '#009688',
    errorColor: '#e57373',
    infoColor: '#4dd0e1',
    warningColor: '#FFCA28',
  },
};

export const useThemeStore = create<Theme>(() => MyDefaultTheme);

export const palette = (varname: keyof Palette): any => {
  const palette = useThemeStore.getState().palette;
  if(!palette) {
    return MyDefaultTheme.palette[varname];
  }
  return palette[varname];
};
