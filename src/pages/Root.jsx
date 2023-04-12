import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';
import { AuthContextProvider } from '../context/AuthContext';
import { ModalContextProvider } from '../context/ModalContext';

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ModalContextProvider>
          <Header />
          <Outlet />
        </ModalContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
