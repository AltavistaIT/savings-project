import { toast, ToasterProps } from "sonner";
import { create } from "zustand";

type ToastType = "default" | "success" | "error" | "warning" | "info";
interface ToastOptions extends Partial<ToasterProps> {
  duration?: number;
  type?: ToastType;
}

interface ToastStore {
  showToast: (
    title: string,
    description?: string,
    options?: ToastOptions
  ) => void;
}

export const useToastStore = create<ToastStore>(() => ({
  showToast: (title, description = "", options = {}) => {
    const { type = "default", ...rest } = options;

    const config = {
      description,
      duration: rest.duration ?? 3000,
      ...rest,
    };

    switch (type) {
      case "success":
        toast.success(title, config);
        break;
      case "error":
        toast.error(title, config);
        break;
      case "warning":
        toast.warning(title, config);
        break;
      case "info":
        toast.info(title, config);
        break;
      default:
        toast(title, config);
        break;
    }
  },
}));
