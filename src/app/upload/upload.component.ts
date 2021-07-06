import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor() { }

  fileSelected: any;
  imgSrc: string;

  ngOnInit(): void {
  }

  onSelectFile(e) {
    this.fileSelected = e.target.files[0];
    console.log(this.fileSelected)
    if ((this.fileSelected.type as string).includes('image')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imgSrc = reader.result as string;
      }
      reader.readAsDataURL(this.fileSelected)
    }
  }

  removeFile() {
    this.fileSelected = null;
    this.imgSrc = null;
  }

}
