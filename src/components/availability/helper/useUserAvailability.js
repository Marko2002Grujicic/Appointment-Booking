import { useQuery, useQueryClient } from "react-query";
import { getCookie } from "../../../helpers/cookies/cookies";
import { AvailabilityAPI } from "./AvailabilityAPI";

const USER_AVAILABILITY = "user-availability";

export function useUserAvailability() {
  const userId = getCookie("userId");
  return useQuery({
    queryKey: [USER_AVAILABILITY, userId],
    queryFn: (context) => AvailabilityAPI.fetch(context.meta),
    meta: userId,
    refetchOnMount: true,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}

export function useInvalidateUserAvailability() {
  const queryClient = useQueryClient();
  const userId = getCookie("userId");

  return () => queryClient.invalidateQueries(USER_AVAILABILITY, userId);
}
