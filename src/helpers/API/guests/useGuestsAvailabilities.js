import { useQuery, useQueryClient } from "react-query";
import { GuestsAPI } from "./GuestsAPI";

const GUESTS_AVAILABILITIES = "guests-availabilities";

export function useGuestsAvailabilities(emails) {
  return useQuery({
    queryKey: [GUESTS_AVAILABILITIES, emails],
    queryFn: () => GuestsAPI.fetchGuestAvailabilities(emails),
    refetchOnMount: true,
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(emails),
  });
}

export function useInvalidateGuestsAvailabilities() {
  const queryClient = useQueryClient();

  return (emails) => {
    queryClient.invalidateQueries([GUESTS_AVAILABILITIES, emails]);
  };
}
