import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { customQueryClient } from '@lib/helper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={customQueryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  // </StrictMode>
);
