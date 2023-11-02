import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from 'src/app/services/establishmentService';
import { ToastrService } from 'ngx-toastr';
import Estabelecimento from 'src/app/models/estabelecimento';
import { AuthService } from 'src/app/services/authService';
import {Page} from "../../../models/Page";



@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss']
})
export class EstablishmentListComponent implements OnInit{
  estabelecimento: Estabelecimento[] = [];

  constructor(
    private establishmentService: EstablishmentService,
    private authService: AuthService,
    private toastr: ToastrService
  ){

  }
  displayedColumns: string[] = ['id','nome', 'cnpj', 'endereco'];

  ngOnInit(): void {
    this.popularEstablishment();
  }
  popularEstablishment(): void {
    const userId = this.authService.getUserByToken()!.id;
    this.establishmentService.getAllEstablishments(userId).subscribe({
      next: (info) => {
        if (info.object.content && info.object.content.length > 0) {
          console.log(info);
          this.estabelecimento = info.object.content;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Erro ao buscar estabelecimentos");
      }
    });
  }
}
