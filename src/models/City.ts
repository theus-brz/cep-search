class City {
  estado: string;
  nome: string;

  constructor({ estado, nome }: City = { estado: "", nome: "" }) {
    this.estado = estado;
    this.nome = nome;
  }
}

export { City };
