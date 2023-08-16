import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { UpdateProfileComponent } from 'src/app/components/update-profile/update-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  panelOpenState = false;
  opened: boolean = false;
  currentRoute: string = '';
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => {
      this.menuTrigger!.focus()
    });
  }
}
