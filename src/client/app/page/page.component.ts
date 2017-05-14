import { Component,Injectable, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
import { RequestServerService } from '../shared/service/request.service';
import { ViewEncapsulation } from '@angular/core';
import { DataFetch } from "./datafetch";
import {HomeComponent} from "../home/home.component"
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import * as moment from "moment";

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
  showSearch = false;
  showPage = {
      name:'',
      time_limit:new Date,
      id:''
  };

  columnPages = [
    { name:'Searching result',prop: 'name' }
  ];
  rowPages = {};
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
                                    this.ref.detectChanges();
                                  },
                                    err => {
                                        // Log errors if any
                                        console.log(err);
                                    });
  }
  ngOnInit( ) {
    this.fetchData( );
    setInterval(() => { this.fetchData( ); }, 1000 * 60 * 3 );
    this.showPage.time_limit = new Date();
  }

  onActivate(event:any,type:String) {
    // console.log('Activate Event', event.row.id,event.row.name,event.row.time_limit,event.row.last_update);
    this.show_data=true;
    this.showPage.id = event.row.id;
    
    if(type==='includedate'){
      var date = new Date(parseInt(event.row.time_limit+'000'));
      this.showPage.time_limit = date;
    }
    
    this.ref.detectChanges();
    var tmp = event.row.name.match(/>(.*?)<\/a>/g);
    tmp = tmp[0]
    this.showPage.name =tmp.substring(1, tmp.indexOf('</a>'));
  }

  public setMoment(moment: any): any {
    this.showPage.time_limit = moment;
    // Do whatever you want to the return object 'moment'
  }

  updateId(){
    var sendData = {id:this.showPage.id,time_limit:Math.round(this.showPage.time_limit.valueOf()/1000)};
    console.log(sendData);
    this.requestServerService.post('https://voip.dev.owslab.io/api/page',sendData).subscribe(
                                  data => {
                                    console.log(data);
                                    this.fetchData();
                                  },
                                    err => {
                                        // Log errors if any
                                        console.log(err);
                                    });
  }
  deletePage(){
    var sendData = {id:this.showPage.id};
    console.log(sendData);
    this.requestServerService.post('https://voip.dev.owslab.io/api/deletepage',sendData).subscribe(
                                  data => {
                                    console.log(data);
                                    this.fetchData();
                                  },
                                    err => {
                                        // Log errors if any
                                        console.log(err);
                                    });
  }

  searchPage(){
    console.log(this.showSearch);
    this.showSearch = true;
    console.log(this.showSearch);
    var sendData = {name:this.showPage.name};
    this.requestServerService.post('https://voip.dev.owslab.io/api/searchpage',sendData).subscribe(
                                  data => {
                                    this.rowPages=this.convertdata(data.data);
                                    console.log(data);
                                  },
                                    err => {
                                        // Log errors if any
                                        console.log(err);
                                    });
  }
}
