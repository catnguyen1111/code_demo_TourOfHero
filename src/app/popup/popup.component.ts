import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from '../Services/alert.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() data:any;


  confirms:any;
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    if(this.data === true){
      this.run();
    }

  }
  run(){

    this.confirms = confirm('Bạn chưa lưu dữ liệu vui lòng lưu dữ liệu');
    if(this.confirms === true){
      this.alertService.close()

    }
  }
}
