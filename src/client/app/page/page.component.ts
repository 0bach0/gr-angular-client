import { Component,Injectable, OnInit, ChangeDetectorRef } from '@angular/core';
import { RequestServerService } from '../shared/service/request.service';
import { ViewEncapsulation } from '@angular/core';
import { DataFetch } from "./datafetch";



/**
 * This class represents the lazy loaded PageComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PageComponent implements OnInit{
  rows :any;
  show_data=false;
  selected = [''];
  columns = [
    { name:'Id',prop: 'id' },
    { name:'Name',prop: 'name' },
    { name:'Limit time',prop: 'time_limit'},
    { name:'Last update',prop: 'last_update'},
  ];
  fbInfo ={name:'',email:'',id:'',src:'',show:false};

  constructor( public requestServerService: RequestServerService,public ref: ChangeDetectorRef ) {
  }
  public convertdata(x:any) {
    x.forEach((element:any) => {
      element.name = '<a target="_blank" href="https://www.facebook.com/' +element.id+'">'+ element.name + '</a>';
     
      // var date = new Date(element.time_limit*1000);
      // element.time_limit = date.toLocaleString();

      // var date = new Date(element.last_update*1000);
      // element.last_update = date.toLocaleString();
    });
    return x;
  }
  fetchData( ) {
    this.requestServerService.get('https://voip.dev.owslab.io/api/pages').subscribe(
                                  data => {
                                    this.rows = this.convertdata(data.message);
                                  },
                                    err => {
                                        // Log errors if any
                                        console.log(err);
                                    });
  }
  ngOnInit( ) {
    this.fetchData( );
    setInterval(() => { this.fetchData( ); }, 1000 * 60 * 3 );
    
  }

  onActivate(event:any) {
    // console.log('Activate Event', event.row.id,event.row.name,event.row.time_limit,event.row.last_update);
    this.show_data=true;
    console.log(event);
  }

  
}
