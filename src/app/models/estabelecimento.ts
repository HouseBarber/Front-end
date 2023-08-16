import Endereco from "./endereco";


export default class Estabelecimento{
  endereco?: Endereco;
  name?: string;
  cnpj?: string;
  email?: string;
  contact?: string;
  billing?: string;
  time?: string;
  daysOpens?: string;
  photos?: string;

  constructor(
    endereco?: Endereco,
    cnpj?: string,
    email?: string,
    name?: string,
    contact?: string,
    billing?: string,
    time?: string,
    daysOpens?: string,
    photos?: string,
    
    
  ) {
    this.endereco = endereco;
    this.cnpj = cnpj;
    this.email = email;
    this.name = name;
    this.contact = contact;
    this.billing = billing;
    this.time = time;
    this.daysOpens = daysOpens;
    this.photos = photos;
  }
}
