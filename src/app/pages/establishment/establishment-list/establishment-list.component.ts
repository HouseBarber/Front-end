import { Component } from '@angular/core';

@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss']
})
export class EstablishmentListComponent {
  myDataArray: any[] = [
      { nome: 'Jo ão', cnpj: 25, endereco: 'São Paulo' },
    { nome: 'Maria', cnpj: 30, endereco: 'Rio de Janeiro' },
    { nome: 'Pedro', cnpj: 28, endereco: 'Belo Horizonte' },
    { nome: 'Ana', cnpj: 22, endereco: 'Salvador' }
    ];

  displayedColumns: string[] = ['nome', 'cnpj', 'endereco'];

}
