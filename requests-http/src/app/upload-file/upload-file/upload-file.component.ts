import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnDestroy {
  files: Set<File> = new Set();
  progress: number = 0;

  sub?: Subscription;

  constructor(private service: UploadFileService) {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onChange(event: Event) {
    console.log(event);
    const selectedFiles: FileList = (<HTMLInputElement>event.target).files!;

    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i]);
    }

    this.progress = 0;
  }

  onUpload() {
    if (this.files.size > 0) {
      this.sub = this.service
        .upload(this.files, `${environment.BASE_URL}/upload`)
        .subscribe((event: HttpEvent<Object>) => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log('Upload concluído');
          } else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100) / event.total!);
            console.log('Progresso:', percentDone);
            this.progress = percentDone;
          }
        });
    }
  }
}
