import { useState } from "react";

import type { AppProps } from "next/app";

import { AddressContext } from "@/contexts/address";
import { Address } from "@/models";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [address, setAddress] = useState({} as Address);

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      <Component {...pageProps} />
    </AddressContext.Provider>
  );
}
