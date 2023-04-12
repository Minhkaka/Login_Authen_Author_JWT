import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../_services/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  constructor(public loader: LoadingService) {}

  ngOnInit() {}
}
