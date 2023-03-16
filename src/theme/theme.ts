import type { Palette } from './palette';

export interface Theme {
  palette: Palette;
}

export interface PartialTheme {
  palette?: Partial<Palette>;
}
