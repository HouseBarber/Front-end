import Address from "./address";

export default class Estabelecimento{

  id!: number;
  address?: Address;
  name?: string;
  contact?: string;
  billing?: string;
  cnpj?: string;
  time?: string;
  daysOpens?: string;
  photos?: string;
  formattedAddress?: string;

  constructor(
    address?: Address,
    name?: string,
    contact?: string,
    billing?: string,
    cnpj?: string,
    time?: string,
    daysOpens?: string,
    photos?: string,
    formattedAddress?: string
  ) {
    this.address = address;
    this.name = name;
    this.contact = contact;
    this.billing =  billing;
    this.cnpj = cnpj;
    this.time = time;
    this.daysOpens = daysOpens;
    this.photos = photos;
    this.formattedAddress = formattedAddress;
  }
}
