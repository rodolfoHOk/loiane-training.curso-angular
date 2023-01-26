import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { filter, map, pipe, tap } from 'rxjs';

export function filterResponse<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((event: HttpEvent<T>) => {
      const res = event as HttpResponse<T>;
      return res.body;
    })
  );
}

export function uploadProgress<T>(callback: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      callback(Math.round((event.loaded * 100) / event.total!));
    }
  });
}
