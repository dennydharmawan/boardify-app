import ReactDOM from 'react-dom/client';

import { createTheme, MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';

import { Routes } from '@generouted/react-router';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';

import { mantineColors } from './lib/mantine.ts';
import { queryClient } from './lib/react-query.ts';

import './styles/base.css';

const theme = createTheme({
  primaryColor: 'primary',
  primaryShade: 7,
  colors: mantineColors
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider theme={theme}>
    <Notifications />
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  </MantineProvider>
);
