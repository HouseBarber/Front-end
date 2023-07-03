import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService';
import { RolesService } from 'src/app/services/rolesService';


@Component({
  selector: 'app-cadastro-estabelecimento',
  templateUrl: './cadastro-estabelecimento.component.html',
  styleUrls: ['./cadastro-estabelecimento.component.scss']
})
export class CadastroEstabelecimentoComponent implements OnInit{

  estabelecimentoForm!: FormGroup;
  controlForm: { [key: string]: AbstractControl } = {};

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ){


  }

  

  Edit() {

  }



  ngOnInit(): void {
    this.initializeForms();
        
  }

  initializeForms(): void {
    this.estabelecimentoForm = this.formBuilder.group({
      username: [''],
      cnpj: [''],
      nomeFantasia: [''],
      contato: [''],
      horarioAtendimento: [''],
      dateBirth: [''],
      password: [''],
      confirmPassword: [''],
      role: [],
    });
    this.controlForm = this.estabelecimentoForm.controls;
  }


  onSubmit() {

  }


}
