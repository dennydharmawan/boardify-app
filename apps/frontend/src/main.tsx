import ReactDOM from 'react-dom/client';

import { createTheme, MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';

import { Routes } from '@generouted/react-router';
import { Notifications } from '@mantine/notifications';

import { mantineColors } from './lib/mantine.ts';

import './styles/base.css';

const theme = createTheme({
  primaryColor: 'primary',
  primaryShade: 7,
  colors: mantineColors
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider theme={theme}>
    <Notifications />
    <Routes />
  </MantineProvider>
);
