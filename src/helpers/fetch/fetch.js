import axios from "axios";
import { getCookie } from "../cookies/cookies";

const baseAPIUrl = `http://localhost:5000`;

export async function fetchData(url) {
  const token = getCookie("authToken");
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  try {
    const response = await axios.get(`${baseAPIUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
}

export async function editData(data, url) {
  const token = getCookie("authToken");
  if (!token || !data || !url) return;

  return await axios.put(
    `${baseAPIUrl}${url}`,
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function fetchUserAvailability(userId) {
  if (!userId) return;
  try {
    const response = await axios.get(
      `${baseAPIUrl}/users/${userId}/availability`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user availability:", error.message);
    return {};
  }
}

export const fetchEvents = async (setter) => {
  try {
    const events = await fetchData("/meetings");
    setter(events);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

export const fetchUserEmails = async () => {
  try {
    return await fetchData(`/user-emails`);
  } catch (error) {
    console.error("Error fetching user emails:", error);
    return [];
  }
};

export const editMeeting = async (eventId, formattedEvent) => {
  const token = getCookie("authToken");
  const url = `/meetings/${eventId}`;

  if (!formattedEvent || !token) return;
  return await editData(formattedEvent, url);
};

export const createMeeting = async (formattedEvent) => {
  const userId = getCookie("userId");
  const token = getCookie("authToken");

  if (!formattedEvent || !userId || !token) return;

  return await axios.post(
    `${baseAPIUrl}/meetings`,
    {
      ...formattedEvent,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
