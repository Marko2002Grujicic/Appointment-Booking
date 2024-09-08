import { object, number, array, string } from "yup";

const daySchema = array()
  .of(
    object().shape({
      id: string().nullable(),
      start: number().when("end", {
        is: (end) => end !== undefined && end !== null,
        then: () =>
          number().test(
            "isStartTimeLessOrEqualEndTime",
            "startBeforeEnd",
            (startTime, context) => {
              const endTime = context.parent.end;
              return startTime < endTime;
            }
          ),
        otherwise: () => number().required("Start Time required"),
      }),
      end: number().required("End time required"),
    })
  )
  .test("DoesntOverlap", "availabilityNoOverlaps", (availabilities) => {
    const indexOfIncompleteAvailability = availabilities.findIndex(
      (obj) => obj.id && (!obj.start || !obj.end)
    );
    if (indexOfIncompleteAvailability > 0) return true;
    if (!availabilities.length || availabilities.length === 1) return true;

    availabilities.sort((obj1, obj2) => obj1.start - obj2.start);

    return availabilities.every((availability, index, availabilities) => {
      if (index === availabilities.length - 1) return true;
      return availability.end < availabilities[index + 1].start;
    });
  });

export const availabilitySchema = object().shape({
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema,
});
