import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  @Input() color: string = 'primary';
  @Input() diameter: number = 50; // size
  @Input() strokeWidth: number = 2; // độ rộng nét
  @Input() mode: string = 'indeterminate';
  @Input() value: number = 100;
  @Input() overlay: boolean = false;

  constructor(public loader: LoadingService) {}

  ngOnInit() {}
}
