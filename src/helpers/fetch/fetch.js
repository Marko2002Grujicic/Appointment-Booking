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

export async function createData(data, url) {
  const userId = getCookie("userId");
  const token = getCookie("authToken");
  if (!token || !data || !url || !userId) return;
  return await axios.post(
    `${baseAPIUrl}${url}`,
    {
      ...data,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function deleteData(url) {
  const token = getCookie("authToken");
  if (!token || !url) return;
  return await axios.delete(`${baseAPIUrl}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const fetchUserEmails = async () => {
  try {
    return await fetchData(`/user-emails`);
  } catch (error) {
    console.error("Error fetching user emails:", error);
    return [];
  }
};
