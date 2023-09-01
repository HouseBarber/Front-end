
import {Role} from "./role";
import Auditable from './auditable';
import Address from "./address";

export default class User extends Auditable {

  id?: number;
  name?: string;
  email?: string;
  cpf?: string;
  cnpj?: string;
  telephone?: string;
  username?: string;
  password?: string;
  gender?: string;
  description?: string;
  roles?: Role[];
  dateBirth?: Date;

  address?: Address;

  // Auditable Properties
  override active?: boolean;
  override createdBy?: string;
  override createdDate?: Date;
  override lastModifiedBy?: string;
  override lastModifiedDate?: Date;

  constructor(
    id?: number,
    name?: string,
    cpf?: string,
    cnpj?: string,
    telephone?: string,
    username?: string,
    password?: string,
    email?: string,
    roles?: Role[],
    gender?: string,
    dateBirth?: Date,
    description?: string,
    address?: Address,
    // Auditable Properties
    active?: boolean,
    createdBy?: string,
    createdDate?: Date,
    lastModifiedBy?: string,
    lastModifiedDate?: Date
  ) {
    super();
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.cnpj = cnpj;
    this.telephone = telephone;
    this.username = username;
    this.password = password;
    this.email = email;
    this.roles = roles;
    this.gender = gender;
    this.dateBirth = dateBirth;
    this.description = description;
    this.description = description;
    this.gender = gender;
    this.address = address;
    // Auditable Properties
    this.active = active;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.lastModifiedBy = lastModifiedBy;
    this.lastModifiedDate = lastModifiedDate;

  }
}
