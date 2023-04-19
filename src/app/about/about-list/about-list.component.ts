import { Component, OnInit } from '@angular/core';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-about-list',
  templateUrl: './about-list.component.html',
})
export class AboutListComponent implements OnInit {
  users = [];

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.aboutService.getUsers('users').subscribe((data) => {
      if (Array.isArray(data)) {
        this.users = data.filter((ele, i) => i % 2 === 0);
      }
    });
  }
}
