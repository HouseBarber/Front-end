import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService';


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
      nomeFantasia: [''],
      cnpj: [''],
      cep: [''],
      endereco: [''],
      horarioAtendimento: [''],
      numero: [''],
      complemento: [''],
      estado: [''],
      cidade: [''],
      contato: [''],
      horario: [''],
      diasAtendimento: [''],
      faturamento: [''],
    });
    this.controlForm = this.estabelecimentoForm.controls;
  }


  onSubmit() {

  }


}
