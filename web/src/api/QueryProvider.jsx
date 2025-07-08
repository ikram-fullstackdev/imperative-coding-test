import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api.js';

export default function QueryProvider(props) {
  return <QueryClientProvider {...props} client={queryClient} />;
}
