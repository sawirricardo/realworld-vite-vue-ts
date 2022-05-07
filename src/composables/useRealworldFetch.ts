import { createFetch, StorageSerializers, useStorage } from "@vueuse/core";

export const useRealworldFetch = createFetch({
  baseUrl: "https://api.realworld.io/api",
  options: {
    beforeFetch: ({ options }) => {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const { value: token } = useStorage<string | null>(
        "token",
        null,
        undefined,
        {
          serializer: StorageSerializers.string,
        }
      );
      if (token !== null) {
        headers.Authorization = `Token ${token}`;
      }
      options.headers = { ...options.headers, ...headers };
      return { options };
    },
  },
});
