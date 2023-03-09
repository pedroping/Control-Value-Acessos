import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  NgControl,
} from '@angular/forms';

type Rating = { stars: number; text: string };

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true,
    },
  ],
})
export class StarRatingComponent implements ControlValueAccessor, OnInit {
  @Input() ratings: Rating[] = [
    {
      stars: 1,
      text: 'Péssimo',
    },
    {
      stars: 2,
      text: 'Ruim',
    },
    {
      stars: 3,
      text: 'Regular',
    },
    {
      stars: 4,
      text: 'Bom',
    },
    {
      stars: 5,
      text: 'Ótimo!',
    },
  ];

  ratingText: string;
  displayText = '';
  control = new FormControl(null as any);
  ngControl: NgControl
  protected disabled: boolean;
  protected value: number;

  constructor (
    private injector: Injector
  ) {
  
  }

  ngOnInit() {

    this.ngControl = this.injector.get(NgControl);

  }
  onChanged: (stars: number) => void;
  onTouched: () => void;

  writeValue(value: number) {
    this.value = value;
    this.control.setValue(value, {emitEvent: false})
  }

  registerOnChange(fn: (stars: number) => void) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
