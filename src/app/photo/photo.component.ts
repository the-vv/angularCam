import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  WIDTH = 640;
  HEIGHT = 480;

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  // captures: string[] = [];
  error: any;
  isCaptured: boolean = false;
  stream: any;
  imgSrc: string = null;

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  stop() {
    this.video.nativeElement.pause();
    this.stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        if (this.stream) {
          this.video.nativeElement.srcObject = this.stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  takeSnap() {
    this.isCaptured = true;
    const ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(this.video.nativeElement, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.stop()
    this.imgSrc = this.canvas.nativeElement.toDataURL();
  }

  // checkImage() {
  //   const WIDTH = this.video.nativeElement.clientWidth;
  //   const HEIGHT = this.video.nativeElement.clientHeight;
  //   this.canvas.nativeElement.width = WIDTH;
  //   this.canvas.nativeElement.height = HEIGHT;
  //   const ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
  //   ctx.drawImage(this.video.nativeElement, 0, 0, WIDTH, HEIGHT)
  //   const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  // }

}
