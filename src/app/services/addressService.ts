import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import Address from "../models/address";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AddressService{
  private path = '/v1/address';

  constructor(private http: HttpClient) {}

  getAddressByCep(cep : String): Observable<Address>{
    return this.http.get(`${environment.api}${this.path}/${cep}`);
  }
}
