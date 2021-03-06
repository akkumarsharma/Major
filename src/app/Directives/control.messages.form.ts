import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../Services/validation.service';

@Component({
  selector: 'control-messages-form',
  template: `<div *ngIf="errorMessage !== null"><span style="color:red;">{{errorMessage}}</span></div>`
})
export class ControlMessagesForm {
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.touched) {
        return "Give proper input!!!"
      }
    }

    return null;
  }
}