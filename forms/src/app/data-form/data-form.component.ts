import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

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

  onSubmit() {
    // console.log(this.form.value);

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
