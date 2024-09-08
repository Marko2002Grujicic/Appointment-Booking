import { useMutation } from "react-query";
import { AppointmentsAPI } from "./AppointmentsAPI";
import { useInvalidateAppointments } from "./useAppointments";

export function useAppointmentsDelete() {
  const invalidateAppointments = useInvalidateAppointments();

  return useMutation({
    mutationFn: AppointmentsAPI.delete,
    onSuccess: () => {
      invalidateAppointments();
    },
  });
}
