import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';

interface CDNResponse {
  results: CDNResult[];
  total: number;
  available: number;
}

interface CDNResult {
  name: string;
  latest: string;
  description: string;
  version: string;
  homepage: string;
}

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss'],
})
export class LibSearchComponent {
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';

  queryField = new FormControl();

  results$?: Observable<CDNResult[]>;
  total?: number;

  constructor(private http: HttpClient) {}

  onSearch() {
    let searchValue = this.queryField.value;

    const fields = 'name,description,version,homepage';

    if (searchValue && (searchValue = searchValue.trim()) !== '') {
      // opção 1: menos dinâmico
      const params_ = {
        search: searchValue,
        fields,
      };

      // opção 2: mais dinâmico
      let params = new HttpParams();
      params = params.set('search', searchValue);
      params = params.set('fields', fields);

      this.results$ = this.http
        .get<CDNResponse>(this.SEARCH_URL, {
          params,
        })
        .pipe(
          tap((res) => (this.total = res.total)),
          map((res) => res.results)
        );
    }
  }
}
