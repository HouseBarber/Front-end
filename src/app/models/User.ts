import {Role} from "./role";
import Auditable from './auditable';
import Address from "./address";

export default class User extends Auditable {

  id!: number;
  name!: string;
  email!: string;
  cpf?: string;
  cnpj?: string;
  telephone!: string;
  username!: string;
  password!: string;
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
}
