import { Address } from "@/models";
import { createContext } from "react";

interface AddressContextProps {
  address: Address;
  setAddress: (address: Address) => void;
}

const AddressContext = createContext({
  address: { cep: "" },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAddress: (selectedAddress) => {},
} as AddressContextProps);

export { AddressContext };
