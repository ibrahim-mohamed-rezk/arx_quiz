import axios from "axios";

const API_URL = "https://palegreen-weasel-574112.hostingersite.com/api/";

export const backendApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postData = async (endpoint: string, data: object) => {
  try {
    const response = await backendApi.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
};

export const getData = async (endpoint: string) => {
  try {
    const response = await backendApi.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};
