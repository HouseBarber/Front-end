import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { TokenRecoveryGuard } from './guards/tokenRecovery.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'employees',
    component: EmployeesComponent,
  },
  {
    path: 'schedules',
    component: SchedulesComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'changePassword/:token',
    canActivate: [TokenRecoveryGuard],
    component: ChangePasswordComponent,
  },
  {
    path: '**', redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      },
    },
  ],
})
export class AppRoutingModule {}
