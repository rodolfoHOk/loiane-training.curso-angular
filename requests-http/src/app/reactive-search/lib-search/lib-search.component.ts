import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

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
export class LibSearchComponent implements OnInit {
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';

  queryField = new FormControl();

  results$?: Observable<CDNResult[]>;
  total?: number;

  readonly FIELDS = 'name,description,version,homepage';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges.pipe(
      map((value) => value.trim()),
      filter((value) => value.length > 1),
      debounceTime(300),
      distinctUntilChanged(),
      // tap((value) => console.log(value)),
      switchMap((value) =>
        this.http.get<CDNResponse>(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS,
          },
        })
      ),
      tap((res) => (this.total = res.total)),
      map((res) => res.results)
    );
  }

  onSearch() {
    let searchValue = this.queryField.value;

    if (searchValue && (searchValue = searchValue.trim()) !== '') {
      // opção 1: menos dinâmico
      const params_ = {
        search: searchValue,
        fields: this.FIELDS,
      };

      // opção 2: mais dinâmico
      let params = new HttpParams();
      params = params.set('search', searchValue);
      params = params.set('fields', this.FIELDS);

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
