import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "@/components/feedback/Toast";
import { ThemeProvider } from "@/theme";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/error/ErrorFallback";
import { useToastStore } from "@/store/toast.store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any) => {
      const message = error?.response?.data?.message || error.message || "Gagal memuat data";
      useToastStore.getState().showToast(message, "error");
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      const message = error?.response?.data?.message || error.message || "Gagal memproses data";
      useToastStore.getState().showToast(message, "error");
    },
  }),
});

export default function RootLayout() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <Toast />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}


