//
// ======================
// Imports & Dependencies
// ======================
//
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";

// eslint-disable-next-line import/no-named-as-default
import ErrorFallback from "@/components/error/ErrorFallback";
import QuantitySelectorModal from "@/components/feedback/QuantitySelectorModal";
import Toast from "@/components/feedback/Toast";
import { useToastStore } from "@/store/toast.store";
import { ThemeProvider } from "@/theme";

//
// ======================
// Query Client Configuration
// ======================
//
// Setup React Query client with error handling cache interceptors
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
      // Handle error globally with Toast
      useToastStore.getState().showToast(message, "error");
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      const message = error?.response?.data?.message || error.message || "Gagal memproses data";
      // Handle error globally with Toast
      useToastStore.getState().showToast(message, "error");
    },
  }),
});

//
// ======================
// Root Layout
// ======================
//
export default function RootLayout() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <Toast />
            <QuantitySelectorModal />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}



