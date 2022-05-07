import { StorageSerializers, useStorage } from "@vueuse/core";
import { ref, watch } from "vue";

export const useAuth = () => {
  const token = useStorage<string | null>("token", null, undefined, {
    serializer: StorageSerializers.string,
  });
  const check = ref(token.value !== null);
  const guest = ref(token.value === null);
  watch(token, () => {
    check.value = token.value !== null;
    guest.value = token.value === null;
  });

  return {
    check,
    guest,
  };
};
