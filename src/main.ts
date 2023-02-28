import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { StarRatingComponent } from './star-rating/star-rating.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StarRatingComponent],
  template: `
    <h1>Envie seu feedback</h1>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div style="display: flex">
        <label>
          Sua avaliação:
          <app-star-rating [formControl]="form.controls.rating"></app-star-rating>
        </label>
      </div>
      <div>
        <label>Quer informar um comentário?</label>
        <input formControlName="comment" />
      </div>
      <button type="submit" [disabled]="form.invalid">Submit</button>

      <pre>{{ form.value | json }}</pre>
      
    </form>
  `,
})
export class App {
  form = new FormGroup({
    rating: new FormControl(
      { value: null, disabled: false },
      Validators.required
    ),
    comment: new FormControl(''),
  });

  onSubmit(): void {
    console.log(this.form.value);
  }
}

bootstrapApplication(App);
