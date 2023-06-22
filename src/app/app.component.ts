import {Component, OnInit, ViewChild} from '@angular/core';
import { InternationalizationService } from './shared/messages/internationalization.service';
import {MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {NavigationStart, Router} from "@angular/router";
import {LogoutSessionComponent} from "./components/logout-session/logout-session.component";
import RouterEvents from './utils/RouterEvents';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Barbearia';
  routeLogin: boolean = false;
  opened: boolean = false;
  currentRoute: string = '';
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;

  constructor(private internationalizationService: InternationalizationService,
              private router: Router,
              public dialog: MatDialog) {
    internationalizationService.initializeSystemTranslate();
  }

  ngOnInit() {
    this.routerEvents();
  }

  routerEvents() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.routeLogin = RouterEvents.validateNavbar(event.url);
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(LogoutSessionComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => {
      this.menuTrigger!.focus()
    });
  }

}
