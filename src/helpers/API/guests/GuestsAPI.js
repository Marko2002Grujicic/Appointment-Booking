import { fetchData } from "../API_CALLS";

export class GuestsAPI {
  static async fetchGuestEmails() {
    return await fetchData(`/user-emails`);
  }
  static async fetchGuestAvailabilities() {
    return await fetchData("/user-availabilities");
  }
}
