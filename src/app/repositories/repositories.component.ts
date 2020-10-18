import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {
  repositories:Observable<any>
  pageNumber:number=1;
  last30daysDate=moment().subtract(30, 'days').format("YYYY-MM-DD")
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  this.repositories=this.http.get<any>('https://api.github.com/search/repositories?q=created:>'+this.last30daysDate+'&sort=stars&order=desc&page='+this.pageNumber).pipe(map(res=>res.items))
 
  console.log(moment().subtract(30, 'days').format("YYYY-MM-DD"))
  }
  next(){
    this.pageNumber+=1
    this.repositories= this.http.get<any>('https://api.github.com/search/repositories?q=created:>'+this.last30daysDate+'&sort=stars&order=desc&page='+this.pageNumber).pipe(map(res=>res.items))
  }
  previous(){
    this.pageNumber-=1
    this.repositories=this.http.get<any>('https://api.github.com/search/repositories?q=created:>'+this.last30daysDate+'&sort=stars&order=desc&page='+this.pageNumber).pipe(map(res=>res.items))
  }

}
