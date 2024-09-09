import { useQuery } from "react-query";
import { GuestsAPI } from "./GuestsAPI";

export function useGuestsAvailabilities() {
  return useQuery({
    queryKey: ["guests-availabilities"],
    queryFn: GuestsAPI.fetchGuestAvailabilities,
    refetchOnMount: true,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}
