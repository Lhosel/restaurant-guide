import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  restaurants = [];
  filtered = new Set<string>();

  constructor(private router: Router) { }

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants() {
    this.restaurants = [];

    for (var i = 0; i < localStorage.length; i++) {
      this.restaurants[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
  }

  delete(restaurant: any) {
    localStorage.removeItem(restaurant.name)

    this.getRestaurants();
  }

  view(restaurant: any) {
    this.router.navigate([`details/${JSON.stringify(restaurant)}`]);
  }

  search(event) {
    this.filtered = new Set<string>();
    for (var i = 0; i < localStorage.length; i++) {
      if (JSON.parse(localStorage.getItem(localStorage.key(i))).name.toLowerCase().includes(event.detail.value.toLowerCase()) || (JSON.parse(localStorage.getItem(localStorage.key(i))).tag.toLowerCase().includes(event.detail.value.toLowerCase()))) {
        this.filtered.add(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }

    if (event.detail.value === '') {
      this.getRestaurants();
    } else {
      this.restaurants = Array.from(this.filtered);
    }
  }
}
