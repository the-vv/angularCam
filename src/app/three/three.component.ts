import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { BrowserQRCodeReader } from '@zxing/browser';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent {
  // WIDTH = 640;
  // HEIGHT = 480;

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  error: any;
  isCaptured: boolean = false;
  stream: any;
  timer: any;

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  stop() {
    clearTimeout(this.timer)
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
          this.checkImage();
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }
 
  checkImage() {
    const WIDTH = this.video.nativeElement.clientWidth;
    const HEIGHT = this.video.nativeElement.clientHeight;
    this.canvas.nativeElement.width = WIDTH;
    this.canvas.nativeElement.height = HEIGHT;
    const ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(this.video.nativeElement, 0, 0, WIDTH, HEIGHT)
    this.decode()
    this.timer = setTimeout(() => { this.checkImage(); }, 1000 / 20)
  }

  async decode() {
    const codeReader = new BrowserQRCodeReader();
    let result;
    try {
      result = await codeReader.decodeFromCanvas(this.canvas.nativeElement);
    } catch (err) { }

    if (result) {
      this.stop();
      console.log(result.text)
      alert(result.text);
      this.stop();
    }

  }

}
