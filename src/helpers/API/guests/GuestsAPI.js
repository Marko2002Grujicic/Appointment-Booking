import axios from "axios";
import { getCookie } from "../../cookies/cookies";
import { fetchData } from "../API_CALLS";

export class GuestsAPI {
  static async fetchGuestEmails() {
    return await fetchData(`/user-emails`);
  }
  static async fetchGuestAvailabilities(emails) {
    const response = await getGuestsAvailability(emails);
    return response.data;
  }
}

async function getGuestsAvailability(emails) {
  const token = getCookie("authToken");
  const url = "http://localhost:5000/user-availabilities";
  if (!token) return;
  try {
    return await axios.post(
      url,
      { ...emails },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch {
    return {};
  }
}
