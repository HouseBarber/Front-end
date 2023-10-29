import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService';
import Estabelecimento from 'src/app/models/estabelecimento';
import { EstablishmentService } from 'src/app/services/establishmentService';
import { isEmailValid } from 'src/app/utils/validadorEmail';
import { ValidatorCpfCnpj } from 'src/app/utils/validatorCpfCnpj';




@Component({
  selector: 'app-cadastro-estabelecimento',
  templateUrl: './cadastro-estabelecimento.component.html',
  template: `
    <form>
      <label for="cpfCnpj">CPF/CNPJ:</label>
      <input type="text" id="cpfCnpj" name="cpfCnpj" (input)="applyMask($event.target.value)">
    </form>
  `,
  styleUrls: ['./cadastro-estabelecimento.component.scss']
})
export class CadastroEstabelecimentoComponent implements OnInit {

  estabelecimentoForm!: FormGroup;
  validadorCNPJ: ValidatorCpfCnpj = new ValidatorCpfCnpj();
  controlForm: { [key: string]: AbstractControl } = {};

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private establishmentService: EstablishmentService
  ) {


  }

  ngOnInit(): void {
    this.initializeForms();

  }

  initializeForms(): void {
    this.estabelecimentoForm = this.formBuilder.group({
      establishmentName: ['', Validators.required],
      cnpj: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      contact: ['', Validators.required],
      cep:[''],
      city:[''],
      state:[''],
      street:[''],
      number:[''],
      complement: [''],


    });
    this.controlForm = this.estabelecimentoForm.controls;
  }



  onSubmit() {
    const canRegister = this.validateRegister(
      this.estabelecimentoForm.value.establishmentName,
      this.estabelecimentoForm.value.cnpj,
      this.estabelecimentoForm.value.email,
      this.estabelecimentoForm.value.contact,
    );

    if (!canRegister) {
      this.toastr.error("Existe informacoes a serem preenchidas.")
      return;
    }

    const userToRegister = new Estabelecimento();
    userToRegister.establishmentName = this.estabelecimentoForm.value.establishmentName;
    userToRegister.cnpj = this.estabelecimentoForm.value.cnpj;
    userToRegister.email = this.estabelecimentoForm.value.email;
    userToRegister.contact = this.estabelecimentoForm.value.contact;
    this.establishmentService.signUp(userToRegister).subscribe({
      next: () => {
        this.toastr.success("Estabelecimento cadastrado com sucesso!")
        this.router.navigate(['']);
      }, error: () => {
        this.toastr.error("Erro interno, tente mais tarde.")
      }
    });



  }



  validateRegister(nomeFantasia: string, email: string, contact: string,
    cnpj: string): boolean | null {
    let returnError = false;
    if (nomeFantasia === null || nomeFantasia.length === 0) {
      this.toastr.error('O Nome Fantasia é obrigatório')

      returnError = true;
    }
    if (email === null || email.length === 0) {
      this.toastr.error('O e-mail é obrigatório')
      returnError = true;
    }
    if (!isEmailValid(email)) {
      this.toastr.error('O e-mail é inválido')
      returnError = true;
    }
    if (cnpj === null || cnpj.length === 0) {
      this.toastr.error('O CNPJ é obrigatório')
      returnError = true;
    }

    if (contact === null || contact.length === 0) {
      this.toastr.error('O contato é obrigatório')
      returnError = true;
    }
    return !returnError;
  }




}
