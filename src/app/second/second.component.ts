import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent {

  constructor() { }

  ngOnInit(): void {
  }

  result(r) {
    console.log(r);
    alert(r)
  }

}
