import { AxiosInstance, AxiosError } from "axios";
import { useToastStore } from "@/store/toast.store";

export const setupInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      let errorMessage = "Terjadi kesalahan pada server";

      if (error.code === "ECONNABORTED") {
        errorMessage = "Koneksi ke server timeout. Silakan coba lagi.";
      } else if (error.response) {
        const data = error.response.data as any;
        errorMessage = data?.message || `Error ${error.response.status}: ${error.response.statusText || 'Gagal memproses data'}`;
      } else if (error.request) {
        errorMessage = "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
      } else {
        errorMessage = error.message || errorMessage;
      }

      // Centralized toast notification for errors
      useToastStore.getState().showToast(errorMessage, "error");

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
