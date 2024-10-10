import { useState, useEffect, useContext } from "react";

import { useRouter } from 'next/navigation'

import homeStyles from "@/styles/Home.module.css";
import btnStyles from "@/styles/Button.module.css";
import iptStyles from "@/styles/Input.module.css";

import { Address, City, State } from "@/models";
import { cities as citiesMock, states as statesMock } from "@/data";
import { getAddressByStreetName } from "@/services/getAddressByStreetName";
import { Card } from "@/components/Card";

import { AddressContext } from "@/contexts/address";

import { geistMono, geistSans } from "./fonts";

export default function Home() {
  const router = useRouter()

  const { address, setAddress } = useContext(AddressContext);

  const [streetName, setStreetName] = useState("");
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [state, setState] = useState<State>({ nome: "" });
  const [city, setCity] = useState<City>({ estado: "", nome: "" });
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    setStates(statesMock);
  }, []);

  useEffect(() => {
    if (address.cep) router.push("detalhes/" + address.cep);
  }, [address.cep, router]);

  async function search() {
    if (!streetName.trim() || streetName.trim().length < 3) {
      alert("por favor digite um nome válido");
      return;
    }
    const ceps = await getAddressByStreetName(city, streetName);
    setAddresses(ceps);
  }

  function handleStateSelection(selectedState: string): void {
    handleCitySelection("");

    let state = states.filter((state) => state.nome === selectedState)[0];
    if (!state) state = new State();
    setState(state);

    const citiesFilteredByState = citiesMock.filter(
      (cityMock) => cityMock.estado === state.nome
    );
    setCities(citiesFilteredByState);
  }

  function handleCitySelection(selectedCity: string) {
    let city = cities.filter((city) => city.nome === selectedCity)[0];
    if (!city) city = new City();
    setCity(city);
  }

  function handleCepButton(selectedAddress: Address) {
    setAddress(selectedAddress);
  }

  return (
    <>
      <div
        className={`
          ${homeStyles.page} 
          ${geistSans.variable} 
          ${geistMono.variable}
        `}
      >
        <main className={homeStyles.main}>
          <h1>App para consulta de CEPs</h1>
          <span>
            Selecione um estado, cidade e informe um texto mais próximo possível
            da rua que se deseja localizar os CEPs
          </span>

          <section className={homeStyles.selectors}>
            <select
              value={state.nome}
              className={iptStyles.ipt}
              onChange={(a) => handleStateSelection(a.target.value)}
            >
              <option value={""}>Selecione um estado</option>
              {states.map((state: State) => (
                <option key={state.nome} value={state.nome}>
                  {state.nome}
                </option>
              ))}
            </select>

            <select
              disabled={!state.nome}
              value={city.nome}
              className={iptStyles.ipt}
              onChange={(a) => handleCitySelection(a.target.value)}
            >
              <option>Selecione uma cidade</option>
              {cities.map((city: City) => (
                <option key={city.estado + city.nome} value={city.nome}>
                  {city.nome}
                </option>
              ))}
            </select>
          </section>

          <form
            className={homeStyles.form}
            onSubmit={(e) => {
              search();
              e.preventDefault();
            }}
          >
            <input
              name="cep"
              disabled={!city.nome}
              value={streetName}
              className={iptStyles.ipt}
              onChange={(a) => setStreetName(a.target.value)}
            />
            <button
              disabled={!streetName}
              type="submit"
              className={btnStyles.btn}
            >
              buscar
            </button>
          </form>

          <div className={homeStyles.cards}>
            {addresses === undefined ? (
              <span>não é possível encontrar resultados várlidos</span>
            ) : (
              addresses.map((address) => {
                const { logradouro, cep } = address;
                return (
                  <Card
                    key={cep}
                    logradouro={logradouro}
                    cep={cep}
                    onClick={() => handleCepButton(address)}
                  />
                );
              })
            )}
          </div>
        </main>
        <footer className={homeStyles.footer}></footer>
      </div>
    </>
  );
}
