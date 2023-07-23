import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-enrich',
  templateUrl: './user-enrich.component.html',
  styleUrls: ['./user-enrich.component.scss']
})
export class UserEnrichComponent implements AfterViewInit{
  @ViewChild(MatAccordion) accordion: MatAccordion = new MatAccordion();
  panelOpenState = true;
  ngAfterViewInit(): void{
  }




}
