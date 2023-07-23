import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RequiredField} from "../../utils/requiredField";

@Component({
  selector: 'app-user-enrich',
  templateUrl: './user-enrich.component.html',
  styleUrls: ['./user-enrich.component.scss']
})
export class UserEnrichComponent implements OnInit {

  updateForm!: FormGroup;
  controlForm: { [key: string]: AbstractControl } = {};
  requiredField = new RequiredField();

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms(): void{
    this.updateForm = this.formBuilder.group({
        username: ['', Validators.required],
        cpf: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telephone: ['', Validators.required],
        dateBirth: ['', Validators.required],
        role: [],
        gender: [],
        cep: [''],
        city: [''],
        state: [''],
        street: [''],
        number: [''],
        complement: [''],
        specialties: [''],
        aboutYou: ['']
      })
    const usernameValid = this.updateForm.get("username")?.hasError('required');
    console.log(this.updateForm.get("username")?.hasError('required'));
  }
  get usernameControl(): FormControl {
    return this.updateForm.get('username') as FormControl;
  }

  onSubmit(): void{

  }
}
