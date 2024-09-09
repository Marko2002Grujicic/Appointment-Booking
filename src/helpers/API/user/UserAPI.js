import { getCookie } from "../../cookies/cookies";
import { fetchData } from "../API_CALLS";

export class UserAPI {
  static async fetch() {
    const userId = getCookie("userId");
    const url = `/user/${userId}`;
    const data = await fetchData(url);
    return data[0];
  }
}
