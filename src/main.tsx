import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ErrorBoundary } from 'react-error-boundary';

import './index.css';

import App from './App';
import { store } from './store';
import { queryClient } from '@/lib/react-query';
import ErrorState from './common/ErrorState';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary
            fallbackRender={({ error }) => (
              <div className='fixed inset-0 z-50 flex items-center justify-center bg-white p-6'>
                <ErrorState
                  title='Application Error'
                  description={
                    error instanceof Error
                      ? error.message
                      : 'Something went wrong inside the app rendering.'
                  }
                />
              </div>
            )}
          >
            <App />
          </ErrorBoundary>
          <Toaster richColors position='top-right' />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
