import Address from "./address";

export default class Estabelecimento{

  id!: number;
  endereco?: Address;
  nomeFantasia?: string;
  contato?: string;
  faturamento?: string;
  horario?: string;
  diasAtendimento?: string;
  foto?: string;
  formattedAddress?: string;

  constructor(
    endereco?: Address,
    nomeFantasia?: string,
    contato?: string,
    faturamento?: string,
    horario?: string,
    diasAtendimento?: string,
    foto?: string,
    formattedAddress?: string
  ) {
    this.endereco = endereco;
    this.nomeFantasia = nomeFantasia;
    this.contato = contato;
    this.faturamento =  faturamento;
    this.horario = horario;
    this.diasAtendimento = diasAtendimento;
    this.foto = foto;
    this.formattedAddress = formattedAddress;
  }
}
