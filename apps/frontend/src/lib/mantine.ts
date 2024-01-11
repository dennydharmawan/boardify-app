import * as _ from 'lodash-es';

import { type DefaultMantineColor, type MantineColorsTuple, type MantineThemeColors } from '@mantine/core';

import colors from '../../tailwind.color';

type CustomColors = keyof typeof colors | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, MantineColorsTuple>;
  }
}

const mantineColors = Object.fromEntries(
  Object.entries(colors)
    .filter(([, v]) => typeof v !== 'string')
    .map(([k, v]) => {
      const filteredColors = _.pick(v, [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]);

      return [k, Object.values(filteredColors)];
    })
) as unknown as MantineThemeColors;

export { mantineColors };
