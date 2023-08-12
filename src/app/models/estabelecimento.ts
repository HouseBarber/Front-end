import Endereco from "./endereco";


export default class Estabelecimento{
  endereco?: Endereco;
  nomeFantasia?: string;
  cnpj?: string;
  email?: string;
  contact?: string;
  faturamento?: string;
  horario?: string;
  diasAtendimento?: string;
  foto?: string;

  constructor(
    endereco?: Endereco,
    cnpj?: string,
    email?: string,
    nomeFantasia?: string,
    contact?: string,
    faturamento?: string,
    horario?: string,
    diasAtendimento?: string,
    foto?: string,
    
    
  ) {
    this.endereco = endereco;
    this.cnpj = cnpj;
    this.email = email;
    this.nomeFantasia = nomeFantasia;
    this.contact = contact;
    this.faturamento =  faturamento;
    this.horario = horario;
    this.diasAtendimento = diasAtendimento;
    this.foto = foto;
  }
}
