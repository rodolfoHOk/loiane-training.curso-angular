import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      // Angular 2 -> Validators.pattern('...'), Angular 4+ -> Validators.email
    });
  }

  onSubmit() {
    this.http
      .post('https://httpbin.org/post', JSON.stringify(this.form.value))
      .subscribe({
        next: (dados) => {
          console.log(dados);
          this.reset();
        },
        error: (error) => alert(error.message),
      });
  }

  reset() {
    this.form.reset();
  }
}
