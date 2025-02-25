import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
  const form = useForm();

  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...form}>{children}</FormProvider>
    </QueryClientProvider>
  );
};
