import Endereco from "./endereco";


export default class Estabelecimento{
  endereco?: Endereco;
  establishmentName?: string;
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
    establishmentName?: string,
    contact?: string,
    billing?: string,
    time?: string,
    daysOpens?: string,
    photos?: string,
    
    
  ) {
    this.endereco = endereco;
    this.cnpj = cnpj;
    this.email = email;
    this.establishmentName = establishmentName;
    this.contact = contact;
    this.billing = billing;
    this.time = time;
    this.daysOpens = daysOpens;
    this.photos = photos;
  }
}
