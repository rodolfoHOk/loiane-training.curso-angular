import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { environment } from 'src/environments/environment';
import { DownloadFileService } from '../download-file.service';
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

  constructor(
    private upService: UploadFileService,
    private downService: DownloadFileService
  ) {}

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
      this.sub = this.upService
        .upload(this.files, `${environment.BASE_URL}/upload`)
        .pipe(
          uploadProgress((progress) => {
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe((response) => console.log('Upload concluído'));
    }
  }

  onDownloadExcel() {
    this.downService
      .download(`${environment.BASE_URL}/downloads/excel`)
      .subscribe((response: any) => {
        this.downService.handleFile(response, 'fake-report.xlsx');
      });
  }

  onDownloadPDF() {
    this.downService
      .download(`${environment.BASE_URL}/downloads/pdf`)
      .subscribe((response: any) => {
        this.downService.handleFile(response, 'fake-report.pdf');
      });
  }
}
