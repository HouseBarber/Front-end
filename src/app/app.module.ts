import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoutSessionComponent } from './components/logout-session/logout-session.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { PhoneFormatDirective } from './utils/phone-format.directive';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { CadastroEstabelecimentoComponent } from './pages/cadastro-estabelecimento/cadastro-estabelecimento.component';
import { UploadProfilePicComponent } from './components/upload-profile-pic/upload-profile-pic.component';
import { CarrousselHomeComponent } from './components/carroussel-home/carroussel-home.component';
import { EstablishmentListComponent } from './pages/establishment/establishment-list/establishment-list.component';
import {MatPaginatorModule} from "@angular/material/paginator";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogoutSessionComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    PhoneFormatDirective,
    ProfileComponent,
    UpdateProfileComponent,
    CadastroEstabelecimentoComponent,
    EstablishmentListComponent,
    UploadProfilePicComponent,
    CarrousselHomeComponent,
  ],
    imports: [
        MatTableModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            progressBar: true
        }),
        RouterOutlet,
        AppMaterialModule,
        MatPaginatorModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
