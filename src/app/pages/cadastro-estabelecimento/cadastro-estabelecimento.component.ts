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
      this.initializeForms();
      if(!(Object.keys(params).length == 0)){
        this.loadEstablishment(params['id']);
      }
    });
  }

  initializeForms(): void {
    this.estabelecimentoForm = this.formBuilder.group({
      name: [''],
      cnpj: [''],
      cep: [''],
      time: [''],
      number: [''],
      complement: [''],
      state: [''],
      city: [''],
      contact: [''],
      daysOpens: [''],
      billing: [''],
    });
    this.controlForm = this.estabelecimentoForm.controls;
  }


  onSubmit() {

  }

  loadEstablishment(establishmentId: number): void{
    console.log(establishmentId);
    this.establishmentService.findEstablishmentById(establishmentId).subscribe((info) => {
        this.establishment = info.object;
        this.estabelecimentoForm.patchValue({
          name: this.establishment.name || '',
          cep: this.establishment.address?.cep || '',
          cnpj: this.establishment.cnpj || '',
          number: this.establishment.address?.number || '',
          complement: this.establishment.address?.complement || '',
          state: this.establishment.address?.state || '',
          city: this.establishment.address?.city || '',
          contact: this.establishment.contact || '',
          time: this.establishment.time || '',
          daysOpens: this.establishment.daysOpens || '',
          billing: this.establishment.billing || '',
        })
        this.controlForm = this.estabelecimentoForm.controls;
      },
      error => {
        this.toastr.error("Erro ao buscar estabelecimento");
      }
    )
  }

}
