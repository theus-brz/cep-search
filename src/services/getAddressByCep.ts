import { api } from "@/config";
import { Address } from "@/models";

async function getAddressByCep(cep: string) {
  try {
    if (!cep || typeof cep != "string") throw Error('Invalid param at getAddressByCep: ' + cep);
    const response = await api.get<Address>(cep + "/json");
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { getAddressByCep };
