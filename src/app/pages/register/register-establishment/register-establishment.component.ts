import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstablishmentService } from 'src/app/services/EstablishmentService';

@Component({
  selector: 'app-register-establishment',
  templateUrl: './register-establishment.component.html',
  styleUrls: ['./register-establishment.component.scss']
})
export class RegisterEstablishmentComponent {
  registerEstablishmentForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private establishmentService: EstablishmentService,
  ) {
    this.registerEstablishmentForm = this.formBuilder.group({
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      complemento: ['', Validators.required],
      numero: ['', Validators.required],
      cep: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
    });
  }

  onSubmit(){
    const canRegister = this.validateRegister(
      this.registerEstablishmentForm.value.rua,
      this.registerEstablishmentForm.value.bairro,
      this.registerEstablishmentForm.value.complemento,
      this.registerEstablishmentForm.value.numero,
      this.registerEstablishmentForm.value.cep,
      this.registerEstablishmentForm.value.estado,
      this.registerEstablishmentForm.value.cidade
    );

    if(canRegister){
      this.toastr.success('cadastro realizado com sucesso')
      console.log("Dados barbearia: ", this.registerEstablishmentForm.value)
      this.establishmentService.adicionarDadosCadastro(this.registerEstablishmentForm.value);
    }
  }

  validateRegister(rua: string, bairro: string, complemento: string, numero: string,
    cep: string, estado: string, cidade: string, ): boolean | null{
    let returnError = false;
    if (rua === null || rua.length === 0) {
      this.toastr.error('O nome da rua é obrigatório')
      returnError = true;
    }
    if (bairro === null || bairro.length === 0) {
      this.toastr.error('O nome do bairro é obrigatório')
      returnError = true;
    }
    if (complemento === null || complemento.length === 0) {
      this.toastr.error('O complemento é obrigatório')
      returnError = true;
    }
    if (numero === null || numero.length === 0) {
      this.toastr.error('O numero é obrigatório')
      returnError = true;
    }
    if (cep === null || cep.length === 0) {
      this.toastr.error('O cep é obrigatório')
      returnError = true;
    }
    if (estado === null || estado.length === 0) {
      this.toastr.error('O estado é obrigatório')
      returnError = true;
    }
    if (cidade === null || cidade.length === 0) {
      this.toastr.error('A cidade é obrigatório')
      returnError = true;
    }
    return !returnError;
  }
}
