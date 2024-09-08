import { useMutation } from "react-query";
import { AppointmentsAPI } from "./AppointmentsAPI";
import { useInvalidateAppointments } from "./useAppointments";

export function useAppointmentsCreate() {
  const invalidateAppointments = useInvalidateAppointments();

  return useMutation({
    mutationFn: AppointmentsAPI.create,
    onSuccess: () => invalidateAppointments(),
  });
}
