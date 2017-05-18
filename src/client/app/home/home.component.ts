import { Component,Injectable, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import { RequestServerService } from '../shared/service/request.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  rows :any;
  constructor( public requestServerService: RequestServerService,public ref: ChangeDetectorRef ) {}
  columns = [
    { name:'Page',prop: 'from' },
    { name:'Created time',prop: 'created_time'},
    { name:'Content',prop: 'message'},
    { name:'Type',prop: 'type_text'},
  ];

  public convertdata(x:any) {
    x.forEach((element:any) => {
      element.from = '<a target="_blank" href="https://www.facebook.com/' +element.id+'">'+ element.from + '</a>';
     
      // var date = new Date(element.time_limit*1000);
      // element.time_limit = date.toLocaleString();

      // var date = new Date(element.last_update*1000);
      // element.last_update = date.toLocaleString();
    });
    return x;
  }
  
  fetchData( ) {
    this.requestServerService.get('https://voip.dev.owslab.io/api/posts').subscribe(
                                  data => {
                                    this.rows = this.convertdata(data.message);
                                    this.rows = data.message;
                                    console.log(data.message);
                                    this.ref.detectChanges();
                                  },
                                    err => {
                                        // Log errors if any
                                        console.log(err);
                                    });
  }

  ngOnInit() {
      this.fetchData();
  }


}
