import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { EstablishmentService } from 'src/app/services/establishmentService';
import { ToastrService } from 'ngx-toastr';
import Estabelecimento from 'src/app/models/estabelecimento';
import { AuthService } from 'src/app/services/authService';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';



@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss'],
})
export class EstablishmentListComponent implements OnInit, AfterViewInit{
  estabelecimento: Estabelecimento[] = [];
  dataSource = new MatTableDataSource<Estabelecimento>(this.estabelecimento);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    console.log(this.paginator);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

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
          this.dataSource.data = this.estabelecimento;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Erro ao buscar estabelecimentos");
      }
    });
  }

  editEstablishment(row: any): void{
    console.log(row);

  }
}
