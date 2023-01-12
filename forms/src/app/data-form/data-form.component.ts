import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   nome: new FormControl(''),
    //   email: new FormControl(''),
    // });

    this.form = this.formBuilder.group({
      nome: [''],
      email: [''],
    });
  }
}
