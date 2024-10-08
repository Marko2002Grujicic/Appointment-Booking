import {
  createData,
  deleteData,
  editData,
  fetchData,
} from "../../../helpers/API/API_CALLS";

export class AppointmentsAPI {
  static async fetch() {
    try {
      return await fetchData("/appointments");
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }
  static async update({ eventId, formattedEvent }) {
    const url = `/appointments/${eventId}`;
    const updatedEvents = await editData(formattedEvent, url);
    return updatedEvents;
  }
  static async create({ formattedEvent }) {
    const newEvents = await createData(formattedEvent, "/appointments");
    return newEvents;
  }
  static async delete({ eventId }) {
    const url = `/delete-appointments/${eventId}`;
    const eventsWithoutDeleted = await deleteData(url);

    return eventsWithoutDeleted;
  }
}
