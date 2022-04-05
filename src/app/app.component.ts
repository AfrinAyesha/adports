import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  // template: `
  //   <h1>{{ title }}</h1>
  //   TODO: Define your Angular component.
  // `,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'adports';
  docForm: FormGroup;
  docTypes = ['', 'Plain', 'PDF'];
  category = ['', 'Audit', 'Application', 'Other'];
  width = '0%';

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.docForm = this.fb.group({
      documentName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32),
        ],
      ],
      documentType: ['', [Validators.required]],
      category: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          // Validators.email,
          Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]$'),
        ],
      ],
    });
    this.docForm.valueChanges.subscribe((res) => {
      let validCount = 0;
      _.forEach(this.docForm.controls, (value, key) => {
        if (value.valid) {
          validCount++;
        }
      });
      this.width = `${validCount * 25}%`;
    });
  }
  submit(): void {
    console.log(this.docForm.value);
  }
}
