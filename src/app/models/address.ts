export default class Address {
    id?: number;
    cep?: string;
    city?: string;
    state?: string;
    neighborhood?: string;
    street?: string;
    number?: string;
    complement?: string;

    constructor(
        id?: number,
        cep?: string,
        city?: string,
        state?: string,
        neighborhood?: string,
        street?: string,
        number?: string,
        complement?: string,
    ) {
        this.id = id;
        this.cep = cep;
        this.city = city;
        this.state = state;
        this.neighborhood = neighborhood;
        this.street = street;
        this.number = number;
        this.complement = complement;
    }
}
