import { Address } from "@/models/Address";
import { fetchGET } from "@/config";
import { City } from "@/models";

async function getAddressByStreetName(city: City, streetName: string): Promise<Address[]> {
  const search = city.estado + "/" + city.nome + "/" + streetName + "/json";
  const response = await fetchGET<Address[]>(search);
  return response;
}

export { getAddressByStreetName };