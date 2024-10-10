class State {
  nome: string;

  constructor({ nome }: State = { nome: "" }) {
    this.nome = nome;
  }
}

export { State };
