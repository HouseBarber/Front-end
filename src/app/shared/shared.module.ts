import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { PipeMenuPipe } from './pipes/pipe-menu.pipe';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    PipeMenuPipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    PipeMenuPipe
  ]
})
export class SharedModule { }
