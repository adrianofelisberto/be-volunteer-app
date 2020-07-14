import { Observable } from 'rxjs';
import { InterestService } from './../../services/interest.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Interest } from '../../models/interest';
import { Volunteer } from '../../models/volunteer';
import { VolunteerService } from '../../services/volunteer.service';

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

  interestsSelecteds = new Array<Interest>();
  interests$: Observable<Interest[]>;

  constructor(
    private fb: FormBuilder,
    private interestService: InterestService,
    private volunteerService: VolunteerService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getInterests();
  }

  private initForm() {
    this.form = this.fb.group({
      [CONTROL.NAME]: [null, Validators.required],
      [CONTROL.EMAIL]: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]],
      [CONTROL.PHONE]: [null, [Validators.required, Validators.minLength(11)]],
      [CONTROL.WHATSAPP]: [null, Validators.minLength(10)]
    })
  }

  private getInterests() {
    this.interests$ = this.interestService.getAll();
  }

  setListSelected(interest: Interest) {
    if (this.itemSelected(interest)) {
      this.interestsSelecteds = this.interestsSelecteds.filter(elem => elem.id !== interest.id);
    } else {
      this.interestsSelecteds.push(interest);
    }
  }

  itemSelected(interest: Interest): boolean {
    return !!this.interestsSelecteds.find(elem => elem.id === interest.id);
  }

  verifyError(errorName: string, controlName: string) {
    return this.form.get(controlName).hasError(errorName) && this.userChangeForm(controlName);
  }

  userChangeForm(controlName: string) {
    return this.form.get(controlName).touched || this.form.get(controlName).dirty;
  }

  validateSubmit() {
    if (this.form.invalid) {
      alert('form invalid')
      return;
    }
    
    const volunteer = this.getVolunteer();
    this.saveVolunteer(volunteer);
  }

  private getVolunteer(): Volunteer {
    return {
      ...this.form.value,
      interests: this.interestsSelecteds
    }
  }

  private saveVolunteer(volunteer: Volunteer) {
    this.volunteerService.create(volunteer)
      .subscribe(message => {
        alert(message.message);
        this.resetFormAndInterests();
      });
  }

  private resetFormAndInterests() {
    this.form.reset();
    this.interestsSelecteds.length = 0;
  }

}
