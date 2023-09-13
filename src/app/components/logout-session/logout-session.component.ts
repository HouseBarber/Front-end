import { Component } from '@angular/core';
import {AuthService} from "../../services/authService";

@Component({
  selector: 'app-logout-session',
  templateUrl: './logout-session.component.html',
  styleUrls: ['./logout-session.component.scss']
})
export class LogoutSessionComponent {

  constructor(private authService: AuthService) {}
  
  singOut():void {
    this.authService.logout();
  }
}
