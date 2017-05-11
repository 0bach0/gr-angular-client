import { Component,Injectable, OnInit, ChangeDetectorRef } from '@angular/core';
import { RequestServerService } from '../shared/service/request.service';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { DataFetch } from "./datafetch";



/**
 * This class represents the lazy loaded TokenComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-token',
  templateUrl: 'token.component.html',
  styleUrls: ['token.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TokenComponent implements OnInit{
  rows :any;
  columns = [
    { name:'Facebook Id',prop: 'id' },
    { name:'Name',prop: 'name' },
    { name:'Status',prop: 'status' ,cellClass:'center-cell',headerClass:'center-cell'},
    { name:'Expired',prop: 'expired'},
    { name:'Used time',prop: 'use_count'},
    { name:'Token',prop: 'access_token'},
  ];
  fbInfo ={name:'',email:'',id:'',src:'',show:false};

  constructor( public requestServerService: RequestServerService, public _auth: AuthService,public ref: ChangeDetectorRef ) {
  }
  public convertdata(x:any) {
    x.forEach((element:any) => {
      element.name = '<a target="_blank" href="https://www.facebook.com/' +element.id+'">'+ element.name + '</a>';
      if ( element.status === true ) {
        element.status='<i class="fa fa-check" aria-hidden="true"></i>';
      } else {
        element.status='<i class="fa fa-ban" aria-hidden="true"></i>';
      }
      var date = new Date(element.expired*1000);
      element.expired = date.toLocaleString();
    });
    return x;
  }
  fetchData( ) {
    this.requestServerService.get('https://voip.dev.owslab.io/api/tokens').subscribe(
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
    setInterval(() => { this.fetchData( ); }, 1000 * 60 * 1 );
    
  }

  loginFb( ){
    this._auth.login("facebook").subscribe(
      (data:DataFetch) => {
                  console.log(data);
                  this.fbInfo.name=data.name;
                  this.fbInfo.email=data.email;
                  this.fbInfo.id=data.uid;
                  this.fbInfo.show=true;
                  this.fbInfo.src=data.image;
                  this.ref.detectChanges();

                  let url = "https://voip.dev.owslab.io/api/create-token?id="+data.uid+"&access_token="+data.token;
                  this.requestServerService.get(url).subscribe(
                                  data => {
                                    this.rows = this.convertdata(data.message);
                                    this.fetchData();
                                  },
                                    err => {
                                        // Log errors if any
                                        console.log(err);
                                    });
                  //user data
                  //name, image, uid, provider, uid, email, token (returns tokenId for google, accessToken for Facebook, no token for linkedIn)
                }
    )
  }

  logoutFb( ){
    this._auth.logout().subscribe(
      (data) => {

                  this.fbInfo ={name:'',email:'',id:'',src:'',show:false};
                  this.ref.detectChanges();
                  console.log(data);
                  
                  //user data
                  //name, image, uid, provider, uid, email, token (returns tokenId for google, accessToken for Facebook, no token for linkedIn)
                }
    )
  }

  
}
