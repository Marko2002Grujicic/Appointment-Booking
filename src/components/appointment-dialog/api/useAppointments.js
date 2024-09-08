import { useQuery, useQueryClient } from "react-query";
import { getCookie } from "../../../helpers/cookies/cookies";
import { AppointmentsAPI } from "./AppointmentsAPI";

const USER_EVENTS = "user-events";

export function useAppontments() {
  const userId = getCookie("userId");
  return useQuery({
    queryKey: [USER_EVENTS, userId],
    queryFn: (context) => AppointmentsAPI.fetch(context.meta),
    meta: userId,
    refetchOnMount: true,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: Boolean(userId),
  });
}

export function useInvalidateAppointments() {
  const queryClient = useQueryClient();
  const userId = getCookie("userId");

  return () => queryClient.invalidateQueries(USER_EVENTS, userId);
}
