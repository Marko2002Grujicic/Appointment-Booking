import { useMutation } from "react-query";
import { AppointmentsAPI } from "./AppointmentsAPI";
import { useInvalidateAppointments } from "./useAppointments";

export function useAppointmentsUpdate() {
  const invalidateAppointments = useInvalidateAppointments();
  return useMutation({
    mutationFn: AppointmentsAPI.update,
    onSuccess: () => invalidateAppointments(),
  });
}
