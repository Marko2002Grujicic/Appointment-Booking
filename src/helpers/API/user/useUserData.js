import { useQuery } from "react-query";
import { getCookie } from "../../cookies/cookies";
import { UserAPI } from "./UserAPI";

export function useUserData() {
  const userId = getCookie("userId");
  return useQuery({
    queryKey: ["user-data", userId],
    queryFn: (context) => UserAPI.fetch(context.meta),
    meta: userId,
    refetchOnMount: true,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}
