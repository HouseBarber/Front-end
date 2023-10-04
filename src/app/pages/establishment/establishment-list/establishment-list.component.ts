import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from 'src/app/services/establishmentService';
import { ToastrService } from 'ngx-toastr';
import Estabelecimento from 'src/app/models/estabelecimento';
import { AuthService } from 'src/app/services/authService';



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
    this.establishmentService.getAllEstablishment(this.authService.getUserByToken()!.id).subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.estabelecimento = response;
        }
      },
      error: () => {
        this.toastr.error("Erro ao buscar estabelecimentos");
      }
    });
  }
}
