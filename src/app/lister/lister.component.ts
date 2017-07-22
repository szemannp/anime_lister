import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.scss']
})
export class ListerComponent implements OnInit {

  searchResults = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  onClick() {
    this.searchService.getSearchData('durara').map(x => x.json()).subscribe((y) => { this.searchResults = y });
  }
}
