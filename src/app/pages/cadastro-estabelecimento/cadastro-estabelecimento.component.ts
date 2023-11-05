import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService';
import { ActivatedRoute } from '@angular/router';
import {EstablishmentService} from "../../services/establishmentService";
import Estabelecimento from "../../models/estabelecimento";


@Component({
  selector: 'app-cadastro-estabelecimento',
  templateUrl: './cadastro-estabelecimento.component.html',
  styleUrls: ['./cadastro-estabelecimento.component.scss']
})
export class CadastroEstabelecimentoComponent implements OnInit{
  establishment: Estabelecimento = new Estabelecimento();
  estabelecimentoForm!: FormGroup;
  controlForm: { [key: string]: AbstractControl } = {};

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private establishmentService: EstablishmentService
  ){


  }



  Edit() {

  }



  ngOnInit(): void {


    this.router.params.subscribe(params => {
      console.log(params);
      if(Object.keys(params).length == 0){
        console.log("teste")
        this.initializeForms();
        return;
      }

      this.loadEstablishment(params['id']);

    });
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

  loadEstablishment(establishmentId: number): void{
    console.log(establishmentId);
    this.establishmentService.findEstablishmentById(establishmentId).subscribe((establishment) => {
        this.establishment = establishment.object;

        this.estabelecimentoForm = this.formBuilder.group({

          nomeFantasia: this.establishment.nomeFantasia,
          // cnpj realmente deve esta aqui?
          //cnpj: this.establishment.,
          cep: this.establishment.endereco?.cep,
          // endereco: this.establishment.,
          horarioAtendimento: this.establishment.nomeFantasia,
          numero: this.establishment.endereco?.number,
          complemento: this.establishment.endereco?.complement,
          estado: this.establishment.endereco?.state,
          cidade: this.establishment.endereco?.city,
          contato: this.establishment.contato,
          horario: this.establishment.horario,
          diasAtendimento: this.establishment.horario,
          faturamento: this.establishment.faturamento,
        })
      },
      error => {
        this.toastr.error("Erro ao buscar estabelecimento");
      }
    )
  }

}
