import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  onChange(event: Event) {
    console.log(event);
    const selectedFiles: FileList = (<HTMLInputElement>event.target).files!;
    console.log(selectedFiles);
  }
}
