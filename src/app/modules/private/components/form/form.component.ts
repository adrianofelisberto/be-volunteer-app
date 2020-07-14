import { Volunteer } from './../../models/volunteer';
import { Observable } from 'rxjs';
import { InterestService } from './../../services/interest.service';
import { Component, OnInit, Input, Attribute, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Interest } from '../../models/interest';
import { VolunteerService } from '../../services/volunteer.service';
import { Message } from '../../models/message';

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

  @Input() volunteer: Volunteer;
  @Output() volunteerSavedEmitter = new EventEmitter();

  form: FormGroup;

  interestsSelecteds = new Array<Interest>();
  interests$: Observable<Interest[]>;

  constructor(
    private fb: FormBuilder,
    private interestService: InterestService,
    private volunteerService: VolunteerService,
    @Attribute('edit') public isEdit: boolean
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getInterests();
    this.verifySetFormAndInterests();
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

  private verifySetFormAndInterests() {
    if (this.isEdit) {
      this.setForm();
      this.copyInterests();
    }
  }

  private setForm() {
    this.form.patchValue({
      ...this.volunteer
    });
  }

  private copyInterests() {
    this.interestsSelecteds = this.volunteer.interests.slice();
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

    if (this.isEdit) {
      this.saveVolunteer(this.volunteerService.update(volunteer));
    } else {
      this.saveVolunteer(this.volunteerService.create(volunteer));
    }
  }

  private getVolunteer(): Volunteer {
    return {
      id: this.volunteer?.id,
      ...this.form.value,
      interests: this.interestsSelecteds
    }
  }

  private saveVolunteer(fn: Observable<Message>) {
    fn.subscribe(message => {
        alert(message.message);
        this.resetFormAndInterests();

        this.isEdit && this.volunteerSavedEmitter.emit();
      });
  }

  private resetFormAndInterests() {
    this.form.reset();
    this.interestsSelecteds.length = 0;
  }

}
