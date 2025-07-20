"use client";

import { ApiRouteClient } from "@/services/api/api-route-client";
import { LocalStorageService } from "@/services/local-storage-service";

export default function Config() {

  const handleGetConfig = async () => {
    const config = await new ApiRouteClient().fetch('getConfig', { options: { revalidate: 3600 } });
    console.log('config', config);
    if (!config.success) {
      return;
    }

    LocalStorageService.setItem("config", config.data!);
  }

  handleGetConfig();

  return <></>
}
