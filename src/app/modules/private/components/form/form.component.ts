import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const CONTROL = {
  NAME: 'name',
  EMAIL: 'email',
  PHONE: 'phone',
  WHATSAPP: 'whatsapp'
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      [CONTROL.NAME]: [null, Validators.required],
      [CONTROL.EMAIL]: [null, Validators.required],
      [CONTROL.PHONE]: [null, Validators.required],
      [CONTROL.WHATSAPP]: null
    })
  }

  saveVolunteer() {
    console.log(this.form.value);
  }

}
