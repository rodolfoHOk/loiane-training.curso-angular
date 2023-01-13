import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Endereco } from 'src/app/template-form/endereco';

@Injectable({
  providedIn: 'root',
})
export class ConsultaCepService {
  constructor(private http: HttpClient) {}

  consultaCep(cep: string): Observable<Endereco | {}> {
    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      let validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {
        let url = `https://viacep.com.br/ws/${cep}/json`;

        return this.http.get<Endereco>(url);
      }
    }

    return of({});
  }
}
