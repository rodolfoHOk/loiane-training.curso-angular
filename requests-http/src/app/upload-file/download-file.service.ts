import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DownloadFileService {
  constructor(private http: HttpClient) {}

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json',
    });
  }

  handleFile(response: any, fileName: string) {
    const file = new Blob([response], {
      type: response.type,
    });

    // para IE (Internet Explorer)
    if (window.navigator && window.navigator.userAgent.indexOf('MSIE') > -1) {
      //@ts-ignore Versões mais recentes do Typescript não reconhece o método
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;

    // link.click(); pode não funcionar em algumas versões do Firefox então temos a opção abaixo
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    // Firefox setTimeout, Chrome não precisa
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }
}
