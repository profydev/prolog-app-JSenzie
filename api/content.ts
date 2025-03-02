import { axios } from "./axios";
import { PageData } from "./content.types";

const ENDPOINT = "/content-page/home";

export async function getContent() {
  try {
    const { data } = await axios.get<PageData>(ENDPOINT);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
