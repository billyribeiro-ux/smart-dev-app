import { QueryClient } from '@tanstack/query-core';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 15_000,
			refetchOnWindowFocus: false
		}
	}
});
