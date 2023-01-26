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
  }

  onUpload() {
    if (this.files.size > 0) {
      this.sub = this.service
        .upload(this.files, `${environment.BASE_URL}/upload`)
        .subscribe((response) => console.log('Upload concluído', response));
    }
  }
}
