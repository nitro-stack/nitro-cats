import { Component, OnInit } from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';

import { environment } from '@env/environment';

const uploadURL = `${environment.serverUrl}/cats/upload`;

@Component({
  selector: 'app-submit-cat',
  templateUrl: './submit-cat.component.html',
  styleUrls: ['./submit-cat.component.scss']
})
export class SubmitCatComponent implements OnInit {
  uploader: FileUploader;
  hasDropZoneOver = false;
  fileSelected = false;
  addError = false;
  uploadError = false;

  constructor() {
    const fileExtFilter = {
      name: 'fileExt',
      fn: (item: FileLikeObject) =>
        ['.jpg', '.jpeg'].some(ext => item.name.endsWith(ext))
    };
    this.uploader = new FileUploader({
      url: uploadURL,
      allowedMimeType: ['image/jpeg', 'image/jpg'],
      maxFileSize: 1024 * 1024 * 2, // 2MB
      queueLimit: 1,
      filters: [fileExtFilter],
      autoUpload: true,
      disableMultipart: false,
      removeAfterUpload: true
    });
    this.uploader.onAfterAddingFile = () => {
      this.fileSelected = true;
      // TODO: resize file using canvas
    };
    this.uploader.onWhenAddingFileFailed = () => {
      this.addError = true;
    };
    this.uploader.onErrorItem = () => {
      this.uploadError = true;
    };
  }

  ngOnInit() {
    this.reset();
  }

  onFileOver(e: Event) {
    this.hasDropZoneOver = Boolean(e);
  }

  reset() {
    this.addError = false;
    this.uploadError = false;
    this.uploader.clearQueue();
    this.fileSelected = false;
  }
}
