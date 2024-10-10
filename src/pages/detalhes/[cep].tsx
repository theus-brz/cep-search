import { useRouter } from "next/router";

import { AddressContext } from "@/contexts/address";
import { useEffect, useContext } from "react";

import { geistMono, geistSans } from "../fonts";

import homeStyles from "@/styles/Home.module.css";
import { getAddressByCep } from "@/services/getAddressByCep";

export default function Page() {
  const router = useRouter();
  const { address, setAddress } = useContext(AddressContext);

  useEffect(() => {
    const { cep } = router.query;
    if (typeof cep == "string") retrieveAddressIfMissing(cep);
  });

  async function retrieveAddressIfMissing(cep: string) {
    const { data } = await getAddressByCep(cep);
    setAddress(data);
  }

  return (
    <div
      className={`
      ${homeStyles.page} 
      ${geistSans.variable} 
      ${geistMono.variable}
    `}
    >
      <main className={homeStyles.main}>
        <h1>Detalhes</h1>
        <span>{address.logradouro}</span>
        <span>{address.bairro}</span>
        <span>{address.localidade}</span>
        <span>{address.cep}</span>
      </main>
    </div>
  );
}
