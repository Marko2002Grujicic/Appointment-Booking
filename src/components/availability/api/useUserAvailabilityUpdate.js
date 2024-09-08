import { useMutation } from "react-query";
import { AvailabilityAPI } from "./AvailabilityAPI";
import { useInvalidateUserAvailability } from "./useUserAvailability";

export function useUserAvailabilityUpdate() {
  const invalideteUserAvailability = useInvalidateUserAvailability();
  return useMutation({
    mutationFn: AvailabilityAPI.update,
    onSuccess: () => invalideteUserAvailability(),
  });
}
