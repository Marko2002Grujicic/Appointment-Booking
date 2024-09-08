import { uniqueId } from "lodash";
import { editData, fetchData } from "../../../helpers/fetch/fetch";
import { getCookie } from "../../../helpers/cookies/cookies";

export class AvailabilityAPI {
  static #END_OF_DAY = 86400;

  static async fetch(userId) {
    if (!userId) throw new Error("User id is required");
    const response = await fetchData(`/users/${userId}/availability`);
    const adaptedResponse = AvailabilityAPI.#adaptAvailabilityToUI(response);
    return AvailabilityAPI.#adaptBorderEndTime(adaptedResponse);
  }
  static #adaptBorderEndTime(availability) {
    if (!availability) return availability;
    Object.keys(availability).forEach((key) => {
      availability[key] = availability[key].map((slot) => {
        if (slot.end !== AvailabilityAPI.#END_OF_DAY) return slot;
        slot.end = slot.end - 1;
        return slot;
      });
    });
    return availability;
  }

  static #adaptAvailabilityToUI(availability) {
    const adaptedAvailability = {};

    Object.keys(availability).forEach((day) => {
      adaptedAvailability[day] = availability[day].map((slot) => ({
        ...slot,
        id: uniqueId(),
      }));
    });
    return adaptedAvailability;
  }

  static #adaptAvailabilityToAPI(availability) {
    const adaptedAvailability = {};

    Object.keys(availability).forEach((day) => {
      adaptedAvailability[day] = availability[day].map(
        ({ id, ...rest }) => rest
      );
    });
    return adaptedAvailability;
  }

  static async update(availability) {
    console.log(availability);
    const userId = Number(getCookie("userId"));
    const url = `/users/${userId}/availability`;
    const formatedAvailability =
      AvailabilityAPI.#adaptBorderEndTime(availability);
    const response = await editData(
      AvailabilityAPI.#adaptAvailabilityToAPI(formatedAvailability),
      url
    );
    return AvailabilityAPI.#adaptBorderEndTime(
      JSON.parse(response.config.data)
    );
  }
}
