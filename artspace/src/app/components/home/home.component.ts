import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public list: Array<{[size: string]: string}> = [];
  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 15; i++) {
      this.list.push({size: 'small'});
      this.list.push({size: 'large'});
      this.list.push({size: 'medium'});
    }
  }


}
