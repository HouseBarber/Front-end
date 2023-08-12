import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Estabelecimento from 'src/app/models/estabelecimento';
import { AuthService } from 'src/app/services/authService';
import { isEmailValid } from 'src/app/utils/validadorEmail';


@Component({
  selector: 'app-cadastro-estabelecimento',
  templateUrl: './cadastro-estabelecimento.component.html',
  styleUrls: ['./cadastro-estabelecimento.component.scss']
})
export class CadastroEstabelecimentoComponent implements OnInit {

  estabelecimentoForm!: FormGroup;
  controlForm: { [key: string]: AbstractControl } = {};

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {


  }

  ngOnInit(): void {
    this.initializeForms();

  }

  initializeForms(): void {
    this.estabelecimentoForm = this.formBuilder.group({
      nomeFantasia: ['', Validators.required],
      cnpj: ['', Validators.required],
      contact: ['', Validators.required],
    });
    this.controlForm = this.estabelecimentoForm.controls;
  }


  onSubmit() {
    const canRegister = this.validateRegister(
      this.estabelecimentoForm.value.nomeFantasia,
      this.estabelecimentoForm.value.cnpj,
      this.estabelecimentoForm.value.email,
      this.estabelecimentoForm.value.contact,
    );

    if (!canRegister) {
      this.toastr.error("Existe informacoes a serem preenchidas.")
      return;
    }

    const userToRegister = new Estabelecimento();
    userToRegister.nomeFantasia = this.estabelecimentoForm.value.nomeFantasia;
    userToRegister.cnpj = this.estabelecimentoForm.value.cnpj;
    userToRegister.email = this.estabelecimentoForm.value.email;
    userToRegister.contact = this.estabelecimentoForm.value.contact;
    this.authService.signUp(userToRegister).subscribe({
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
