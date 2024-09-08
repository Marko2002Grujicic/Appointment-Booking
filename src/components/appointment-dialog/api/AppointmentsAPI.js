import {
  createData,
  deleteData,
  editData,
  fetchData,
} from "../../../helpers/fetch/fetch";

export class AppointmentsAPI {
  static async fetch() {
    try {
      return await fetchData("/appointments");
    } catch (error) {
      console.log("Error fetching events:", error);
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
    const url = `/delete-appointment/${eventId}`;
    const eventsWithoutDeleted = await deleteData(url);

    return eventsWithoutDeleted;
  }
}
