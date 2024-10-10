import { BASE_URL as baseURL } from "./config";

async function fetchGET<T>(endpoint: string): Promise<T> {
  let json;
  try {
    const response = await window.fetch(baseURL + endpoint);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    json = await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    return json;
  }
}

export { fetchGET };
