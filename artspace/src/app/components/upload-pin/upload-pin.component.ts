import { Component, OnInit } from '@angular/core';
import { Pin } from '../../models';

@Component({
  selector: 'app-upload-pin',
  templateUrl: './upload-pin.component.html',
  styleUrls: ['./upload-pin.component.css']
})
export class UploadPinComponent implements OnInit {
  myPins: Pin[] = [];
  title!: string;
  description!: string;
  selectedFile: any;
  size!:string
  isUploadWindowOpened: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event: any) => {
        this.selectedFile = event.target.result;
      }
    }
  }

  newPin() {
    if (this.selectedFile) {
      this.myPins.push({
        author: "Erke",
        photo: this.selectedFile,
        size: this.size,
        title: this.title,
        description: this.description
      });
      this.selectedFile = null;
      this.isUploadWindowOpened = false;
    }
  }

  selectedSize(event:any) {
    this.size = event.target.options[event.target.options.selectedIndex].text;
  }



}


