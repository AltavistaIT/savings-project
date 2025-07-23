import { ApiRouteClient } from "@/services/api/api-route-client";
import { LocalStorageService } from "@/services/local-storage-service";
import { create } from "zustand";

interface ConfigState {
  fetchConfig: () => void;
}

export const useConfigStore = create<ConfigState>((set, get) => ({
  fetchConfig: async () => {
    const config = await new ApiRouteClient().fetch("getConfig", {
      options: { revalidate: 3600 },
    });

    if (config.success) {
      LocalStorageService.setItem("config", config.data!);
    }
  },
}));
