import { useQuery } from "react-query";
import { GuestsAPI } from "./GuestsAPI";

export function useGuestsEmails() {
  return useQuery({
    queryKey: ["guests-emails"],
    queryFn: GuestsAPI.fetchGuestEmails,
    refetchOnMount: true,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}
