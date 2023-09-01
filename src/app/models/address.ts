export default class Address {
  id?: number;
  street?: string;
  cep?: string;
  city?: string;
  state?: string;
  complement?: string;
  number?: string;
  neighborhood?: string;

  constructor(
    id?: number,
    street?: string,
    cep?: string,
    city?: string,
    state?: string,
    complement?: string,
    number?: string,
    neighborhood?: string,
  ) {
    this.id = id;
    this.street = street;
    this.cep = cep;
    this.city = city;
    this.state = state;
    this.complement = complement;
    this.number = number;
    this.neighborhood = neighborhood;
  }
}
