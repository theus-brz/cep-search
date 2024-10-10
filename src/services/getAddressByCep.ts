import { api } from "@/config";
import { Address } from "@/models";

async function getAddressByCep(cep: string) {
  const response = await api.get<Address>(cep + "/json");
  return response;
}

export { getAddressByCep };
