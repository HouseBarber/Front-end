export default class Address{
 rua?: string;
 cep?: string;
 cidade?: string;
 estado?: string;
 complemento?: string;
 numero?: string;

  constructor(
    rua?: string,
    cep?: string,
    cidade?: string,
    estado?: string,
    complemento?: string,
    numero?: string,
  ) {
    this.rua = rua;
    this.cep = cep;
    this.cidade = cidade;
    this.estado = estado;
    this.complemento = complemento;
    this.numero = numero;
  }
}
