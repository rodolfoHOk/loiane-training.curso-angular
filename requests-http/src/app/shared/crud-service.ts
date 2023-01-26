import { HttpClient } from '@angular/common/http';
import { delay, Observable, take } from 'rxjs';

export class CrudService<T extends { id?: number | string }> {
  constructor(protected http: HttpClient, private API_URL: string) {}

  list(): Observable<T[]> {
    return this.http.get<T[]>(`${this.API_URL}`).pipe(delay(2000));
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  save(record: T): Observable<T> {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(record: T): Observable<T> {
    return this.http.post<T>(`${this.API_URL}`, record).pipe(take(1));
  }

  private update(record: T): Observable<T> {
    return this.http
      .put<T>(`${this.API_URL}/${record.id}`, record)
      .pipe(take(1));
  }
}
